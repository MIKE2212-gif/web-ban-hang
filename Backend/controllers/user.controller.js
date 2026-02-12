const User = require("../models/user.model");

/**
 * Lấy thông tin user đang login
 */
exports.getProfile = async (req, res) => {
  try {
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
        role: user.role,
        isBlocked: user.isBlocked,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi lấy thông tin user",
      error: error.message
    });
  }
};

/**
 * Cập nhật thông tin user
 */
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        message: "User không tồn tại"
      });
    }

    // Chỉ cho phép update một số trường
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.json({
      message: "Cập nhật thông tin thành công",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi cập nhật thông tin user",
      error: error.message
    });
  }
};