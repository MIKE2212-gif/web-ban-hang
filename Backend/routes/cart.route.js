const router = require("express").Router();
const cartCtrl = require("../controllers/cart.controller");
const auth = require("../middlewares/auth.middleware");

// Tất cả cart routes đều cần login
router.use(auth);

/**
 * @route   POST /api/cart
 * @desc    Thêm sản phẩm vào giỏ hàng
 * @access  Private (User)
 */
router.post("/", cartCtrl.addToCart);

/**
 * @route   GET /api/cart
 * @desc    Lấy giỏ hàng của user
 * @access  Private (User)
 */
router.get("/", cartCtrl.getMyCart);

/**
 * @route   PUT /api/cart/:productId
 * @desc    Cập nhật số lượng sản phẩm trong giỏ hàng
 * @access  Private (User)
 */
router.put("/:productId", cartCtrl.updateCartItem);

/**
 * @route   DELETE /api/cart/:productId
 * @desc    Xóa sản phẩm khỏi giỏ hàng
 * @access  Private (User)
 */
router.delete("/:productId", cartCtrl.removeFromCart);

/**
 * @route   DELETE /api/cart
 * @desc    Xóa toàn bộ giỏ hàng
 * @access  Private (User)
 */
router.delete("/", cartCtrl.clearCart);

module.exports = router;