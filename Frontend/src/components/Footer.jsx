import React, { useState } from 'react';
import { Mail, Twitter, Facebook, Instagram, Github } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      alert(`Đã đăng ký với email: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-50">
      {/* Newsletter Section */}
      <div className="bg-black text-white py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              STAY UPTO DATE ABOUT
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold">
              OUR LATEST OFFERS
            </h2>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-3">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full md:w-80 pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
            </div>
            <button
              onClick={handleSubscribe}
              className="w-full md:w-80 bg-white text-black font-semibold py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">SHOP.CO</h3>
            <p className="text-gray-600 text-sm mb-6">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 tracking-wider">COMPANY</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Works</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Career</a></li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 tracking-wider">HELP</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Customer Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Delivery Details</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* FAQ Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 tracking-wider">FAQ</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Account</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Manage Deliveries</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Orders</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Payments</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4 tracking-wider">RESOURCES</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Free eBooks</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Development Tutorial</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">How to - Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Youtube Playlist</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex gap-2">
            <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs">VISA</span>
            </div>
            <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
              <div className="flex">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full -ml-1"></div>
              </div>
            </div>
            <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xs">PayPal</span>
            </div>
            <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
              <span className="font-bold text-xs">Pay</span>
            </div>
            <div className="w-12 h-8 bg-white border border-gray-300 rounded flex items-center justify-center">
              <span className="font-bold text-xs">G Pay</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;