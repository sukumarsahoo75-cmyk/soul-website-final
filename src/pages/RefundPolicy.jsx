import React from 'react';
import Layout from '../components/Layout';

const RefundPolicy = () => {
  return (
    <Layout>
      <div className="bg-black min-h-screen text-white py-16 px-4 font-sans">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-serif text-yellow-500 mb-8 text-center">Refund & Return Policy</h1>
          
          <div className="space-y-8 text-gray-300 leading-relaxed">
            
            <section>
              <h2 className="text-xl text-yellow-500 font-bold mb-3">How do I know if an item is eligible for return?</h2>
              <p>Our products are <span className="text-red-400 font-bold">NOT eligible for Return/Exchange</span> due to hygiene and personal care nature of the products.</p>
            </section>

            <section>
              <h2 className="text-xl text-yellow-500 font-bold mb-3">What if I receive a damaged / defective / wrong product?</h2>
              <p className="mb-4">We Quality Control all our shipping and packaging processes, but in rare circumstances, if you do receive a damaged, defective/wrong product or an incomplete order, simply get in touch with us.</p>
              
              <div className="bg-gray-800 p-6 rounded border border-gray-700">
                <p className="font-bold text-white mb-2">MANDATORY REQUIREMENT:</p>
                <p>If your online order arrived damaged or defective, please bypass the instructions below and contact us (within 2 business days) along with an <span className="text-yellow-500 font-bold">UNBOXING VIDEO (MANDATORY)</span>.</p>
                <p className="mt-2">Email: <a href="mailto:soulfragranceindia@gmail.com" className="text-yellow-500 underline">soulfragranceindia@gmail.com</a></p>
                <p>Phone: +91 9777293543 (Mon-Fri, 11 AM - 6 PM)</p>
              </div>

              <div className="mt-6">
                <p className="mb-2">Please provide the following details when contacting us:</p>
                <ul className="list-disc pl-5 space-y-1 text-gray-400">
                  <li>Customer Name/Email</li>
                  <li>Order Number</li>
                  <li>Reason for return</li>
                  <li>Unboxing Video Proof</li>
                </ul>
              </div>
            </section>

            <section className="border-t border-gray-800 pt-8">
              <h2 className="text-xl text-yellow-500 font-bold mb-3">Refund Policy</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Refunds are subject to approval upon receiving the return request and validating the proof.</li>
                <li>For refunds, payment will be made to the source account. The customer is required to share bank details if needed.</li>
              </ul>
              
              <p className="mt-4 text-sm text-gray-400">
                <span className="text-white font-bold">Note:</span> All refunds are made after deducting a small fee of <span className="text-white font-bold">3%</span> (payment gateway associated fees).
              </p>
              <p className="mt-2 text-sm text-gray-400">
                For failed online transactions, refunds are automatically processed to the source account and might take up to 7 working days. (Please note: We do not hold this amount).
              </p>
            </section>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RefundPolicy;