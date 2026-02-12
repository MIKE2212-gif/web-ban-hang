# 🔧 Hướng Dẫn Khắc Phục Lỗi Frontend-Backend

## 📋 Các Vấn Đề Đã Tìm Thấy và Sửa

### 1. ❌ Lỗi: API call không định nghĩa trong `api.js`
**Vấn đề:** `NewArrivals.jsx` gọi `api.getNewArrivals()` nhưng hàm này không tồn tại trong `api.js`

**Sửa:** Thêm hàm `getNewArrivals()` vào [services/api.js](Frontend/src/services/api.js)
```javascript
getNewArrivals: async () => {
  const response = await fetch(`${API_URL}/products`);
  const data = await handleResponse(response);
  return { data: data };
}
```

---

### 2. ❌ Lỗi: Không thể click vào sản phẩm để xem chi tiết
**Vấn đề:** `NewArrivals.jsx` và `TopSelling.jsx` không có `Link` để navigate đến `ProductDetail`

**Sửa:** 
- Thêm import `Link` từ `react-router-dom`
- Bao lại component sản phẩm bằng `<Link to={'/products/' + id}>`

**Trước:**
```jsx
<div key={product.id} className="group cursor-pointer">
```

**Sau:**
```jsx
<Link key={product._id} to={`/products/${product._id}`} className="group cursor-pointer">
```

---

### 3. ❌ Lỗi: Route Home không tồn tại
**Vấn đề:** Trang chủ không có route, redirect đi đâu đó lạ

**Sửa:** Cập nhật [App.jsx](Frontend/src/App.jsx)
```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products/:id" element={<ProductDetail />} />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
```

---

### 4. ❌ Lỗi: ProductDetail không hiển thị gì
**Vấn đề:** 
- Không có Header/Footer
- Không xử lý error hoặc loading state đúng
- Sử dụng thuộc tính sai (product.images vs product.image)

**Sửa:** Cập nhật [pages/ProductDetail.jsx](Frontend/src/pages/ProductDetail.jsx)
- Thêm Header và Footer
- Xử lý error state chính xác
- Hiển thị loading indicator
- Sử dụng `product.image` hoặc `product.images[0]`

---

### 5. ⚠️ Lỗi Model Sản Phẩm Không Nhất Quán
**Vấn đề:** Model `Product` chỉ có `images` (mảng) nhưng code sử dụng `image` (string)

**Sửa:** Cập nhật [Backend/models/product.model.js](Backend/models/product.model.js)
```javascript
image: {
  type: String,
  default: null
},
images: {
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
```

---

## 🚀 Cách Chạy Ứng Dụng

### 1️⃣ Chạy Backend
```bash
cd Backend
npm start
```
Backend sẽ chạy trên **http://localhost:3000**

### 2️⃣ Chạy Frontend
```bash
cd Frontend
npm start
```
Frontend sẽ chạy trên **http://localhost:3000** (hoặc cổng khác nếu 3000 bận)

---

## 🔍 Kiểm Tra Kết Nối

### Test API trực tiếp
```bash
# Lấy danh sách sản phẩm
curl http://localhost:3000/api/products

# Lấy chi tiết sản phẩm (thay YOUR_ID)
curl http://localhost:3000/api/products/YOUR_ID
```

### Kiểm tra Console
1. Mở DevTools (F12) → Console
2. Tìm log: `✅ Dữ liệu sản phẩm:` → có nghĩa kết nối thành công
3. Nếu thấy: `❌ Lỗi khi lấy sản phẩm` → Backend không chạy hoặc API không hoạt động

---

## ⚙️ Cấu Hình API URL

Nếu Backend chạy trên cổng khác (không phải 3000), hãy sửa trong:

**Frontend - [src/services/api.js](Frontend/src/services/api.js)**
```javascript
const API_URL = 'http://localhost:3000/api';  // ← Sửa cổng ở đây
```

**Frontend - [src/pages/ProductDetail.jsx](Frontend/src/pages/ProductDetail.jsx)**
```javascript
const res = await axios.get(
  `http://localhost:3000/api/products/${id}`  // ← Sửa cổng ở đây
);
```

---

## 🐛 Debug Tips

### Nếu sản phẩm không hiển thị
1. **Kiểm tra Backend đã chạy:** `curl http://localhost:3000/`
2. **Kiểm tra MongoDB:** Backend log phải có ✅ MongoDB kết nối thành công
3. **Kiểm tra dữ liệu:** Có sản phẩm nào trong database không?

### Nếu click sản phẩm không đi tới chi tiết
1. Kiểm tra console có lỗi gì không (F12)
2. Kiểm tra URL đổi chưa (phải là `/products/[id]`)
3. Kiểm tra ProductDetail component có lỗi không

### Nếu ProductDetail trống trắng
1. Mở DevTools Console (F12)
2. Tìm error message
3. Kiểm tra `id` trong URL có giống ObjectId MongoDB không

---

## ✅ Danh Sách Các Sửa Đã Làm

- ✅ Thêm `getNewArrivals()` vào api.js
- ✅ Thêm `Link` vào NewArrivals.jsx
- ✅ Thêm `Link` vào TopSelling.jsx  
- ✅ Sửa App.jsx - thêm route Home
- ✅ Cập nhật ProductDetail.jsx - thêm Header/Footer, error handling
- ✅ Cập nhật Product model - thêm image, rating, category fields

---

## 📝 Lưu ý

- URL API phải khớp: Frontend gọi `http://localhost:3000/api/...` thì Backend phải chạy trên port 3000
- CORS đã được bật trong Backend (`app.use(cors(...))`)
- Sử dụng `_id` từ MongoDB (không phải `id`) khi tạo Link
- NewArrivals lấy từ Backend, TopSelling vẫn là hardcoded (có thể update sau)
