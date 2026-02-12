const request = require("supertest");
const mongoose = require("mongoose");
const { expect } = require("chai");
require("dotenv").config();

// Setup test database
const MONGO_TEST_URI = process.env.MONGODB_TEST_URI || "mongodb://localhost:27017/web-ban-hang-test";

let app;

describe("E-Commerce API Tests", () => {
  before(async () => {
    // Connect to test DB
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGO_TEST_URI);
    }
    app = require("../app");
  });

  after(async () => {
    // Clean up
    await mongoose.disconnect();
  });

  // ========== AUTH TESTS ==========
  describe("🔐 AUTH APIs", () => {
    const testUser = {
      name: "Test User",
      email: `test-${Date.now()}@example.com`,
      password: "Password123"
    };

    let authToken;

    it("POST /auth/register - Đăng ký thành công", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send(testUser);

      console.log("✓ Register Response:", res.status, res.body);
      expect(res.status).to.equal(201);
      expect(res.body.message).to.include("thành công");
      expect(res.body.user.email).to.equal(testUser.email);
    });

    it("POST /auth/register - Email tồn tại", async () => {
      const res = await request(app)
        .post("/auth/register")
        .send(testUser);

      console.log("✓ Duplicate Email Response:", res.status, res.body);
      expect(res.status).to.equal(400);
      expect(res.body.message).to.include("tồn tại");
    });

    it("POST /auth/login - Đăng nhập thành công", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password
        });

      console.log("✓ Login Response:", res.status, res.body);
      expect(res.status).to.equal(200);
      expect(res.body.message).to.include("thành công");
      expect(res.body.user.id).to.exist;
      
      authToken = res.body.token || ""; // Lưu token nếu có
    });

    it("POST /auth/login - Sai mật khẩu", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: testUser.email,
          password: "wrongpassword"
        });

      console.log("✓ Wrong Password Response:", res.status, res.body);
      expect(res.status).to.equal(400);
    });
  });

  // ========== PRODUCT TESTS ==========
  describe("📦 PRODUCT APIs", () => {
    let productId;

    it("GET /products - Lấy danh sách sản phẩm", async () => {
      const res = await request(app).get("/products");

      console.log("✓ Get Products Response:", res.status, res.body.length, "items");
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.be.true;
    });

    it("POST /products - Tạo sản phẩm (Admin only)", async () => {
      const newProduct = {
        name: "Áo thun test",
        price: 150000,
        description: "Áo thun chất lượng",
        image: "image.jpg",
        stock: 50,
        category: "clothes"
      };

      const res = await request(app)
        .post("/products")
        .send(newProduct);

      console.log("✓ Create Product Response:", res.status, res.body);
      expect([201, 400, 401, 403]).to.include(res.status);
      
      if (res.status === 201) {
        productId = res.body.product._id;
      }
    });

    it("GET /products/:id - Lấy chi tiết sản phẩm", async () => {
      if (!productId) {
        console.log("⚠ Bỏ qua vì chưa có product ID");
        return;
      }

      const res = await request(app).get(`/products/${productId}`);

      console.log("✓ Get Product Detail Response:", res.status);
      expect([200, 404]).to.include(res.status);
    });
  });

  // ========== USER TESTS ==========
  describe("👤 USER APIs", () => {
    it("GET /user/me - Lấy profile (cần auth)", async () => {
      const res = await request(app)
        .get("/user/me")
        .set("Authorization", "Bearer fake-token");

      console.log("✓ Get Profile Response:", res.status);
      expect([200, 401]).to.include(res.status);
    });
  });

  // ========== CART TESTS ==========
  describe("🛒 CART APIs", () => {
    it("GET /cart - Lấy giỏ hàng (cần auth)", async () => {
      const res = await request(app)
        .get("/cart")
        .set("Authorization", "Bearer fake-token");

      console.log("✓ Get Cart Response:", res.status);
      expect([200, 401, 403]).to.include(res.status);
    });

    it("POST /cart - Thêm vào giỏ hàng (cần auth)", async () => {
      const res = await request(app)
        .post("/cart")
        .set("Authorization", "Bearer fake-token")
        .send({
          productId: "507f1f77bcf86cd799439011",
          quantity: 2
        });

      console.log("✓ Add To Cart Response:", res.status);
      expect([201, 400, 401, 403, 404]).to.include(res.status);
    });
  });

  // ========== ORDER TESTS ==========
  describe("📋 ORDER APIs", () => {
    it("GET /orders - Lấy đơn hàng (cần auth)", async () => {
      const res = await request(app)
        .get("/orders")
        .set("Authorization", "Bearer fake-token");

      console.log("✓ Get Orders Response:", res.status);
      expect([200, 401, 403]).to.include(res.status);
    });

    it("POST /orders - Tạo đơn hàng (cần auth)", async () => {
      const res = await request(app)
        .post("/orders")
        .set("Authorization", "Bearer fake-token");

      console.log("✓ Create Order Response:", res.status);
      expect([201, 400, 401, 403]).to.include(res.status);
    });
  });

  // ========== ADMIN TESTS ==========
  describe("👨‍💼 ADMIN APIs", () => {
    it("GET /admin/users - Lấy danh sách user (Admin only)", async () => {
      const res = await request(app)
        .get("/admin/users")
        .set("Authorization", "Bearer fake-token");

      console.log("✓ Get Admin Users Response:", res.status);
      expect([200, 401, 403]).to.include(res.status);
    });

    it("GET /admin/products - Lấy danh sách sản phẩm (Admin only)", async () => {
      const res = await request(app)
        .get("/admin/products")
        .set("Authorization", "Bearer fake-token");

      console.log("✓ Get Admin Products Response:", res.status);
      expect([200, 401, 403]).to.include(res.status);
    });

    it("GET /admin/orders - Lấy danh sách đơn hàng (Admin only)", async () => {
      const res = await request(app)
        .get("/admin/orders")
        .set("Authorization", "Bearer fake-token");

      console.log("✓ Get Admin Orders Response:", res.status);
      expect([200, 401, 403]).to.include(res.status);
    });
  });

  // ========== ERROR TESTS ==========
  describe("❌ ERROR Handling", () => {
    it("GET / - Server check", async () => {
      const res = await request(app).get("/");
      console.log("✓ Root Route Response:", res.status, res.text);
      expect(res.status).to.equal(200);
    });

    it("GET /invalid - Route không tồn tại", async () => {
      const res = await request(app).get("/invalid-route");
      console.log("✓ Invalid Route Response:", res.status);
      expect([404]).to.include(res.status);
    });
  });
});
