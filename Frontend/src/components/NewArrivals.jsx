import React from 'react';
import { Star } from 'lucide-react';

const NewArrivals = () => {
  const products = [
    {
      id: 1,
      name: "Checkered Shirt",
      image: "/images/products/Checkered.svg",
      rating: 5.0,
      price: 212,
      originalPrice: 232,
      discount: "-20%",
      bgColor: "bg-gray-100"
    },
    {
      id: 2,
      name: "Skinny Fit Jeans",
      image: "/images/products/SkinnyFit.svg",
      rating: 4.0,
      price: 145,
      bgColor: "bg-gray-100"
    },
    {
      id: 3,
      name: "Sleeve T-shirt",
      image: "/images/products/Sleeve.svg",
      rating: 3.0,
      price: 80,
      bgColor: "bg-gray-100"
    },
    {
      id: 4,
      name: "Graphic T-shirt",
      image: "/images/products/T-shirt.svg",
      rating: 4.5,
      price: 210,
      bgColor: "bg-gray-100"
    }
  ];

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
        NEW ARRIVALS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className={`${product.bgColor} rounded-2xl p-4 mb-4 overflow-hidden`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
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
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="text-sm text-red-500 bg-red-50 px-2 py-1 rounded-full">
                    {product.discount}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="px-16 py-3 border-2 border-black-200 rounded-full font-medium hover:bg-gray-50 transition-colors">
          View All
        </button>
      </div>
    </div>
  );
};

export default NewArrivals;
