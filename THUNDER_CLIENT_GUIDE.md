# 🧪 Hướng Dẫn Test API với Thunder Client

## 1️⃣ Cài đặt Thunder Client
- Cài extension: **Thunder Client** từ VS Code Marketplace
- Hoặc tải từ: https://www.thunderclient.com/

---

## 2️⃣ API Endpoints (Sau khi fix)

### 🏠 Base URL
```
http://localhost:3000
```

**Lưu ý:** Tất cả API routes bây giờ có prefix `/api`

---

## 3️⃣ Test Các API

### 1. Kiểm tra Server
```
GET http://localhost:3000/
```
**Expected:** `Backend chạy OK 🚀`

---

### 2. 📝 Đăng Ký (Register)
```
POST http://localhost:3000/api/auth/register
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "Password123"
}
```

**Expected Response (201):**
```json
{
  "message": "Đăng ký thành công",
  "user": {
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "role": "user",
    "_id": "507f1f77bcf86cd799439011"
  }
}
```

---

### 3. 🔐 Đăng Nhập (Login)
```
POST http://localhost:3000/api/auth/login
```

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

**Expected Response (200):**
```json
{
  "message": "Đăng nhập thành công",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "role": "user"
  }
}
```

💡 **Lưu token này để dùng trong các API cần auth!**

---

### 4. 👤 Lấy Thông Tin User (Cần Auth)
```
GET http://localhost:3000/api/user/me
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {TOKEN_TỪ_LOGIN}
```

**Example:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "role": "user"
}
```

---

### 5. 📦 Lấy Danh Sách Sản Phẩm
```
GET http://localhost:3000/api/products
```

**Headers:**
```
Content-Type: application/json
```

**Expected Response (200):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Áo thun",
    "price": 150000,
    "stock": 50,
    "category": "clothes"
  }
]
```

---

### 6. 📦 Lấy Chi Tiết Sản Phẩm
```
GET http://localhost:3000/api/products/{ID_SẢN_PHẨM}
```

**Example:**
```
GET http://localhost:3000/api/products/507f1f77bcf86cd799439012
```

---

### 7. 🛒 Lấy Giỏ Hàng (Cần Auth)
```
GET http://localhost:3000/api/cart
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {TOKEN}
```

**Expected Response (200):**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 2
    }
  ]
}
```

---

### 8. 🛒 Thêm Vào Giỏ Hàng (Cần Auth)
```
POST http://localhost:3000/api/cart
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {TOKEN}
```

**Body (JSON):**
```json
{
  "productId": "507f1f77bcf86cd799439012",
  "quantity": 2
}
```

---

### 9. 📋 Lấy Đơn Hàng (Cần Auth)
```
GET http://localhost:3000/api/orders
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {TOKEN}
```

---

### 10. 📋 Tạo Đơn Hàng (Cần Auth)
```
POST http://localhost:3000/api/orders
```

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {TOKEN}
```

**Note:** Tạo từ giỏ hàng hiện tại (không cần body)

---

## ⚙️ Cách Sử Dụng Thunder Client

### Step 1: Tạo Collection
1. Click **"New Collection"**
2. Đặt tên: **"Web-Ban-Hang API"**

### Step 2: Thêm Request
1. Click **"New Request"**
2. Chọn HTTP method (GET, POST, etc.)
3. Nhập URL: `http://localhost:3000/api/auth/login`
4. Chọn tab **"Body"** → chọn **"JSON"**
5. Nhập JSON data
6. Click **"Send"** để gửi request

### Step 3: Lưu Token
1. Sau khi login thành công, copy token từ response
2. Chọn tab **"Headers"**
3. Thêm header:
   - **Key:** `Authorization`
   - **Value:** `Bearer {token}`

### Step 4: Tái sử dụng Token
- Lưu token vào **Env Variables** để dùng cho tất cả request
- Click **"Env"** → **"New Env"** → Tạo variable `token`
- Dùng: `Authorization: Bearer {{token}}`

---

## 🔍 Kiểm Tra Lỗi

### Error: "Chưa đăng nhập"
- ❌ Quên thêm token vào header
- ✅ Thêm: `Authorization: Bearer {token}`

### Error: "Token không hợp lệ"
- ❌ Token hết hạn hoặc sai
- ✅ Login lại để lấy token mới

### Error: "API không tồn tại"
- ❌ URL sai (quên `/api` prefix)
- ✅ Dùng: `/api/products` chứ không phải `/products`

### Error: "MongoDB lỗi kết nối"
- ❌ MongoDB không chạy
- ✅ Khởi động MongoDB trước

---

## 📝 Danh Sách Quick API

| Method | Endpoint | Auth | Ghi chú |
|--------|----------|------|---------|
| GET | `/api/products` | ❌ | Lấy danh sách |
| GET | `/api/products/:id` | ❌ | Chi tiết sản phẩm |
| POST | `/api/auth/register` | ❌ | Đăng ký |
| POST | `/api/auth/login` | ❌ | Đăng nhập |
| GET | `/api/user/me` | ✅ | Thông tin user |
| GET | `/api/cart` | ✅ | Giỏ hàng |
| POST | `/api/cart` | ✅ | Thêm vào giỏ |
| DELETE | `/api/cart/:productId` | ✅ | Xóa khỏi giỏ |
| GET | `/api/orders` | ✅ | Danh sách đơn |
| POST | `/api/orders` | ✅ | Tạo đơn hàng |
| GET | `/api/admin/users` | ✅ Admin | Quản lý user |
| GET | `/api/admin/products` | ✅ Admin | Quản lý sản phẩm |

---

## ✅ Các lỗi đã fix:

1. ✅ Thêm route `/api/user` vào app.js
2. ✅ Fix import User model trong user.controller.js
3. ✅ Thêm JWT token generation trong login
4. ✅ Xóa dòng "không" lạ trong app.js
5. ✅ App export để test được

Giờ code của bạn không có lỗi API nữa! 🎉
