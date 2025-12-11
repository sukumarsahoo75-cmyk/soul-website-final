import React, { useState } from 'react';
import Layout from '../components/Layout';
import { products } from '../data';
import { Link } from 'react-router-dom';

const AllProducts = () => {
  const [filter, setFilter] = useState('all'); 
  const categories = ['all', 'for-him', 'for-her', 'unisex'];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  return (
    <Layout>
      <div className="bg-black min-h-screen py-16 px-4">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-yellow-500 mb-6">Our Collection</h1>
          
          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm uppercase tracking-widest border transition-all
                  ${filter === cat 
                    ? 'bg-yellow-500 text-black border-yellow-500 font-bold' 
                    : 'bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white'
                  }`}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="container mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="group">
              <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-yellow-500 transition duration-300 relative">
                
                {/* IMAGE CONTAINER */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={`w-full h-full object-cover group-hover:scale-110 transition duration-700 ${!product.inStock && 'grayscale opacity-50'}`}
                  />
                  
                  {/* SOLD OUT BADGE */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="border border-white text-white font-bold px-4 py-2 uppercase tracking-widest">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* DETAILS */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-serif text-white group-hover:text-yellow-500 transition">{product.name}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1 mb-3">{product.category.replace('-', ' ')}</p>
                  <p className="text-yellow-500 font-bold text-lg">₹{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </Layout>
  );
};

export default AllProducts;