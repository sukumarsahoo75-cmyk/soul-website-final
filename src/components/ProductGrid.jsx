import React from 'react';
import { Link } from 'react-router-dom';

const ProductGrid = ({ products, onAddToCart }) => {
  const formatIndianRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      // Default add to cart behavior
      console.log(`Added ${product.name} to cart`);
      alert(`Added ${product.name} to cart!`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-800 shadow-2xl rounded-xl p-6 border border-gray-700 hover:border-gold-500 transition-all duration-300">
          <img
            src={product.images[0]}
            alt={product.name}
            className="rounded-lg w-full h-80 object-cover mb-4"
          />
          <h3 className="text-xl font-semibold text-gold-400 mb-2">{product.name}</h3>
          <p className="text-gray-400 text-sm mb-4 font-sans leading-relaxed">
            {product.description}
          </p>
          <p className="text-gold-500 font-bold text-lg mb-4 font-sans">
            {formatIndianRupees(product.price)}
          </p>
          <div className="flex justify-between space-x-2">
            <Link 
              to={`/product/${product.id}`}
              className="flex-1 px-3 py-2 bg-gray-700 text-gold-300 text-sm font-medium rounded hover:bg-gray-600 transition font-sans text-center"
            >
              View Details
            </Link>
            <button 
              onClick={() => handleAddToCart(product)}
              className="flex-1 px-3 py-2 bg-gold-600 text-black text-sm font-medium rounded hover:bg-gold-500 transition font-sans"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;