const Order = require("../models/order.model");
const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

/**
 * Tạo order từ cart
 */
exports.createOrder = async (req, res) => {
  const userId = req.user.userId;

  // 1. lấy cart
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Giỏ hàng trống" });
  }

  let total = 0;
  const orderItems = [];

  // 2. check stock + tính total
  for (const item of cart.items) {
    const product = item.productId;

    if (item.quantity > product.stock) {
      return res.status(400).json({
        message: `Sản phẩm ${product.name} không đủ tồn kho`
      });
    }

    total += product.price * item.quantity;

    orderItems.push({
      productId: product._id,
      price: product.price,
      quantity: item.quantity
    });
  }

  // 3. trừ kho
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.productId._id, {
      $inc: { stock: -item.quantity }
    });
  }

  // 4. tạo order
  const order = await Order.create({
    userId,
    items: orderItems,
    total
  });

  // 5. xóa cart
  await Cart.deleteOne({ userId });

  res.status(201).json(order);
};

/**
 * User xem lịch sử đơn hàng
 */
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.userId });
  res.json(orders);
};
