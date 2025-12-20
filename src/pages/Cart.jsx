import React from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Free Shipping logic (Cap at 999)
  const shippingCost = total >= 999 ? 0 : 99;
  const finalTotal = total + shippingCost;

  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/checkout' } });
    } else {
      navigate('/checkout');
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-3xl font-serif text-gray-500 mb-4">Your Soul is Empty</h2>
          <p className="text-gray-400 mb-8">Add some luxury to your life.</p>
          <Link to="/all-products" className="bg-yellow-500 text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-white transition">Start Shopping</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white py-12 px-4 font-sans">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-serif text-yellow-500 mb-8 text-center">Your Bag</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center bg-gray-900 p-4 rounded-lg border border-gray-800">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded border border-gray-700" />
                  
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-bold text-white font-serif">{item.name}</h3>
                    <p className="text-yellow-500">₹{item.price}</p>
                  </div>
                  
                  {/* + and - Buttons */}
                  <div className="flex items-center gap-3 bg-black px-3 py-1 rounded border border-gray-800">
                    <button onClick={() => dispatch({type: "DECREMENT", payload: item.id})} className="text-gray-400 hover:text-white text-xl px-2">-</button>
                    <span className="w-4 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => dispatch({type: "INCREMENT", payload: item.id})} className="text-gray-400 hover:text-white text-xl px-2">+</button>
                  </div>

                  {/* Remove Button (Cross) */}
                  <button onClick={() => dispatch({type: "REMOVE_ITEM", payload: item.id})} className="ml-6 text-red-500 hover:text-red-400 p-2">
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="md:w-1/3">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 sticky top-24">
                <h3 className="text-xl font-serif text-white mb-6 border-b border-gray-800 pb-4">Order Summary</h3>
                <div className="flex justify-between mb-2 text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between mb-4 text-gray-400">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? <span className="text-green-400">FREE</span> : `₹${shippingCost}`}</span>
                </div>
                
                {/* Free Shipping Progress Bar */}
                {total < 999 && (
                  <div className="mb-4">
                    <div className="w-full bg-gray-800 h-1 rounded-full">
                      <div className="bg-yellow-500 h-1 rounded-full" style={{ width: `${(total/999)*100}%` }}></div>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1 text-center">Add ₹{999 - total} more for Free Shipping</p>
                  </div>
                )}

                <div className="flex justify-between text-xl font-bold text-yellow-500 border-t border-gray-800 pt-4 mb-6">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-yellow-500 text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;