const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/product.model");

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/web-ban-hang';

const sampleProducts = [
  {
    name: "Vertical Striped Shirt",
    price: 232,
    stock: 50,
    description: "Áo sơ mi sọc dọc kinh điển",
    image: "/images/products/vertical.svg",
    images: ["/images/products/vertical.svg"],
    colors: ["Đỏ", "Xanh", "Trắng"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 5.0,
    category: "Áo"
  },
  {
    name: "Courage Graphic T-shirt",
    price: 145,
    stock: 40,
    description: "Áo thun in hình đẹp",
    image: "/images/products/corange.svg",
    images: ["/images/products/corange.svg"],
    colors: ["Cam", "Đen", "Trắng"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.0,
    category: "Áo"
  },
  {
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    stock: 35,
    description: "Quần short rộng thoải mái",
    image: "/images/products/loosefit.svg",
    images: ["/images/products/loosefit.svg"],
    colors: ["Xanh", "Xám", "Đen"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 3.0,
    category: "Quần"
  },
  {
    name: "Faded Skinny Jeans",
    price: 210,
    stock: 60,
    description: "Quần jean skinny màu nhạt",
    image: "/images/products/fadedskinny.svg",
    images: ["/images/products/fadedskinny.svg"],
    colors: ["Xanh", "Đen", "Xám"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    category: "Quần"
  },
  {
    name: "Casual T-Shirt",
    price: 100,
    stock: 100,
    description: "Áo thun casual đơn giản nhưng chất",
    image: "https://picsum.photos/400/600?random=1",
    images: ["https://picsum.photos/400/600?random=1"],
    colors: ["Trắng", "Đen", "Xám"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.2,
    category: "Áo"
  },
  {
    name: "Premium Denim Jacket",
    price: 350,
    stock: 25,
    description: "Áo khoác denim cao cấp",
    image: "https://picsum.photos/400/600?random=2",
    images: ["https://picsum.photos/400/600?random=2"],
    colors: ["Xanh đậm", "Xanh nhạt"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    category: "Áo khoác"
  },
  {
    name: "Classic Chinos",
    price: 120,
    stock: 45,
    description: "Quần chinos cổ điển",
    image: "https://picsum.photos/400/600?random=3",
    images: ["https://picsum.photos/400/600?random=3"],
    colors: ["Beige", "Xám", "Đen"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 3.9,
    category: "Quần"
  },
  {
    name: "Summer Polo Shirt",
    price: 95,
    stock: 70,
    description: "Áo polo hè",
    image: "https://picsum.photos/400/600?random=4",
    images: ["https://picsum.photos/400/600?random=4"],
    colors: ["Xanh", "Đỏ", "Trắng"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.1,
    category: "Áo"
  },
  {
    name: "Cargo Pants",
    price: 150,
    stock: 30,
    description: "Quần cargo với nhiều túi",
    image: "https://picsum.photos/400/600?random=5",
    images: ["https://picsum.photos/400/600?random=5"],
    colors: ["Xanh quân", "Xám"],
    sizes: ["S", "M", "L", "XL"],
    rating: 3.7,
    category: "Quần"
  },
  {
    name: "Fashion Hoodie",
    price: 180,
    stock: 55,
    description: "Hoodie thời trang",
    image: "https://picsum.photos/400/600?random=6",
    images: ["https://picsum.photos/400/600?random=6"],
    colors: ["Đen", "Xám", "Xanh"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    rating: 4.4,
    category: "Áo"
  },
  {
    name: "Slim Fit Dress Pants",
    price: 165,
    stock: 40,
    description: "Quần tây slim fit",
    image: "https://picsum.photos/400/600?random=7",
    images: ["https://picsum.photos/400/600?random=7"],
    colors: ["Đen", "Xám", "Nâu"],
    sizes: ["S", "M", "L", "XL"],
    rating: 4.3,
    category: "Quần"
  },
  {
    name: "Floral Print Shirt",
    price: 130,
    stock: 35,
    description: "Áo sơ mi in hoa",
    image: "https://picsum.photos/400/600?random=8",
    images: ["https://picsum.photos/400/600?random=8"],
    colors: ["Trắng", "Xanh"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.0,
    category: "Áo"
  }
];

async function seedProducts() {
  try {
    // Kết nối MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB kết nối thành công");

    // Xóa tất cả sản phẩm cũ
    await Product.deleteMany({});
    console.log("🗑️  Đã xóa sản phẩm cũ");

    // Thêm sản phẩm mẫu
    const result = await Product.insertMany(sampleProducts);
    console.log(`✅ Đã thêm ${result.length} sản phẩm`);

    // Hiển thị danh sách sản phẩm
    const products = await Product.find();
    console.log("\n📦 Danh sách sản phẩm trong database:");
    products.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} - ${p.price} ₫`);
    });

    await mongoose.connection.close();
    console.log("\n✅ Kết nối đóng thành công");
  } catch (error) {
    console.error("❌ Lỗi:", error.message);
    process.exit(1);
  }
}

seedProducts();
