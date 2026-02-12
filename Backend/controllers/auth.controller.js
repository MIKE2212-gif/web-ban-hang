const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * REGISTER USER - Đăng ký user thông thường
 */
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin"
      });
    }

    // 1. Kiểm tra email tồn tại chưa
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: "Email đã tồn tại"
      });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Tạo user với role mặc định là "user"
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role: "user" // Mặc định là user
    });

    // 4. Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Đăng ký thành công",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Lỗi register",
      error: error.message
    });
  }
};

/**
 * REGISTER ADMIN - Đăng ký admin (chỉ dùng cho development hoặc có middleware bảo vệ)
 */
exports.registerAdmin = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin"
      });
    }

    // 1. Kiểm tra email tồn tại chưa
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: "Email đã tồn tại"
      });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Tạo user với role="admin"
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role: "admin" // HARDCODE admin
    });

    // 4. Tạo JWT token với role admin
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Đăng ký admin thành công",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Lỗi register admin",
      error: error.message
    });
  }
};

/**
 * LOGIN - Đăng nhập cho cả user và admin
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Vui lòng điền email và mật khẩu"
      });
    }

    // 1. Tìm user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Sai email hoặc mật khẩu"
      });
    }

    // 2. So sánh password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Sai email hoặc mật khẩu"
      });
    }

    // 3. Tạo JWT token với role từ database
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "secret-key",
      { expiresIn: "24h" }
    );

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role // Trả về role để frontend biết
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Lỗi login",
      error: error.message
    });
  }
};

/**
 * GET CURRENT USER - Lấy thông tin user hiện tại từ token
 */
exports.getCurrentUser = async (req, res) => {
  try {
    // req.user được set từ middleware xác thực
    const user = await User.findById(req.user.userId).select("-password");
    
    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại"
      });
    }

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Lỗi lấy thông tin user",
      error: error.message
    });
  }
};