# ✅ Đã Sửa Xong - Hướng Dẫn Test Kết Nối Frontend-Backend

## 🔧 Các Vấn Đề Đã Sửa

### 1. ❌ **Lỗi: Port Backend và Frontend xung đột**
- **Vấn đề:** Backend dùng port 3000, Frontend cũng muốn dùng port 3000 → xung đột
- **Sửa:** 
  - Backend → Port 5000
  - Frontend → Port 3002 (tự động vì 3000 bận)
  - CORS đã cập nhật cho phép cả 3 port: 3000, 3001, 3002

### 2. ❌ **Lỗi: API URL sai trong Frontend**
- **Vấn đề:** Frontend gọi `http://localhost:3000/api/` nhưng Backend đang chạy port 5000
- **Sửa:** 
  - [Frontend/src/services/api.js](Frontend/src/services/api.js) → `http://localhost:5000/api`
  - [Frontend/src/pages/ProductDetail.jsx](Frontend/src/pages/ProductDetail.jsx) → `http://localhost:5000/api`

### 3. ❌ **Lỗi: Sản phẩm không có hình ảnh**
- **Vấn đề:** Database có 7 sản phẩm nhưng tất cả đều không có hình ảnh
- **Sửa:** Chạy script `update-products.js` để cập nhật hình ảnh từ picsum.photos

---

## 🚀 Status Hiện Tại

✅ **Backend:** Chạy trên `http://localhost:5000`
✅ **Frontend:** Chạy trên `http://localhost:3002`
✅ **MongoDB:** Kết nối thành công
✅ **API:** Trả về 7 sản phẩm
✅ **CORS:** Cấu hình đúng
✅ **Database:** Cập nhật hình ảnh cho sản phẩm

---

## 🧪 Cách Test

### 1. Mở Frontend
👉 **http://localhost:3002**

### 2. Bạn sẽ thấy
- Trang chủ với các component Hero, BrandBar, NewArrivals, TopSelling
- NewArrivals sẽ tải dữ liệu từ Backend

### 3. Click vào sản phẩm
- Sẽ chuyển hướng tới `/products/[id]`
- ProductDetail sẽ lấy dữ liệu từ API và hiển thị

### 4. Kiểm tra Console
Mở DevTools (F12) → Console → sẽ thấy:
```
✅ Dữ liệu sản phẩm: {...}
```

---

## 📋 File Đã Thay Đổi

| File | Thay Đổi |
|------|----------|
| Backend/app.js | Port 3000 → 5000, CORS thêm 3001, 3002 |
| Frontend/src/services/api.js | localhost:3000 → localhost:5000 |
| Frontend/src/pages/ProductDetail.jsx | localhost:3000 → localhost:5000 |
| Backend/update-products.js | **File mới** - Cập nhật hình ảnh sản phẩm |

---

## 🔍 Debug - Nếu Vẫn Lỗi

### API không response
```powershell
# Test Backend có chạy không
Invoke-WebRequest -Uri "http://localhost:5000/" -UseBasicParsing
```

### Frontend không kết nối Backend
1. Mở DevTools (F12) → Network tab
2. Click sản phẩm → Xem request `/api/products/[id]`
3. Kiểm tra status code:
   - ✅ 200 = Thành công
   - ❌ 0 = Backend không chạy
   - ❌ 404 = API endpoint sai

### Sản phẩm không hiển thị hình ảnh
→ URL hình ảnh có thể bị chặn. Mở DevTools → Console → xem có error không

---

## ⚡ Tóm Tắt Nhanh

**Chạy Backend:**
```bash
cd Backend && npm start
# → http://localhost:5000
```

**Chạy Frontend (terminal mới):**
```bash
cd Frontend && npm start
# → http://localhost:3002
```

**Test:** Mở http://localhost:3002 → click sản phẩm → xem chi tiết

✅ **Thành công!** Kết nối Frontend-Backend đã sửa xong.
