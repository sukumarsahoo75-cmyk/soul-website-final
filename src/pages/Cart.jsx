import React from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  // 1. Calculate Subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // 2. SHIPPING LOGIC: Free if subtotal >= 2000, else 99
  const shippingCost = subtotal >= 2000 ? 0 : 99;

  // 3. Grand Total
  const grandTotal = subtotal + shippingCost;

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQuantity } });
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white py-16 px-4 font-sans">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl font-serif text-yellow-500 mb-8 text-center">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
              <p className="text-gray-400 text-xl mb-6">Your cart is currently empty.</p>
              <Link to="/all-products" className="bg-yellow-500 text-black px-8 py-3 rounded font-bold hover:bg-white transition uppercase tracking-widest">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              
              {/* CART ITEMS LIST */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="bg-gray-900 p-4 rounded-lg border border-gray-800 flex items-center gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 bg-black rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Details */}
                    <div className="flex-grow">
                      <h3 className="text-yellow-500 font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-400 text-sm">{item.selectedSize || "50ml"} - ₹{item.price}</p>
                      
                      {/* Controls */}
                      <div className="flex items-center mt-3 gap-4">
                        <div className="flex items-center border border-gray-600 rounded bg-black">
                          <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="px-3 py-1 text-yellow-500">-</button>
                          <span className="px-2 text-white text-sm">{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="px-3 py-1 text-yellow-500">+</button>
                        </div>
                        <button onClick={() => handleRemove(item.id)} className="text-red-500 text-xs underline hover:text-red-400">
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-white font-bold">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CART SUMMARY */}
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 h-fit">
                <h3 className="text-xl font-serif text-white mb-6 border-b border-gray-700 pb-4">Order Summary</h3>
                
                <div className="flex justify-between mb-4 text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                
                <div className="flex justify-between mb-4 text-gray-400">
                  <span>Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="text-green-400 font-bold">Free</span>
                  ) : (
                    <span>₹{shippingCost}</span>
                  )}
                </div>

                {/* Free Shipping Message */}
                {subtotal < 2000 && (
                   <div className="bg-gray-800 p-2 rounded mb-4 text-center">
                     <p className="text-xs text-yellow-500">
                       Add items worth <span className="font-bold">₹{2000 - subtotal}</span> more for Free Shipping!
                     </p>
                   </div>
                )}
                
                <div className="flex justify-between mt-6 pt-6 border-t border-gray-700 text-xl font-bold text-yellow-500">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>

                <button 
                  onClick={proceedToCheckout}
                  className="w-full bg-yellow-500 text-black font-bold py-4 rounded mt-8 hover:bg-white transition uppercase tracking-widest shadow-lg"
                >
                  Proceed to Checkout
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;