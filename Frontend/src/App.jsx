<<<<<<< HEAD
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Auth from "./pages/Auth";
import Brand from "./pages/Brand";
import OnSale from "./pages/OnSale";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import SearchResults from "./pages/SearchResults";

// --- admin imports
import AdminLayout from "./components/AdminLayout";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import ProductForm from "./pages/admin/ProductForm";
import AdminOrders from "./pages/admin/Orders";
import OrderDetail from "./pages/admin/OrderDetail";
import AdminUsers from "./pages/admin/Users";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot"; // 👈 THÊM DÒNG NÀY
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/brands" element={<Brand />} />
        <Route path="/on-sale" element={<OnSale />} />
        <Route path="/new-arrivals" element={<NewArrivalsPage />} />
        <Route path="/search" element={<SearchResults />} />

        {/* admin area */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id" element={<ProductForm />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* 🤖 CHATBOT – GẮN Ở ĐÂY */}
      <ChatBot />

      <Footer />
    </CartProvider>
=======
import React from "react";
// Sửa ở đây: bỏ dấu {} vì Header được export default
import Header from "./components/Header";
import Hero from "./components/Hero";
import BrandBar from "./components/BrandBar";
import NewArrivals from "./components/NewArrivals";
import TopSelling from "./components/TopSelling";




function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <Header />
      <Hero/>
      <BrandBar/>
      <NewArrivals/>
      <TopSelling/>



      {/* Nội dung demo */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">Welcome to My Shop!</h1>
        <p className="text-gray-700">
          Đây là web của Minh.
        </p>
      </main>
    </div>
>>>>>>> a10a021fcec50b7386dcd97d13d2859ec46d40e8
  );
}

export default App;
