import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 100 : 0;
  const totalAmount = subtotal + shipping;

  // This function loads the Razorpay script
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // This is the main payment function
  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // 1. Ask our backend to create a Razorpay order
    const response = await fetch('/api/razorpay', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount }),
    });

    const order = await response.json();
    if (!order) {
      alert('Server error. Are you online?');
      return;
    }

    // 2. Open the Razorpay payment window
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Get the Key ID from .env
      amount: order.amount,
      currency: order.currency,
      name: 'SOUL Fragrance',
      description: 'Thank you for your purchase',
      image: '/logo.png',
      order_id: order.id,
      handler: function (response) {
        // This function is called after a successful payment
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
        // Here you would typically save order details to your database
        // and redirect to a success page
        navigate('/'); // For now, we redirect to home
      },
      prefill: {
        name: 'Your Name', // We can prefill this if we have user profile data
        email: currentUser.email,
        contact: '9999999999',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const formatIndianRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Layout>
      <section className="py-16 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gold-500 text-center mb-8">Checkout</h1>
          <div className="bg-gray-800 rounded-xl p-8 border border-gold-500/30">
            <h3 className="text-2xl font-semibold text-gold-400 mb-6">Order Summary</h3>
            
            {cart.items.map(item => (
              <div key={item.id} className="flex justify-between items-center text-gray-300 py-2 border-b border-gray-700">
                <span>{item.name} x {item.quantity}</span>
                <span>{formatIndianRupees(item.price * item.quantity)}</span>
              </div>
            ))}

            <div className="space-y-3 mt-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>{formatIndianRupees(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{formatIndianRupees(shipping)}</span>
              </div>
              <div className="border-t border-gray-600 pt-3 mt-3">
                <div className="flex justify-between text-xl font-semibold text-gold-400">
                  <span>Total</span>
                  <span>{formatIndianRupees(totalAmount)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={displayRazorpay}
              className="mt-8 w-full bg-gold-600 text-black font-semibold py-3 rounded-lg hover:bg-gold-500 transition font-sans text-lg"
            >
              Pay Now
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;