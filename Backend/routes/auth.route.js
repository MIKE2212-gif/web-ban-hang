const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");

/**
 * @route   POST /api/auth/register
 * @desc    Đăng ký user mới (role = user)
 * @access  Public
 */
router.post("/register", authCtrl.register);

/**
 * @route   POST /api/auth/register-admin
 * @desc    Đăng ký admin (CHỈ CHO DEVELOPMENT/TESTING)
 * @access  Public (nên bảo vệ bằng middleware trong production)
 * @warning NGUY HIỂM - Xóa hoặc bảo vệ route này trong production
 */
router.post("/register-admin", authCtrl.registerAdmin);

/**
 * @route   POST /api/auth/login
 * @desc    Đăng nhập (cả user và admin)
 * @access  Public
 */
router.post("/login", authCtrl.login);

/**
 * @route   GET /api/auth/me
 * @desc    Lấy thông tin user hiện tại từ token
 * @access  Private
 */
router.get("/me", auth, authCtrl.getCurrentUser);

module.exports = router;