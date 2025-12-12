import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from 'firebase/firestore'; // <--- UPDATED IMPORTS
import emailjs from '@emailjs/browser';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: currentUser?.email || '', 
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  });

  // Totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal >= 2000 ? 0 : 99;
  const totalAmount = subtotal + shippingCost;

  useEffect(() => {
    if (cart.length === 0) navigate('/cart');
  }, [cart, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid 10-digit Phone Number.");
      return false;
    }
    const pinRegex = /^[0-9]{6}$/;
    if (!pinRegex.test(formData.pincode)) {
      alert("Please enter a valid 6-digit Pincode.");
      return false;
    }
    if (formData.address.length < 10) {
      alert("Please enter your full address.");
      return false;
    }
    if (!formData.email || !formData.email.includes('@')) {
      alert("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  // --- EMAIL LOGIC ---
  const sendOrderEmail = (orderDetails, niceOrderId) => {
    const SERVICE_ID = "service_6kjfm2h"; 
    const TEMPLATE_ID = "template_k1bkxfj";
    const PUBLIC_KEY = "LlIP1132QrVkXTpfk";

    // Create a clean list of items
    const itemsList = cart.map(item => 
      `${item.quantity} x ${item.name} (${item.selectedSize || '50ml'}) - ₹${item.price * item.quantity}`
    ).join('\n');

    const templateParams = {
      to_name: formData.fullName,
      to_email: formData.email, 
      amount: totalAmount,
      order_id: niceOrderId, // <--- Now sending the nice ID (0001)
      message: itemsList 
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('EMAIL SENT SUCCESS!', response.status, response.text);
      }, (err) => {
        console.error('EMAIL FAILED...', err);
      });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; 

    setLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    const options = {
      key: "rzp_live_RgTrkxzolbi2tM", // <--- PASTE YOUR KEY HERE
      amount: totalAmount * 100, 
      currency: "INR",
      name: "Soul Fragrance",
      description: "Luxury Perfume Order",
      image: "/logo.png",
      handler: async function (response) {
        await saveOrder(response.razorpay_payment_id);
      },
      prefill: {
        name: formData.fullName,
        email: formData.email, 
        contact: formData.phone
      },
      theme: { color: "#EAB308" }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    setLoading(false);
  };

  // --- GENERATE ORDER ID (0001, 0002...) ---
  const generateOrderId = async () => {
    try {
      // Get the last order sorted by creation time
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      
      let newOrderNum = "0001"; // Default for first order

      if (!querySnapshot.empty) {
        const lastOrder = querySnapshot.docs[0].data();
        if (lastOrder.orderNumber) {
           // Parse the last number (e.g., "0005" -> 5) and add 1
           const lastNum = parseInt(lastOrder.orderNumber);
           newOrderNum = String(lastNum + 1).padStart(4, '0'); // "0006"
        }
      }
      return newOrderNum;
    } catch (error) {
      console.error("Error generating ID", error);
      // Fallback if DB fails: Random 4 digit number
      return String(Math.floor(1000 + Math.random() * 9000));
    }
  };

  const saveOrder = async (paymentId) => {
    try {
      setLoading(true);

      // 1. Generate the nice ID (e.g., 0001)
      const customOrderId = await generateOrderId();

      const orderData = {
        userId: currentUser?.uid || "guest",
        userEmail: formData.email, 
        items: cart,
        shippingDetails: formData,
        paymentId: paymentId,
        orderNumber: customOrderId, // <--- Saving the nice ID
        amount: totalAmount,
        status: "Paid",
        createdAt: serverTimestamp()
      };

      // 2. Save to Database
      await addDoc(collection(db, "orders"), orderData);
      
      // 3. Send Email with Nice ID
      sendOrderEmail(orderData, customOrderId);

      dispatch({ type: 'CLEAR_CART' });
      alert(`Order #${customOrderId} Placed Successfully! Check your email.`);
      navigate('/');
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Payment successful, but failed to save order.");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white py-16 px-4 font-sans">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-serif text-yellow-500 mb-8 text-center">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* LEFT: ADDRESS FORM */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 h-fit">
              <h2 className="text-2xl font-serif text-white mb-6">Shipping Details</h2>
              <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
                
                <div>
                  <label className="block text-gray-400 text-xs uppercase mb-1">Full Name</label>
                  <input type="text" name="fullName" required onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 focus:outline-none"/>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase mb-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleChange} 
                    className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 focus:outline-none"
                    placeholder="For order confirmation"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase mb-1">Phone Number</label>
                  <input type="tel" name="phone" required onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 focus:outline-none"/>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase mb-1">Address</label>
                  <textarea name="address" rows="3" required onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 focus:outline-none"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-xs uppercase mb-1">City</label>
                    <input type="text" name="city" required onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 focus:outline-none"/>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-xs uppercase mb-1">Pincode</label>
                    <input type="text" name="pincode" required onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 focus:outline-none"/>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs uppercase mb-1">State</label>
                  <input type="text" name="state" required onChange={handleChange} className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 focus:outline-none"/>
                </div>

              </form>
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 h-fit">
              <h2 className="text-2xl font-serif text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-800 pb-2">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt="product" className="w-10 h-10 rounded object-cover"/>
                      <div>
                        <p className="text-white font-bold">{item.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-yellow-500">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  {shippingCost === 0 ? <span className="text-green-400">Free</span> : <span>₹{shippingCost}</span>}
                </div>
                <div className="flex justify-between text-xl font-bold text-white mt-4">
                  <span>Total</span>
                  <span className="text-yellow-500">₹{totalAmount}</span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form" 
                disabled={loading}
                className="w-full bg-yellow-500 text-black font-bold py-4 rounded mt-8 hover:bg-white transition uppercase tracking-widest shadow-lg"
              >
                {loading ? "Processing..." : `Pay ₹${totalAmount}`}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                Secure payments by Razorpay
              </p>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;