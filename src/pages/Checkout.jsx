import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, orderBy, limit, getDocs } from 'firebase/firestore';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Free Shipping logic (Cap at 1000)
  const shippingCost = total >= 1000 ? 0 : 99;
  const totalAmount = total + shippingCost;

  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  });

  // AUTO-FILL ADDRESS FROM LAST ORDER
  useEffect(() => {
    const fetchLastAddress = async () => {
      if (currentUser) {
        try {
          const q = query(
            collection(db, "orders"), 
            where("userId", "==", currentUser.uid), 
            orderBy("createdAt", "desc"), 
            limit(1)
          );
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            const lastOrder = querySnapshot.docs[0].data();
            if (lastOrder.shippingDetails) {
              setShippingDetails(prev => ({
                ...prev,
                fullName: lastOrder.shippingDetails.fullName || '',
                // Note: We don't overwrite email here to keep current user's email as default
                phone: lastOrder.shippingDetails.phone || '',
                address: lastOrder.shippingDetails.address || '',
                city: lastOrder.shippingDetails.city || '',
                pincode: lastOrder.shippingDetails.pincode || '',
                state: lastOrder.shippingDetails.state || '',
              }));
            }
          }
        } catch (error) {
          console.log("No previous address found or error fetching", error);
        }
      }
    };
    fetchLastAddress();
  }, [currentUser]);


  const handleChange = (e) => {
    setShippingDetails({...shippingDetails, [e.target.name]: e.target.value});
  };

  // PAYMENT LOGIC
  const handlePayment = async (e) => {
    e.preventDefault();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: totalAmount * 100,
      currency: "INR",
      name: "Soul Fragrance",
      description: "Luxury Perfume Order",
      image: "https://soulfragrance.in/logo.png",
      
      handler: async function (response) {
        try {
          // Save Order to Firebase
          await addDoc(collection(db, "orders"), {
            userId: currentUser.uid,
            items: cart,
            amount: totalAmount,
            shippingDetails: shippingDetails,
            paymentId: response.razorpay_payment_id,
            status: "Paid",
            createdAt: serverTimestamp()
          });

          // Empty Cart
          dispatch({ type: "CLEAR_CART" });

          alert("Payment Successful! Order Placed.");
          navigate('/profile'); 
        } catch (error) {
          console.error("Error saving order:", error);
          alert("Payment successful but order saving failed. Contact support.");
        }
      },
      prefill: {
        name: shippingDetails.fullName,
        email: shippingDetails.email,
        contact: shippingDetails.phone
      },
      theme: { color: "#EAB308" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white py-12 px-4 font-sans">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-serif text-yellow-500 mb-8 text-center">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Form */}
            <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
               <h3 className="text-xl font-bold border-b border-gray-800 pb-2 mb-4">Shipping Details</h3>
               
               <input type="text" name="fullName" placeholder="Full Name" required 
                 className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none"
                 value={shippingDetails.fullName} onChange={handleChange} />
               
               <div className="grid grid-cols-2 gap-4">
                  {/* --- EMAIL IS NOW EDITABLE --- */}
                  <input type="email" name="email" placeholder="Email" required
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none"
                    value={shippingDetails.email} onChange={handleChange} />
                  
                  <input type="tel" name="phone" placeholder="Phone Number" required 
                    className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none"
                    value={shippingDetails.phone} onChange={handleChange} />
               </div>

               <textarea name="address" placeholder="Full Address (House No, Street, Area)" required rows="3"
                 className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none"
                 value={shippingDetails.address} onChange={handleChange}></textarea>

               <div className="grid grid-cols-3 gap-2">
                 <input type="text" name="city" placeholder="City" required 
                   className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none"
                   value={shippingDetails.city} onChange={handleChange} />
                 
                 <input type="text" name="state" placeholder="State" required 
                   className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none"
                   value={shippingDetails.state} onChange={handleChange} />

                 <input type="text" name="pincode" placeholder="Pincode" required 
                   className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none"
                   value={shippingDetails.pincode} onChange={handleChange} />
               </div>
            </form>

            {/* Order Summary */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 h-fit">
              <h3 className="text-xl font-bold text-white mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-400">
                    <span>{item.quantity} x {item.name}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-800 pt-4 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-yellow-500 pt-2">
                  <span>Total To Pay</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>
              
              <button 
                type="submit" 
                form="checkout-form"
                className="w-full mt-6 bg-yellow-500 text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition shadow-lg hover:shadow-yellow-500/20"
              >
                Pay Now
              </button>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;