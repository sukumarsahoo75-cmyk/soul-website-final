import React from 'react';
import Layout from '../components/Layout';

const ShippingPolicy = () => {
  return (
    <Layout>
      <div className="bg-black min-h-screen text-white py-16 px-4 font-sans">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-serif text-yellow-500 mb-8 text-center">Shipping Policy</h1>
          
          <div className="space-y-6 text-gray-300 leading-relaxed bg-gray-900 p-8 rounded-xl border border-gray-800">
            
            <div className="p-4 bg-yellow-500/10 border-l-4 border-yellow-500 mb-8">
              <h3 className="text-yellow-500 font-bold uppercase mb-1">Important Note</h3>
              <p className="text-white">We are accepting <span className="font-bold">PREPAID ORDERS ONLY</span> at this time. Once an item is shipped, the order cannot be cancelled.</p>
            </div>

            <h2 className="text-xl text-white font-bold">How long will it take for my order to reach me?</h2>
            <p>It can take between <span className="text-white font-bold">3-6 business days</span> to deliver once it dispatches (not including weekends and national holidays). We need 1-2 days to prepare your package.</p>
            <p>If your order has not arrived by the expected date, please contact us so that we can open an investigation with our shipping partner. The investigation to locate your package may take up to two weeks.</p>

            <p className="mt-4">We love our customers and hence cover entire India with our logistic partners.</p>
            <p>We understand that every order is a gift to yourself or your loved ones. To ensure the safety of your gift, we are working with a leading courier company that delivers fast and safely.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;