const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/product.model");

const MONGO_URI = process.env.MONGODB_URI;

async function updateProducts() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB kết nối thành công");

    // Cập nhật tất cả sản phẩm để có hình ảnh
    const result = await Product.updateMany(
      { image: null },
      {
        $set: {
          image: "https://picsum.photos/400/600?random=" + Math.floor(Math.random() * 1000),
          rating: 4.5,
          category: "Áo thun"
        }
      }
    );

    console.log(`✅ Cập nhật ${result.modifiedCount} sản phẩm`);

    // Lấy danh sách sản phẩm để kiểm tra
    const products = await Product.find();
    console.log("\n📦 Danh sách sản phẩm sau cập nhật:");
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - ${p.price} ₫ - Image: ${p.image}`);
    });

    await mongoose.connection.close();
    console.log("\n✅ Kết nối đóng thành công");
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exit(1);
  }
}

updateProducts();
