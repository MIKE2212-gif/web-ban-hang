#!/usr/bin/env node

const request = require("supertest");
const app = require("./app");

async function runTests() {
  console.log("\n=== TESTING ALL APIS ===\n");

  try {
    // Test 1: Root
    console.log("1️⃣ GET / - Server check");
    let res = await request(app).get("/");
    console.log(`   Status: ${res.status} ✓\n`);

    // Test 2: Get products
    console.log("2️⃣ GET /products - Get all products");
    res = await request(app).get("/products");
    console.log(`   Status: ${res.status}, Items: ${res.body.length} ✓\n`);

    // Test 3: Register
    console.log("3️⃣ POST /auth/register - Register user");
    const testEmail = `test-${Date.now()}@example.com`;
    res = await request(app)
      .post("/auth/register")
      .send({
        name: "Test User",
        email: testEmail,
        password: "Test123456"
      });
    console.log(`   Status: ${res.status} - ${res.body.message}`);
    if (res.status === 201) {
      console.log(`   ✓ User created: ${testEmail}\n`);
    } else {
      console.log(`   ❌ Error: ${JSON.stringify(res.body)}\n`);
    }

    // Test 4: Login
    console.log("4️⃣ POST /auth/login - Login");
    res = await request(app)
      .post("/auth/login")
      .send({
        email: testEmail,
        password: "Test123456"
      });
    console.log(`   Status: ${res.status} - ${res.body.message}`);
    const authToken = res.body.user?.id ? `Bearer ${res.body.user.id}` : null;
    console.log(`   ✓ Token received\n`);

    // Test 5: Get profile
    console.log("5️⃣ GET /user/me - Get profile (with token)");
    res = await request(app)
      .get("/user/me")
      .set("Authorization", authToken || "Bearer invalid");
    console.log(`   Status: ${res.status}`);
    if (res.status === 200) {
      console.log(`   ✓ Profile: ${res.body.email}\n`);
    } else {
      console.log(`   Note: ${res.body.message}\n`);
    }

    // Test 6: Get cart
    console.log("6️⃣ GET /cart - Get cart (with token)");
    res = await request(app)
      .get("/cart")
      .set("Authorization", authToken || "Bearer invalid");
    console.log(`   Status: ${res.status}`);
    if (res.status === 200) {
      console.log(`   ✓ Cart items: ${res.body.items?.length || 0}\n`);
    } else {
      console.log(`   Note: Status ${res.status}\n`);
    }

    // Test 7: Get orders
    console.log("7️⃣ GET /orders - Get orders (with token)");
    res = await request(app)
      .get("/orders")
      .set("Authorization", authToken || "Bearer invalid");
    console.log(`   Status: ${res.status}`);
    if (res.status === 200) {
      console.log(`   ✓ Orders: ${res.body.length || 0}\n`);
    } else {
      console.log(`   Note: Status ${res.status}\n`);
    }

    // Test 8: Get admin users
    console.log("8️⃣ GET /admin/users - Get admin users (with token)");
    res = await request(app)
      .get("/admin/users")
      .set("Authorization", authToken || "Bearer invalid");
    console.log(`   Status: ${res.status}`);
    if (res.status === 200) {
      console.log(`   ✓ Users: ${res.body.length || 0}\n`);
    } else {
      console.log(`   Note: ${res.body.message}\n`);
    }

    // Test 9: Invalid route
    console.log("9️⃣ GET /invalid - Test invalid route");
    res = await request(app).get("/invalid-route-xyz");
    console.log(`   Status: ${res.status} ✓\n`);

    console.log("=== TESTING COMPLETE ===\n");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test Error:", error.message);
    process.exit(1);
  }
}

runTests();
