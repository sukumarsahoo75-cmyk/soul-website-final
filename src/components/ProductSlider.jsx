import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// SVG Icons for Product Slider
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const ProductSlider = ({ cartItems, setCartItems }) => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Product data
  const products = [
    {
      id: 5,
      name: "Luxury Perfume Gift Set - 4 x 20ml",
      description: "Experience our signature collection with this exquisite gift set featuring four distinct fragrances.",
      price: 4999,
      images: ["/images/product5.jpg"],
      category: "gift-sets"
    },
    {
      id: 1,
      name: "Mystic",
      description: "A fresh, modern fragrance with notes of citrus and amber.",
      price: 7499,
      images: ["/images/product1.jpg"],
      category: "for-her"
    },
    {
      id: 2,
      name: "Blu",
      description: "A warm, woody fragrance with hints of vanilla and musk.",
      price: 7999,
      images: ["/images/product2.jpg"],
      category: "for-him"
    },
    {
      id: 3,
      name: "Oud Intense",
      description: "A rich, intense oud fragrance with deep woody and spicy notes.",
      price: 8999,
      images: ["/images/product3.jpg"],
      category: "for-him"
    },
    {
      id: 4,
      name: "Her",
      description: "An elegant floral fragrance with delicate notes of jasmine and rose.",
      price: 7299,
      images: ["/images/product4.jpg"],
      category: "for-her"
    }
  ];

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  const nextProducts = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentProductIndex((prev) => (prev + 1) % (products.length - 3));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevProducts = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentProductIndex((prev) => (prev - 1 + (products.length - 3)) % (products.length - 3));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const formatIndianRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const visibleProducts = products.slice(currentProductIndex, currentProductIndex + 4);

  return (
    <section id="all-products" className="py-16 px-6 max-w-7xl mx-auto text-center bg-gray-900">
      <h2 className="text-3xl font-bold mb-10 text-gold-500">Our Collection</h2>
      
      {/* Product Slider */}
      <div className="relative">
        {/* Navigation Arrows */}
        {products.length > 4 && (
          <>
            <button 
              onClick={prevProducts}
              disabled={isAnimating}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-8 bg-gold-500 text-black p-3 rounded-full hover:bg-gold-400 transition z-10 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <ChevronLeft />
            </button>
            
            <button 
              onClick={nextProducts}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-8 bg-gold-500 text-black p-3 rounded-full hover:bg-gold-400 transition z-10 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              <ChevronRight />
            </button>
          </>
        )}

        {/* Products Container with Animation */}
        <div className="overflow-hidden">
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500 ${
              isAnimating ? 'opacity-70 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {visibleProducts.map((product, index) => (
              <div 
                key={product.id}
                className={`bg-gray-800 shadow-2xl rounded-xl p-4 border border-gray-700 hover:border-gold-500 transition-all duration-500 transform ${
                  isAnimating ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'
                }`}
                style={{
                  transitionDelay: isAnimating ? '0ms' : `${index * 100}ms`
                }}
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gold-400">{product.name}</h3>
                <p className="text-gray-400 text-sm mt-2 font-sans leading-relaxed">
                  {product.description}
                </p>
                <p className="text-gold-500 font-bold mt-2 font-sans">
                  {formatIndianRupees(product.price)}
                </p>
                <div className="mt-4 flex justify-between space-x-2">
                  <Link 
                    to={`/product/${product.id}`}
                    className="flex-1 px-3 py-2 bg-gray-700 text-gold-300 text-sm font-medium rounded hover:bg-gray-600 transition font-sans text-center"
                  >
                    View Details
                  </Link>
                  <button 
                    onClick={addToCart}
                    className="flex-1 px-3 py-2 bg-gold-600 text-black text-sm font-medium rounded hover:bg-gold-500 transition font-sans"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Indicators */}
        {products.length > 4 && (
          <div className="flex justify-center mt-8 space-x-3">
            {Array.from({ length: products.length - 3 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentProductIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProductIndex 
                    ? "bg-gold-500 scale-125" 
                    : "bg-gray-600 hover:bg-gray-500"
                } ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
                disabled={isAnimating}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSlider;