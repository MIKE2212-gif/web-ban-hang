import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function OnSale() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOnSaleProducts();
  }, []);

  const fetchOnSaleProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getProducts();
      // Lọc chỉ sản phẩm có discount
      const onSaleProducts = response.filter(product => product.discount && product.discount > 0);
      setProducts(onSaleProducts);
    } catch (err) {
      setError('Không thể tải sản phẩm. Vui lòng kiểm tra Backend!');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }
    if (rating % 1 !== 0) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-yellow-400" />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Đang tải sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12">Sản Phẩm Khuyến Mãi</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-lg h-64 mb-4 bg-gray-100 relative">
                <img
                  src={product.image || '/images/placeholder.png'}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                {product.discount > 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded text-xs font-bold">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <p className="font-semibold text-sm mb-2 truncate">{product.name}</p>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex gap-1">
                  {renderStars(product.rating || 4)}
                </div>
                <span className="text-xs text-gray-600">({product.reviews || 0})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600">Không có sản phẩm khuyến mãi</p>
        )}
      </div>
    </div>
  );
}
