import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <-- Import useCart

const ForHer = () => {
  const { dispatch } = useCart(); // <-- Get dispatch function

  const womenProducts = [
    {
      id: 1,
      name: "Mystic",
      description: "A fresh, modern fragrance with notes of citrus and amber.",
      price: 599,
      images: ["/product1.jpg"],
      category: "unisex"
    },
    {
      id: 3,
      name: "Oud Intense",
      description: "A rich, intense oud fragrance with deep woody and spicy notes.",
      price: 599,
      images: ["/product3.jpg"],
      category: "unisex"
    },
    {
      id: 4,
      name: "Her",
      description: "An elegant floral fragrance with delicate notes of jasmine and rose.",
      price: 499,
      images: ["/product4.jpg"],
      category: "for-her"
    }
  ];

  const formatIndianRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // This is now the real addToCart function
  const addToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity: 1 } // Add 1 item
    });
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <Layout>
      <section className="py-16 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gold-500 text-center mb-4">For Her</h1>
          <p className="text-gray-300 text-lg text-center mb-12 max-w-2xl mx-auto font-sans">
            Explore our exquisite collection of fragrances designed to celebrate femininity and grace, including versatile unisex options.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {womenProducts.map((product) => (
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
                    onClick={() => addToCart(product)}
                    className="flex-1 px-3 py-2 bg-gold-600 text-black text-sm font-medium rounded hover:bg-gold-500 transition font-sans"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForHer;