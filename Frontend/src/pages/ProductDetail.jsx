import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!id) {
      setError("Không tìm thấy ID sản phẩm");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        console.log("✅ Dữ liệu sản phẩm:", res.data);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Lỗi khi lấy sản phẩm:", err);
        setError(
          err.response?.data?.message ||
            "Không lấy được sản phẩm. Vui lòng kiểm tra backend!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ===== LOADING =====
  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-10 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // ===== ERROR =====
  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-10 bg-red-50 border border-red-200 rounded-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ Lỗi</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  // ===== KHÔNG CÓ SẢN PHẨM =====
  if (!product) {
    return (
      <div className="max-w-5xl mx-auto p-10">
        <p className="text-gray-600">Không có sản phẩm</p>
      </div>
    );
  }

  // ===== HIỂN THỊ CHI TIẾT =====
  return (
    <div className="max-w-5xl mx-auto p-10 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Hình ảnh sản phẩm */}
        <div>
          <img
            src={
              product.image ||
              "https://via.placeholder.com/300x400?text=No+Image"
            }
            alt={product.name}
            className="w-full rounded-lg"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x400?text=No+Image";
            }}
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <span className="text-4xl font-semibold text-red-500">
              {typeof product.price === "number"
                ? product.price.toLocaleString("vi-VN")
                : product.price}{" "}
              ₫
            </span>
          </div>

          {product.rating && (
            <div className="mb-4">
              ⭐ Rating:{" "}
              <span className="font-semibold">{product.rating}/5</span>
            </div>
          )}

          {product.stock !== undefined && (
            <div className="mb-4">
              📦 Tồn kho:{" "}
              <span className="font-semibold">{product.stock}</span>
            </div>
          )}

          {product.category && (
            <div className="mb-6">
              📂 Danh mục:{" "}
              <span className="font-semibold">{product.category}</span>
            </div>
          )}

          {/* Quantity selector */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-l border-r outline-none"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Cart message */}
          {cartMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600">
              {cartMessage}
            </div>
          )}

          {/* Add to cart button */}
          <button
            onClick={() => {
              addToCart(product, quantity);
              setCartMessage(`✅ Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
              setQuantity(1);
              setTimeout(() => setCartMessage(""), 3000);
            }}
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
