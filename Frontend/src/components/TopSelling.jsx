import React from "react";
import { Star } from "lucide-react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> a10a021fcec50b7386dcd97d13d2859ec46d40e8

const TopSelling = () => {
  const products = [
    {
      id: 1,
      name: "Vertical Striped Shirt",
      image: "/images/products/vertical.svg",
      rating: 5.0,
      reviews: 5,
      price: 212,
      originalPrice: 232,
      discount: 20,
    },
    {
      id: 2,
      name: "Courage Graphic T-shirt",
      image: "/images/products/corange.svg",
      rating: 4.0,
      reviews: 5,
      price: 145,
      originalPrice: null,
      discount: null,
    },
    {
      id: 3,
      name: "Loose Fit Bermuda Shorts",
      image: "/images/products/loosefit.svg", // ✅ sửa image -> images
      rating: 3.0,
      reviews: 5,
      price: 80,
      originalPrice: null,
      discount: null,
    },
    {
      id: 4,
      name: "Faded Skinny Jeans",
      image: "/images/products/fadedskinny.svg",
      rating: 4.5,
      reviews: 5,
      price: 210,
      originalPrice: null,
      discount: null,
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // ⭐ sao đầy
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    // ⭐ nửa sao
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <Star className="w-4 h-4 text-yellow-400" />
          <div className="absolute inset-0 w-1/2 overflow-hidden">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    // ⭐ sao rỗng
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
      <h2 className="text-4xl font-bold text-center mb-12">
        TOP SELLING
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
<<<<<<< HEAD
          <Link key={product.id} to={`/products/${product.id}`} className="group cursor-pointer">
=======
          <div key={product.id} className="group cursor-pointer">
>>>>>>> a10a021fcec50b7386dcd97d13d2859ec46d40e8
            <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h3 className="font-semibold text-lg mb-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating.toFixed(1)}/5
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold">
                ${product.price}
              </span>

              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>

                  {product.discount && (
                    <span className="text-sm text-red-500 bg-red-50 px-2 py-1 rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                </>
              )}
            </div>
<<<<<<< HEAD
          </Link>
=======
          </div>
>>>>>>> a10a021fcec50b7386dcd97d13d2859ec46d40e8
        ))}
      </div>

      <div className="flex justify-center">
        <button className="px-16 py-3 border-2 border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-colors">
          View All
        </button>
      </div>
    </div>
  );
};

export default TopSelling;
