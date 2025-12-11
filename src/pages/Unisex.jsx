import React from 'react';
import Layout from '../components/Layout';
import { products } from '../data'; 
import { Link } from 'react-router-dom';

const Unisex = () => {
  // Filter for unisex products
  const unisexProducts = products.filter(p => p.category === 'unisex');

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl text-gold-500 mb-2 font-serif">Unisex Collection</h1>
          <p className="text-gray-400">Scents that transcend gender boundaries.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {unisexProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div className="bg-gray-800 rounded-lg p-4 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition border border-gray-800 hover:border-gold-500/30 group">
                <div className="h-64 overflow-hidden rounded mb-4 bg-gray-700 relative">
                   <img 
                     src={product.image} 
                     alt={product.name} 
                     className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                   />
                </div>
                <h3 className="text-xl text-gold-100 font-bold">{product.name}</h3>
                <p className="text-gold-400 font-semibold mt-1">₹{product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Unisex;