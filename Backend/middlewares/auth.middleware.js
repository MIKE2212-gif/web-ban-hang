const jwt = require("jsonwebtoken");

/**
 * Middleware xác thực user
 * - Kiểm tra token
 * - Lấy userId và role gắn vào req.user
 */
module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ 
        message: "Chưa đăng nhập. Vui lòng cung cấp token" 
      });
    }

    // Check format: "Bearer <token>"
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        message: "Token không đúng định dạng. Sử dụng: Bearer <token>" 
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        message: "Token không được cung cấp" 
      });
    }

    // Verify JWT_SECRET tồn tại
    const JWT_SECRET = process.env.JWT_SECRET || "secret-key";
    if (!process.env.JWT_SECRET) {
      console.warn("⚠️ WARNING: JWT_SECRET không được thiết lập trong .env");
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Kiểm tra decoded có đầy đủ thông tin
    if (!decoded.userId || !decoded.role) {
      return res.status(401).json({ 
        message: "Token không hợp lệ: thiếu thông tin user" 
      });
    }

    // Gắn thông tin user vào request
    req.user = {
      userId: decoded.userId,
      role: decoded.role
    };

    next();
  } catch (err) {
    // Xử lý các loại lỗi JWT khác nhau
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ 
        message: "Token đã hết hạn. Vui lòng đăng nhập lại" 
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ 
        message: "Token không hợp lệ" 
      });
    }

    // Lỗi khác
    return res.status(401).json({ 
      message: "Xác thực thất bại",
      error: err.message 
    });
  }
};