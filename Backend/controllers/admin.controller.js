const Product = require("../models/product.model");
const User = require("../models/user.model");
const Order = require("../models/order.model");

/* USER MANAGEMENT */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (error) {
    res.status(500).json({ 
      message: "Lỗi lấy danh sách user", 
      error: error.message 
    });
  }
};

exports.toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy user" });
    }
    
    user.isBlocked = !user.isBlocked;
    await user.save();
    
    res.json({ 
      message: "Cập nhật trạng thái user thành công", 
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        isBlocked: user.isBlocked
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Lỗi cập nhật user", 
      error: error.message 
    });
  }
};

/* PRODUCT MANAGEMENT */
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Tạo sản phẩm thành công",
      product
    });
  } catch (error) {
    res.status(400).json({
      message: "Dữ liệu sản phẩm không hợp lệ",
      error: error.message
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ 
      message: "Lỗi lấy danh sách sản phẩm", 
      error: error.message 
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    
    res.json({ message: "Cập nhật sản phẩm thành công", product });
  } catch (error) {
    res.status(500).json({ 
      message: "Lỗi cập nhật sản phẩm", 
      error: error.message 
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    
    res.json({ message: "Xóa sản phẩm thành công" });
  } catch (error) {
    res.status(500).json({ 
      message: "Lỗi xóa sản phẩm", 
      error: error.message 
    });
  }
};

/* ORDER MANAGEMENT */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price")
      .sort({ createdAt: -1 });
    
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ 
      message: "Lỗi lấy danh sách đơn hàng", 
      error: error.message 
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        message: "Trạng thái không hợp lệ" 
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("userId", "name email");
    
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    
    res.json({ 
      message: "Cập nhật trạng thái đơn hàng thành công", 
      order 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Lỗi cập nhật đơn hàng", 
      error: error.message 
    });
  }
};