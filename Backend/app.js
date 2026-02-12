require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================== ENV ==================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGODB_URI;

// ================== MIDDLEWARE ==================
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"], // frontend ports
  credentials: true
}));

// 🖼️ Servir arquivos estáticos (imagens)
app.use(express.static('public'));

// ================== MONGODB ==================
let mongodInstance = null;
const connectMongo = async () => {
  // 1) Try MONGO_URI
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB kết nối thành công (MONGODB_URI)");
    return;
  } catch (err) {
    console.warn("⚠️ Không thể kết nối tới MONGODB_URI:", err.message);
  }

  // 2) Try local MongoDB
  try {
    const localUri = process.env.MONGODB_LOCAL || 'mongodb://127.0.0.1:27017/web-ban-hang';
    await mongoose.connect(localUri);
    console.log("✅ MongoDB kết nối thành công (local)");
    return;
  } catch (err) {
    console.warn("⚠️ Không thể kết nối tới local MongoDB:", err.message);
  }

  // 3) Fallback to in-memory MongoDB (development only)
  try {
    console.log('✨ Khởi động mongodb-memory-server để dev/test (in-memory DB)...');
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongodInstance = await MongoMemoryServer.create();
    const uri = mongodInstance.getUri();
    await mongoose.connect(uri);
    console.log('✅ MongoDB in-memory kết nối thành công');
  } catch (err) {
    console.error('❌ Không thể khởi động in-memory MongoDB:', err.message);
  }
};

connectMongo();

// Graceful shutdown for in-memory server
process.on('SIGINT', async () => {
  if (mongodInstance) {
    try {
      await mongodInstance.stop();
      console.log('🛑 mongodb-memory-server stopped');
    } catch (e) {
      console.warn('Failed to stop mongodb-memory-server:', e.message);
    }
  }
  process.exit(0);
});

// ================== ROUTES ==================
// Auth
app.use("/api/auth", require("./routes/auth.route"));

// User
app.use("/api/user", require("./routes/user.route"));

// Product
app.use("/api/products", require("./routes/product.route"));

// Cart
app.use("/api/cart", require("./routes/cart.route"));

// Order
app.use("/api/orders", require("./routes/order.route"));

// Admin
app.use("/api/admin", require("./routes/admin.route"));

// 🤖 Chatbot AI - THÊM DÒNG NÀY
app.use("/api/chatbot", require("./routes/chatbot.route"));

// ================== TEST ==================
app.get("/", (req, res) => {
  res.send("Backend chạy OK 🚀");
});

// ================== 404 ==================
app.use((req, res) => {
  res.status(404).json({
    message: "API không tồn tại",
    path: req.originalUrl
  });
});

// ================== SERVER ==================
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});

module.exports = app;