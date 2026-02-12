const router = require("express").Router();
const productCtrl = require("../controllers/product.controller");
const auth = require("../middlewares/auth.middleware");
const isAdmin = require("../middlewares/role.middleware");

/* ============ PUBLIC ROUTES (User) ============ */

/**
 * @route   GET /api/products
 * @desc    Lấy danh sách tất cả sản phẩm (public)
 * @access  Public
 */
router.get("/", productCtrl.getAllProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Xem chi tiết sản phẩm
 * @access  Public
 */
router.get("/:id", productCtrl.getProductDetail);

/* ============ ADMIN ROUTES ============ */

/**
 * @route   POST /api/products
 * @desc    Tạo sản phẩm mới
 * @access  Private (Admin only)
 */
router.post("/", auth, isAdmin, productCtrl.createProduct);

module.exports = router;