import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // <-- Import useCart

const GiftSets = () => {
  const { dispatch } = useCart(); // <-- Get dispatch function

  const giftSets = [
    {
      id: 5,
      name: "Luxury Perfume Gift Set - 4 x 20ml",
      description: "Experience our signature collection with this exquisite gift set featuring four distinct fragrances. Perfect for gifting or personal discovery.",
      price: 699,
      images: ["/product5.jpg"],
      category: "gift-sets",
      includes: ["Mystic 20ml", "Blu 20ml", "Oud Intense 20ml", "Her 20ml", "Elegant Gift Box"]
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
          <h1 className="text-4xl md:text-5xl font-bold text-gold-500 text-center mb-4">Gift Sets</h1>
          <p className="text-gray-300 text-lg text-center mb-12 max-w-2xl mx-auto font-sans">
            Perfect presents for your loved ones. Our gift sets are thoughtfully curated to create unforgettable moments.
          </p>
          
          <div className="max-w-4xl mx-auto">
            {giftSets.map((product) => (
              <div key={product.id} className="bg-gray-800 shadow-2xl rounded-xl p-8 border border-gold-500/30">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="rounded-lg w-full h-96 object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-semibold text-gold-400 mb-4">{product.name}</h3>
                    <p className="text-gray-300 text-lg mb-6 font-sans leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-gold-400 mb-3">What's Included:</h4>
                      <ul className="text-gray-300 space-y-2">
                        {product.includes.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <span className="text-gold-500 mr-3">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <p className="text-gold-500 font-bold text-2xl mb-6 font-sans">
                      {formatIndianRupees(product.price)}
                    </p>
                    
                    <div className="flex space-x-4">
                      <Link 
                        to={`/product/${product.id}`}
                        className="flex-1 px-6 py-3 bg-gray-700 text-gold-300 font-medium rounded hover:bg-gray-600 transition font-sans text-center"
                      >
                        View Details
                      </Link>
                      <button 
                        onClick={() => addToCart(product)}
                        className="flex-1 px-6 py-3 bg-gold-600 text-black font-medium rounded hover:bg-gold-500 transition font-sans"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GiftSets;