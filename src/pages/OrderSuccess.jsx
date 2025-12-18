import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';

const OrderSuccess = () => {
  const location = useLocation();
  // We will pass the order ID from the checkout page
  const { orderId } = location.state || { orderId: "PENDING" };

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4 font-sans">
        <div className="bg-gray-900 p-10 rounded-lg border border-yellow-500/30 max-w-lg w-full shadow-[0_0_30px_rgba(234,179,8,0.1)]">
          
          <div className="text-6xl mb-6">✨</div>
          
          <h1 className="text-3xl font-serif text-yellow-500 mb-4">Order Confirmed!</h1>
          <p className="text-gray-300 mb-8">
            Thank you for choosing Soul Fragrance. Your journey to luxury begins now.
          </p>

          <div className="bg-black p-4 rounded border border-gray-800 mb-8">
            <span className="block text-gray-500 text-xs uppercase tracking-widest mb-1">Order ID</span>
            <span className="text-2xl font-bold text-white">#{orderId}</span>
          </div>

          <p className="text-sm text-gray-500 mb-8">
            You will receive an email confirmation shortly.
          </p>

          <div className="flex flex-col gap-3">
            <Link to="/profile" className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-white transition uppercase tracking-widest">
              View Order History
            </Link>
            <Link to="/" className="w-full border border-gray-700 text-gray-400 font-bold py-3 rounded hover:text-white hover:border-white transition uppercase tracking-widest">
              Continue Shopping
            </Link>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;