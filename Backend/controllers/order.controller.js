const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

/**
 * Tạo order từ cart
 */
exports.createOrder = async (req, res) => {
  // Sử dụng session để đảm bảo transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.userId;

    // 1. lấy cart
    const cart = await Cart.findOne({ userId })
      .populate("items.productId")
      .session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Giỏ hàng trống" });
    }

    let total = 0;
    const orderItems = [];

    // 2. check stock + tính total
    for (const item of cart.items) {
      const product = item.productId;

      if (!product) {
        await session.abortTransaction();
        return res.status(400).json({
          message: "Một số sản phẩm trong giỏ hàng không còn tồn tại"
        });
      }

      if (item.quantity > product.stock) {
        await session.abortTransaction();
        return res.status(400).json({
          message: `Sản phẩm "${product.name}" không đủ tồn kho. Còn lại: ${product.stock}`
        });
      }

      total += product.price * item.quantity;

      orderItems.push({
        productId: product._id,
        price: product.price,
        quantity: item.quantity,
        name: product.name,
        image: product.image || (product.images && product.images[0]) || null
      });
    }

    // 3. trừ kho (trong transaction)
    for (const item of cart.items) {
      const result = await Product.findByIdAndUpdate(
        item.productId._id,
        { $inc: { stock: -item.quantity } },
        { new: true, session }
      );

      // Double check stock không bị âm
      if (result.stock < 0) {
        await session.abortTransaction();
        return res.status(400).json({
          message: `Sản phẩm "${result.name}" hết hàng trong quá trình đặt`
        });
      }
    }

    // 4. tạo order
    const order = await Order.create([{
      userId,
      items: orderItems,
      total,
      status: "pending"
    }], { session });

    // 5. xóa cart
    await Cart.deleteOne({ userId }, { session });

    // Commit transaction
    await session.commitTransaction();

    // Populate order data (request the actual product image fields)
    await order[0].populate("items.productId", "name price image images");

    res.status(201).json({
      message: "Đặt hàng thành công",
      order: order[0]
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      message: "Lỗi tạo đơn hàng",
      error: error.message
    });
  } finally {
    session.endSession();
  }
};

/**
 * User xem lịch sử đơn hàng
 */
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .populate("items.productId", "name price image images")
      .sort({ createdAt: -1 });

    res.json({
      orders,
      totalOrders: orders.length
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi lấy danh sách đơn hàng",
      error: error.message
    });
  }
};

/**
 * User xem chi tiết 1 đơn hàng
 */
exports.getOrderDetail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "ID đơn hàng không hợp lệ"
      });
    }

    const order = await Order.findOne({
      _id: id,
      userId: req.user.userId
    }).populate("items.productId", "name price image images");

    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng"
      });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi lấy chi tiết đơn hàng",
      error: error.message
    });
  }
};

/**
 * User hủy đơn hàng (chỉ khi status = pending)
 */
exports.cancelOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const order = await Order.findOne({
      _id: id,
      userId: req.user.userId
    }).session(session);

    if (!order) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng"
      });
    }

    if (order.status !== "pending") {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Chỉ có thể hủy đơn hàng đang chờ xử lý"
      });
    }

    // Hoàn lại stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: item.quantity } },
        { session }
      );
    }

    order.status = "cancelled";
    await order.save({ session });

    await session.commitTransaction();

    res.json({
      message: "Hủy đơn hàng thành công",
      order
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      message: "Lỗi hủy đơn hàng",
      error: error.message
    });
  } finally {
    session.endSession();
  }
};