import React from 'react';
import Layout from '../components/Layout';
import { products } from '../data'; 
import { Link } from 'react-router-dom';

const SignatureCollection = () => {
  // Filter only items marked as Signature in data.js
  const signatureProducts = products.filter(p => p.isSignature === true);

  return (
    <Layout>
      <div className="bg-gray-900 min-h-screen py-16 px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl text-gold-500 font-serif mb-6 tracking-wide">Signature Collection</h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our most exclusive, premium formulations.
          </p>
          <div className="w-24 h-1 bg-gold-500 mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {signatureProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-gold-500 transition-all">
                <div className="h-80 overflow-hidden relative">
                  <div className="absolute top-4 right-4 bg-gold-500 text-black text-xs font-bold px-3 py-1 rounded-full z-10">PREMIUM</div>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-2xl text-gold-100 font-serif font-bold mb-2">{product.name}</h3>
                  <p className="text-gold-400 text-xl font-semibold">₹{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SignatureCollection;