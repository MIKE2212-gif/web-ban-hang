const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

/**
 * Thêm sản phẩm vào giỏ hàng
 */
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity } = req.body;

    // Validate input
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({ 
        message: "Vui lòng cung cấp productId và quantity hợp lệ" 
      });
    }

    // 1. kiểm tra sản phẩm
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ 
        message: `Số lượng vượt quá tồn kho. Còn lại: ${product.stock}` 
      });
    }

    // 2. tìm cart của user
    let cart = await Cart.findOne({ userId });

    // 3. nếu chưa có cart → tạo mới
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ productId, quantity }]
      });

      await cart.populate("items.productId", "name price image images");
      return res.status(201).json({
        message: "Thêm sản phẩm vào giỏ hàng thành công",
        cart
      });
    }

    // 4. nếu đã có cart → check item
    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // sản phẩm đã có → cộng quantity
      const newQuantity = cart.items[itemIndex].quantity + quantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({ 
          message: `Vượt quá tồn kho. Còn lại: ${product.stock}, trong giỏ: ${cart.items[itemIndex].quantity}` 
        });
      }

      cart.items[itemIndex].quantity = newQuantity;
    } else {
      // sản phẩm chưa có → push
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate("items.productId", "name price image images");
    
    res.json({
      message: "Cập nhật giỏ hàng thành công",
      cart
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi thêm sản phẩm vào giỏ hàng",
      error: error.message
    });
  }
};

/**
 * Lấy giỏ hàng của user
 */
exports.getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId })
      .populate("items.productId", "name price image images stock");

    if (!cart) {
      return res.json({ 
        cart: null,
        items: [],
        totalItems: 0
      });
    }

    // Tính tổng số lượng và tổng tiền
    let totalItems = 0;
    let totalPrice = 0;

    cart.items.forEach(item => {
      if (item.productId) {
        totalItems += item.quantity;
        totalPrice += item.productId.price * item.quantity;
      }
    });

    res.json({
      cart,
      totalItems,
      totalPrice
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi lấy giỏ hàng",
      error: error.message
    });
  }
};

/**
 * Cập nhật số lượng sản phẩm trong giỏ hàng
 */
exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ 
        message: "Số lượng phải lớn hơn 0" 
      });
    }

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng trống" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Sản phẩm không có trong giỏ hàng" });
    }

    // Check stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ 
        message: `Vượt quá tồn kho. Còn lại: ${product.stock}` 
      });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
      await cart.populate("items.productId", "name price image images");

    res.json({
      message: "Cập nhật giỏ hàng thành công",
      cart
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi cập nhật giỏ hàng",
      error: error.message
    });
  }
};

/**
 * Xóa sản phẩm khỏi cart
 */
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng trống" });
    }

    const itemExists = cart.items.some(
      item => item.productId.toString() === productId
    );

    if (!itemExists) {
      return res.status(404).json({ message: "Sản phẩm không có trong giỏ hàng" });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();
      await cart.populate("items.productId", "name price image images");

    res.json({
      message: "Xóa sản phẩm khỏi giỏ hàng thành công",
      cart
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi xóa sản phẩm khỏi giỏ hàng",
      error: error.message
    });
  }
};

/**
 * Xóa toàn bộ giỏ hàng
 */
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    
    if (!cart) {
      return res.status(404).json({ message: "Giỏ hàng trống" });
    }

    cart.items = [];
    await cart.save();

    res.json({
      message: "Đã xóa toàn bộ giỏ hàng",
      cart
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi xóa giỏ hàng",
      error: error.message
    });
  }
};