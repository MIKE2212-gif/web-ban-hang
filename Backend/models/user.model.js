const mongoose = require("mongoose");

/**
 * User schema
 * - email unique để đăng nhập
 * - password được hash
 * - role dùng để phân quyền
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true // không cho trùng email
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
