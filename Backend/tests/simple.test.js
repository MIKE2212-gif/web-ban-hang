const request = require("supertest");

const app = require("../app");

describe("Simple API Test", () => {
  it("GET / - Server running", async () => {
    const res = await request(app).get("/");
    console.log("Status:", res.status);
    console.log("Body:", res.text);
  });

  it("GET /products - Get Products", async () => {
    const res = await request(app).get("/products");
    console.log("Status:", res.status);
    console.log("Body:", JSON.stringify(res.body, null, 2).substring(0, 200));
  });

  it("POST /auth/register - Register", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Test User",
        email: `test-${Date.now()}@example.com`,
        password: "Password123"
      });
    console.log("Status:", res.status);
    console.log("Response:", JSON.stringify(res.body, null, 2));
  });
});
