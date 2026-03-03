import React, { useEffect, useState } from 'react';
import { Check, Package, Mail, ArrowRight, Download, Printer } from 'lucide-react';

export default function OrderSuccess() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);

    // Load order data from localStorage
    const lastOrder = localStorage.getItem('lastOrder');
    if (lastOrder) {
      try {
        setOrderData(JSON.parse(lastOrder));
      } catch (error) {
        console.error('Error loading order data:', error);
      }
    }
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const orderDetails = {
    orderNumber: 'ND' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString('vi-VN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    email: localStorage.getItem('userEmail') || 'customer@email.com',
    total: orderData ? formatCurrency(orderData.total) : '₫0',
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    })
  };

  return (
    <div className="min-h-screen bg-[#fafafa] relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.01em;
          font-weight: 500;
        }

        h1, h2, h3, .display {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.02em;
          font-weight: 600;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes checkmark {
          0% {
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .checkmark-wrapper {
          position: relative;
          animation: pulse 2s ease-in-out infinite;
        }

        .checkmark-wrapper::before,
        .checkmark-wrapper::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          border: 2px solid #10b981;
          border-radius: 50%;
          animation: ripple 2s ease-out infinite;
        }

        .checkmark-wrapper::after {
          animation-delay: 1s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .animate-slide-down {
          animation: slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-scale {
          animation: scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fade {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }

        .checkmark-circle {
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: checkmark 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.3s forwards;
        }

        .checkmark-check {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: checkmark 0.4s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti 3s ease-in-out forwards;
        }

        .btn-dark {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-dark:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
        }

        .btn-light {
          background: #fff;
          border: 1px solid #e0e0e0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-light:hover {
          border-color: #000;
          transform: translateY(-1px);
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
        }

        .info-card {
          border: 1px solid #e0e0e0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .info-card:hover {
          border-color: #000;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                background: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#059669'][Math.floor(Math.random() * 5)],
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}


      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-center animate-slide-down">
            <h1 className="text-3xl display font-bold tracking-tight">ND STYLE</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          {/* Success Icon */}
          <div className="flex justify-center mb-8 animate-scale">
            <div className="relative checkmark-wrapper">
              <svg width="120" height="120" viewBox="0 0 120 120">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  className="checkmark-circle"
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="4"
                  filter="url(#glow)"
                />
                <path
                  className="checkmark-check"
                  d="M35 60 L52 77 L85 44"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-12 animate-slide-up delay-200">
            <h2 className="text-4xl md:text-5xl display font-bold mb-4">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Đặt hàng thành công!
              </span>
            </h2>
            <p className="text-lg text-gray-700 font-semibold mb-2">
              Cảm ơn bạn đã mua hàng tại ND Style
            </p>
            <p className="text-gray-600 font-medium">
              Chúng tôi đã gửi xác nhận đơn hàng đến <span className="font-bold text-black">{orderDetails.email}</span>
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white border border-gray-200 p-8 mb-8 animate-slide-up delay-300">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 font-medium mb-1">Mã đơn hàng</p>
                <p className="text-2xl display font-bold">{orderDetails.orderNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 font-medium mb-1">Ngày đặt hàng</p>
                <p className="text-base font-semibold">{orderDetails.date}</p>
              </div>
            </div>

            {/* Product Summary */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              {!orderData || !orderData.items || orderData.items.length === 0 ? (
                <p className="text-gray-600">Không có thông tin sản phẩm</p>
              ) : (
                <div className="space-y-4">
                  {orderData.items.map((item, index) => (
                    <div key={index} className="flex gap-5">
                      <img
                        src={item.image || item.images?.[0] || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=260&fit=crop'}
                        alt={item.name}
                        className="w-24 h-32 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <p className="text-sm text-gray-600 font-medium mb-3">
                          {item.category || 'Sản phẩm'} · Số lượng: {item.quantity}
                        </p>
                        <p className="text-xl font-bold">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                      {index < orderData.items.length - 1 && (
                        <div className="w-full border-b border-gray-200 my-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-semibold">Tổng cộng</span>
              <span className="text-2xl display font-bold">{orderDetails.total}</span>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Dự kiến giao hàng</p>
                  <p className="font-semibold">{orderDetails.estimatedDelivery}</p>
                </div>
                <Package size={24} className="text-gray-600" />
              </div>
            </div>
          </div>

          {/* Info Cards Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-8 animate-slide-up delay-400">
            <div className="info-card bg-white p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
                <Package className="text-white" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Đang chuẩn bị</h3>
              <p className="text-sm text-gray-600 font-medium">
                Đơn hàng sẽ được giao trong 2-3 ngày
              </p>
            </div>

            <div className="info-card bg-white p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
                <Mail className="text-white" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Theo dõi đơn hàng</h3>
              <p className="text-sm text-gray-600 font-medium">
                Kiểm tra email để xem trạng thái vận chuyển
              </p>
            </div>

            <div className="info-card bg-white p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
                <Check className="text-white" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Đổi trả dễ dàng</h3>
              <p className="text-sm text-gray-600 font-medium">
                Miễn phí đổi trả trong 30 ngày
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 animate-slide-up delay-500">
            <button 
              onClick={() => window.print()}
              className="w-full btn-light py-4 text-[15px] font-semibold flex items-center justify-center gap-3 group"
            >
              <Printer size={20} />
              <span>In hóa đơn</span>
            </button>

            <div className="grid md:grid-cols-2 gap-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="btn-dark text-white py-4 text-[15px] font-bold tracking-wide flex items-center justify-center gap-3 group"
              >
                <span>TIẾP TỤC MUA SẮM</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => window.location.href = '/orders'}
                className="btn-light py-4 text-[15px] font-semibold flex items-center justify-center gap-3"
              >
                <span>XEM CHI TIẾT ĐỠN HÀNG</span>
              </button>
            </div>
          </div>

          {/* Help Text */}
          <div className="text-center mt-12 animate-fade delay-500">
            <p className="text-sm text-gray-600 font-medium">
              Cần hỗ trợ? Liên hệ với chúng tôi qua{' '}
              <a href="mailto:support@ndstyle.com" className="text-black font-semibold underline hover:no-underline">
                support@ndstyle.com
              </a>
              {' '}hoặc hotline{' '}
              <a href="tel:1900xxxx" className="text-black font-semibold underline hover:no-underline">
                1900.xxxx
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600 font-medium">
            <p>© 2024 ND Style. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-black transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
