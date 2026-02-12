/**
 * Middleware kiểm tra quyền admin
 * PHẢI chạy SAU auth.middleware
 * 
 * Đảm bảo req.user đã được set bởi auth middleware
 */
module.exports = (req, res, next) => {
  try {
    // Kiểm tra req.user có tồn tại không (từ auth middleware)
    if (!req.user) {
      return res.status(401).json({
        message: "Chưa xác thực. Middleware auth chưa chạy"
      });
    }

    // Kiểm tra role
    if (!req.user.role) {
      return res.status(403).json({
        message: "Không xác định được quyền của user"
      });
    }

    // Kiểm tra có phải admin không
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Bạn không có quyền admin. Chỉ admin mới truy cập được"
      });
    }

    // User là admin → cho phép tiếp tục
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi kiểm tra quyền",
      error: error.message
    });
  }
};