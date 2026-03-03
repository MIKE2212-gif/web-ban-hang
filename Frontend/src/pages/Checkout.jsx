import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Package, CreditCard, ChevronDown, ArrowRight, ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function EuropeanFashionCheckout() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, updateQuantity, removeFromCart } = useCart();
  const [activeTab, setActiveTab] = useState('guest');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Vietnam'
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompleteOrder = () => {
    // Validate form
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (cartItems.length === 0) {
      alert('Giỏ hàng trống');
      return;
    }

    // Lưu order info để hiển thị trên trang success
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('lastOrder', JSON.stringify({
      formData,
      items: cartItems,
      total: getTotalPrice(),
      paymentMethod
    }));

    // Chuyển hướng đến trang thanh toán thành công
    navigate('/order-success');
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Giỏ hàng trống</h1>
          <p className="text-gray-600 mb-6">Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
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
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-slide-down {
          animation: slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }

        .animate-fade {
          animation: fadeIn 0.8s ease-out forwards;
          opacity: 0;
        }

        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }

        .elegant-input {
          border-bottom: 1px solid #e0e0e0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
        }

        .elegant-input:focus {
          border-bottom-color: #000;
          outline: none;
        }

        .elegant-input::placeholder {
          color: #666;
          font-weight: 500;
        }

        .btn-dark {
          background: #000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-dark:hover {
          background: #1a1a1a;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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

        .payment-option {
          border: 1px solid #e0e0e0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .payment-option:hover {
          border-color: #999;
        }

        .payment-option.active {
          border-color: #000;
          background: #fafafa;
        }

        .radio-custom {
          appearance: none;
          width: 20px;
          height: 20px;
          border: 1.5px solid #ccc;
          border-radius: 50%;
          position: relative;
          cursor: pointer;
          transition: all 0.2s;
        }

        .radio-custom:checked {
          border-color: #000;
        }

        .radio-custom:checked::after {
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          background: #000;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .product-image {
          position: relative;
          overflow: hidden;
        }

        .product-image img {
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .product-image:hover img {
          transform: scale(1.05);
        }

        .divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #e0e0e0, transparent);
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0 center;
          padding-right: 24px;
        }

        .quantity-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          cursor: pointer;
        }

        .quantity-btn:hover {
          border-color: #000;
          background: #fafafa;
        }

        .step-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .step-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e0e0e0;
          transition: all 0.3s;
        }

        .step-dot.active {
          width: 32px;
          border-radius: 3px;
          background: #000;
        }
      `}</style>

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between animate-slide-down">
            <h1 className="text-3xl display font-bold tracking-tight">ND STYLE</h1>
            <div className="step-indicator">
              <div className="step-dot active"></div>
              <div className="step-dot"></div>
              <div className="step-dot"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Section - Form */}
          <div className="lg:col-span-7 space-y-12">
            {/* Contact Information */}
            <section className="animate-slide-up delay-100">
              <div className="mb-8">
                <h2 className="text-2xl display font-semibold mb-2">Contact</h2>
                <p className="text-sm text-gray-600 font-medium">We'll use this to send order updates</p>
              </div>

              <div className="space-y-8">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address"
                  className="w-full py-3 elegant-input text-[15px]"
                />

                {/* Tabs */}
                <div className="flex gap-8 border-b border-gray-200">
                  <button
                    onClick={() => setActiveTab('guest')}
                    className={`pb-3 text-[15px] font-semibold transition-all relative ${
                      activeTab === 'guest'
                        ? 'text-black'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Continue as guest
                    {activeTab === 'guest' && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`pb-3 text-[15px] font-semibold transition-all relative ${
                      activeTab === 'login'
                        ? 'text-black'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Sign in
                    {activeTab === 'login' && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></div>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* Delivery Information */}
            <section className="animate-slide-up delay-200">
              <div className="mb-8">
                <h2 className="text-2xl display font-semibold mb-2">Delivery</h2>
                <p className="text-sm text-gray-600 font-medium">Enter your shipping address</p>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="w-full py-3 elegant-input text-[15px]"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="w-full py-3 elegant-input text-[15px]"
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  className="w-full py-3 elegant-input text-[15px]"
                />

                <div className="grid md:grid-cols-3 gap-6">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="w-full py-3 elegant-input text-[15px]"
                  />
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="Postal code"
                    className="w-full py-3 elegant-input text-[15px]"
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full py-3 elegant-input text-[15px] text-gray-900"
                  >
                    <option>Vietnam</option>
                    <option>France</option>
                    <option>Italy</option>
                    <option>United Kingdom</option>
                  </select>
                </div>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className="w-full py-3 elegant-input text-[15px]"
                />
              </div>
            </section>

            {/* Payment Method */}
            <section className="animate-slide-up delay-300">
              <div className="mb-8">
                <h2 className="text-2xl display font-semibold mb-2">Payment</h2>
                <p className="text-sm text-gray-600 font-medium">All transactions are secure and encrypted</p>
              </div>

              <div className="space-y-3">
                <label className={`payment-option p-5 flex items-center gap-4 ${paymentMethod === 'card' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="radio-custom"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-[15px] font-semibold">Credit Card</span>
                    <div className="flex gap-2">
                      <div className="w-10 h-7 bg-gradient-to-br from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                      <div className="w-10 h-7 bg-gradient-to-br from-red-600 to-orange-500 rounded flex items-center justify-center text-white text-[10px] font-bold">MC</div>
                    </div>
                  </div>
                </label>

                <label className={`payment-option p-5 flex items-center gap-4 ${paymentMethod === 'bank' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="radio-custom"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-[15px] font-semibold">Bank Transfer</span>
                    <CreditCard size={20} className="text-gray-400" />
                  </div>
                </label>

                <label className={`payment-option p-5 flex items-center gap-4 ${paymentMethod === 'cod' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="radio-custom"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-[15px] font-semibold">Cash on Delivery</span>
                    <Package size={20} className="text-gray-400" />
                  </div>
                </label>
              </div>

              <div className="mt-6 flex items-start gap-3 p-4 bg-gray-50 border border-gray-200">
                <Lock size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your payment information is processed securely. We do not store credit card details.
                </p>
              </div>
            </section>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-8 space-y-8 animate-slide-up delay-400">
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="text-2xl display font-semibold mb-8">Order Summary</h2>

                {/* Product */}
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item._id}>
                      <div className="flex gap-5">
                        <div className="product-image flex-shrink-0">
                          <img
                            src={item.image || item.images?.[0] || 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=400&fit=crop'}
                            alt={item.name}
                            className="w-28 h-36 object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div>
                            <h3 className="font-semibold text-[15px] mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-600 font-medium">{item.category || 'Product'}</p>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-200">
                              <button 
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                className="quantity-btn border-r border-gray-200"
                              >
                                <Minus size={14} />
                              </button>
                              <div className="px-4 text-sm font-medium">{item.quantity}</div>
                              <button 
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="quantity-btn border-l border-gray-200"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item._id)}
                              className="text-sm text-gray-500 hover:text-black transition-colors underline"
                            >
                              Remove
                            </button>
                          </div>

                          <p className="text-lg font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                      </div>
                      <div className="divider mt-6"></div>
                    </div>
                  ))}
                

                  {/* Promo Code */}
                  <div>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Discount code"
                        className="flex-1 px-4 py-3 border border-gray-200 text-[15px] focus:outline-none focus:border-black transition-colors"
                      />
                      <button className="btn-light px-6 py-3 text-[15px] font-medium">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="divider"></div>

                  {/* Summary */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-[15px]">
                      <span className="text-gray-700 font-medium">Subtotal</span>
                      <span className="font-semibold">{formatCurrency(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                      <span className="text-gray-700 font-medium">Shipping</span>
                      <span className="font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between text-[15px]">
                      <span className="text-gray-700 font-medium">Tax</span>
                      <span className="font-semibold">Included</span>
                    </div>
                  </div>

                  <div className="divider"></div>

                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold">Total</span>
                    <div className="text-right">
                      <span className="text-2xl display font-bold">{formatCurrency(getTotalPrice())}</span>
                      <p className="text-xs text-gray-600 font-medium mt-1">VND</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3 pt-4">
                    <button onClick={handleCompleteOrder} className="w-full btn-dark text-white py-4 text-[15px] font-bold tracking-wide flex items-center justify-center gap-3 group">
                      <span>COMPLETE ORDER</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button className="w-full text-center text-[14px] text-gray-600 hover:text-black transition-colors py-2">
                      Continue shopping
                    </button>
                  </div>
                </div>
              </div>

              {/* Trust */}
              <div className="flex flex-col gap-3 text-xs text-gray-700 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <span>Free shipping on orders over ₫2,000,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
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
