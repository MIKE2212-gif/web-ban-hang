const router = require("express").Router();
const orderCtrl = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

// Tất cả order routes đều cần login
router.use(auth);

/**
 * @route   POST /api/orders
 * @desc    Tạo đơn hàng từ giỏ hàng
 * @access  Private (User)
 */
router.post("/", orderCtrl.createOrder);

/**
 * @route   GET /api/orders
 * @desc    Lấy danh sách đơn hàng của user
 * @access  Private (User)
 */
router.get("/", orderCtrl.getMyOrders);

/**
 * @route   GET /api/orders/:id
 * @desc    Xem chi tiết 1 đơn hàng
 * @access  Private (User)
 */
router.get("/:id", orderCtrl.getOrderDetail);

/**
 * @route   PATCH /api/orders/:id/cancel
 * @desc    Hủy đơn hàng (chỉ khi status = pending)
 * @access  Private (User)
 */
router.patch("/:id/cancel", orderCtrl.cancelOrder);

module.exports = router;