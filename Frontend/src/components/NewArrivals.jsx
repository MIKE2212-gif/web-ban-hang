import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data từ Backend khi component mount
  useEffect(() => {
    fetchNewArrivals();
  }, []);

  const fetchNewArrivals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.getNewArrivals();
      setProducts(response.data);
    } catch (err) {
      setError('Không thể tải sản phẩm. Vui lòng kiểm tra Backend đã chạy chưa!');
      console.error('Error fetching new arrivals:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-yellow-400" />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          NEW ARRIVALS
        </h1>
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          NEW ARRIVALS
        </h1>
        <div className="text-center py-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600 mb-4">⚠️ {error}</p>
            <button
              onClick={fetchNewArrivals}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        NEW ARRIVALS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <Link key={product._id} to={`/products/${product._id}`} className="group cursor-pointer">
            <div className="bg-gray-100 rounded-2xl p-4 mb-4 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                }}
              />
            </div>

            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>

            <div className="flex items-center gap-1 mb-2">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-600 ml-1">
                {product.rating}/5
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">${product.price}</span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.oldPrice}
                  </span>
                  <span className="text-sm text-red-500 bg-red-50 px-2 py-1 rounded-full">
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <button className="px-16 py-3 border-2 border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors">
          View All
        </button>
      </div>
    </div>
  );
};

export default NewArrivals;