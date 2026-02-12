const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const userCtrl = require("../controllers/user.controller");

// Tất cả user routes đều cần login
router.use(auth);

/**
 * @route   GET /api/user/profile
 * @desc    Lấy thông tin user hiện tại
 * @access  Private (User)
 */
router.get("/profile", userCtrl.getProfile);

/**
 * @route   PUT /api/user/profile
 * @desc    Cập nhật thông tin user
 * @access  Private (User)
 */
router.put("/profile", userCtrl.updateProfile);

module.exports = router;