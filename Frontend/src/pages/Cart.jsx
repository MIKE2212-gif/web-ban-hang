import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2 } from "lucide-react";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto p-10 min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-6">Giỏ hàng</h1>
        <div className="text-center">
          <p className="text-gray-500 text-xl mb-6">Giỏ hàng của bạn đang trống</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">Giỏ hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 transition"
              >
                {/* Product image */}
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/100x100?text=No+Image"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100x100?text=No+Image";
                    }}
                  />
                </div>

                {/* Product info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {item.description && item.description.substring(0, 100)}...
                  </p>
                  <p className="font-bold text-lg text-red-500">
                    {typeof item.price === "number"
                      ? item.price.toLocaleString("vi-VN")
                      : item.price}{" "}
                    ₫
                  </p>
                </div>

                {/* Quantity and remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, Math.max(1, item.quantity - 1))
                      }
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 min-w-12 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-bold text-lg">
                    {typeof item.price === "number"
                      ? (item.price * item.quantity).toLocaleString("vi-VN")
                      : item.price}{" "}
                    ₫
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={clearCart}
            className="mt-6 px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition"
          >
            Xóa tất cả
          </button>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
            <h2 className="text-2xl font-bold mb-6">Tóm tắt đơn hàng</h2>

            <div className="space-y-4 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-gray-600">Số lượng sản phẩm:</span>
                <span className="font-semibold">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Số lượng danh mục:</span>
                <span className="font-semibold">{cartItems.length}</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Tổng cộng:</span>
                <span className="text-red-500">
                  {getTotalPrice().toLocaleString("vi-VN")} ₫
                </span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition mb-3"
            >
              Thanh toán
            </button>

            <Link
              to="/"
              className="block text-center py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
