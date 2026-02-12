const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    stock: {
      type: Number,
      default: 0
    },

    description: {
      type: String
    },

    // Hình ảnh đơn (chuỗi) - để dễ dàng sử dụng
    image: {
      type: String,
      default: null
    },

    // 👇 THÊM MẤY CÁI QUAN TRỌNG NÀY
    images: {
      type: [String],
      default: []
    },

    colors: {
      type: [String],
      default: []
    },

    sizes: {
      type: [String],
      default: []
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    category: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
