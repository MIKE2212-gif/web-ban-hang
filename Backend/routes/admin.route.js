const router = require("express").Router();
const adminCtrl = require("../controllers/admin.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/role.middleware");

// Tất cả admin routes đều cần login + role admin
router.use(auth, isAdmin);

/* ============ USER MANAGEMENT ============ */

/**
 * @route   GET /api/admin/users
 * @desc    Lấy danh sách tất cả user
 * @access  Private (Admin only)
 */
router.get("/users", adminCtrl.getAllUsers);

/**
 * @route   PATCH /api/admin/users/:id/block
 * @desc    Block/Unblock user
 * @access  Private (Admin only)
 */
router.patch("/users/:id/block", adminCtrl.toggleBlockUser);

/* ============ PRODUCT MANAGEMENT ============ */

/**
 * @route   POST /api/admin/products
 * @desc    Tạo sản phẩm mới
 * @access  Private (Admin only)
 */
router.post("/products", adminCtrl.createProduct);

/**
 * @route   GET /api/admin/products
 * @desc    Lấy danh sách tất cả sản phẩm (admin view)
 * @access  Private (Admin only)
 */
router.get("/products", adminCtrl.getAllProducts);

/**
 * @route   PUT /api/admin/products/:id
 * @desc    Cập nhật sản phẩm
 * @access  Private (Admin only)
 */
router.put("/products/:id", adminCtrl.updateProduct);

/**
 * @route   DELETE /api/admin/products/:id
 * @desc    Xóa sản phẩm
 * @access  Private (Admin only)
 */
router.delete("/products/:id", adminCtrl.deleteProduct);

/* ============ ORDER MANAGEMENT ============ */

/**
 * @route   GET /api/admin/orders
 * @desc    Lấy danh sách tất cả đơn hàng
 * @access  Private (Admin only)
 */
router.get("/orders", adminCtrl.getAllOrders);

/**
 * @route   PATCH /api/admin/orders/:id/status
 * @desc    Cập nhật trạng thái đơn hàng
 * @access  Private (Admin only)
 */
router.patch("/orders/:id/status", adminCtrl.updateOrderStatus);

module.exports = router;