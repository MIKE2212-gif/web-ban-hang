const Product = require("../models/product.model");
const mongoose = require("mongoose");

/**
 * ADMIN tạo sản phẩm
 * - Chỉ admin được gọi (check ở middleware)
 */
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Tạo sản phẩm thành công",
      product
    });
  } catch (error) {
    res.status(400).json({
      message: "Dữ liệu sản phẩm không hợp lệ",
      error: error.message
    });
  }
};

/**
 * USER xem danh sách sản phẩm (hỗ trợ tìm kiếm theo tên)
 */
exports.getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // Nếu có tham số search, tìm kiếm theo tên sản phẩm
    if (search && search.trim() !== "") {
      query = {
        name: { $regex: search, $options: "i" } // i = case insensitive
      };
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server khi lấy danh sách sản phẩm"
    });
  }
};

/**
 * USER xem chi tiết sản phẩm
 */
exports.getProductDetail = async (req, res) => {
  const { id } = req.params;

  // check ObjectId hợp lệ
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "ID sản phẩm không hợp lệ"
    });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server khi lấy chi tiết sản phẩm"
    });
  }
};
