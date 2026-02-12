# 🎯 Hướng Dẫn Nhanh - Chạy Ứng Dụng

## ⚡ Các Bước Chạy

### Terminal 1 - Chạy Backend
```bash
cd c:\Users\dohoa\Downloads\web-ban-hang\Backend
npm start
```

**Khi thành công sẽ thấy:**
```
✅ MongoDB kết nối thành công
Backend chạy OK 🚀
```

### Terminal 2 - Chạy Frontend
```bash
cd c:\Users\dohoa\Downloads\web-ban-hang\Frontend
npm start
```

**Khi thành công sẽ mở browser tự động**

---

## 🧪 Test Luồng Sử Dụng

1. ✅ Mở http://localhost:3001 (Frontend)
2. ✅ Kéo xuống xem **NEW ARRIVALS** hoặc **TOP SELLING**
3. ✅ **Click vào sản phẩm** 
4. ✅ Sẽ thấy trang chi tiết sản phẩm với:
   - Hình ảnh
   - Tên sản phẩm
   - Giá
   - Mô tả
   - Số lượng tồn
   - Rating
   - Nút "Thêm vào giỏ hàng"

---

## 🔴 Nếu Không Hoạt động

### Lỗi 1: "Không thể tải sản phẩm"
→ Backend chưa chạy. Hãy chạy Terminal 1

### Lỗi 2: Trang chi tiết trống
→ Mở DevTools (F12) → Console → xem error message

### Lỗi 3: Không thể click vào sản phẩm
→ Kiểm tra URL địa chỉ, phải là `/products/[id]`

---

## 📝 Các File Đã Sửa

| File | Sửa Gì |
|------|--------|
| `Frontend/src/services/api.js` | Thêm `getNewArrivals()` |
| `Frontend/src/components/NewArrivals.jsx` | Thêm Link navigate |
| `Frontend/src/components/TopSelling.jsx` | Thêm Link navigate |
| `Frontend/src/pages/ProductDetail.jsx` | Cải thiện UI, thêm Header/Footer |
| `Frontend/src/App.jsx` | Thêm route Home và layout |
| `Backend/models/product.model.js` | Thêm field image, rating, category |

---

## 💡 Mẹo Debug

**Mở DevTools: F12 → Console**

Bạn sẽ thấy:
- ✅ `✅ Dữ liệu sản phẩm:` = thành công
- ❌ `❌ Lỗi khi lấy sản phẩm:` = Backend có vấn đề
- 📡 Xem request/response ở tab **Network**

---

## 🎓 Hiểu Quy Trình

1. **Frontend** (Port 3001)
   - User click sản phẩm
   - Gọi API: `GET http://localhost:3000/api/products/[id]`

2. **Backend** (Port 3000)
   - Nhận request
   - Tìm sản phẩm trong MongoDB
   - Trả về JSON data

3. **Frontend nhận response**
   - Hiển thị trên giao diện ProductDetail

---

**Chúc bạn thành công! 🚀**
