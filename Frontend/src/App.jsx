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
  );
}

export default App;
