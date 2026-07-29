import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, serverTimestamp, query, where, orderBy, limit, getDocs, runTransaction, doc, getDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // --- PROMO CODE STATES ---
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [promoCredits, setPromoCredits] = useState(0);

  // --- TOTAL CALCULATIONS ---
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = total >= 999 ? 0 : 99;
  const finalDiscount = discountApplied ? 250 : 0;
  const totalAmount = total + shippingCost - finalDiscount;

  const [shippingDetails, setShippingDetails] = useState({
    fullName: '', email: currentUser?.email || '', phone: '', address: '', city: '', pincode: '', state: ''
  });

  // Fetch last address & Promo Credits
  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        try {
          // 1. Fetch Address
          const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid), orderBy("createdAt", "desc"), limit(1));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const lastOrder = querySnapshot.docs[0].data();
            if (lastOrder.shippingDetails) {
              setShippingDetails(prev => ({
                ...prev,
                fullName: lastOrder.shippingDetails.fullName || '',
                phone: lastOrder.shippingDetails.phone || '',
                address: lastOrder.shippingDetails.address || '',
                city: lastOrder.shippingDetails.city || '',
                pincode: lastOrder.shippingDetails.pincode || '',
                state: lastOrder.shippingDetails.state || '',
              }));
            }
          }

          // 2. Fetch Promo Credits
          const promoRef = doc(db, 'promo_balances', currentUser.uid);
          const promoSnap = await getDoc(promoRef);
          if (promoSnap.exists()) {
            setPromoCredits(promoSnap.data().credits || 0);
          }
        } catch (error) { console.log("Error fetching user data", error); }
      }
    };
    fetchData();
  }, [currentUser]);

  const handleChange = (e) => {
    setShippingDetails({...shippingDetails, [e.target.name]: e.target.value});
  };

  const handleApplyPromo = () => {
    setPromoError('');
    if (promoCodeInput.toUpperCase() !== 'SOUL250') {
      setPromoError('Invalid promo code.');
      return;
    }
    if (promoCredits <= 0) {
      setPromoError('You do not have any sample credits to redeem. Buy a sample set first!');
      return;
    }
    if (total < 1000) {
      setPromoError('Cart total must be at least ₹1000 to use this code.');
      return;
    }
    setDiscountApplied(true);
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!currentUser) {
        alert("You must be logged in to place an order.");
        navigate('/login', { state: { from: '/checkout' } }); 
        return;
    }

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalAmount * 100 }), // Amount reflects the discount
      });
      const orderData = await response.json();

      if (!orderData.id) {
        alert("Server error creating order.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: orderData.amount, 
        currency: orderData.currency,
        name: "Soul Fragrance",
        description: "Apparel Perfume Order",
        image: "https://soulfragrance.in/logo.png",
        order_id: orderData.id, 
        
        handler: async function (response) {
          try {
            let displayOrderId = "ERROR";

            await runTransaction(db, async (transaction) => {
                // 1. Read/Update Counter
                const counterRef = doc(db, "counters", "orderCounter");
                const counterDoc = await transaction.get(counterRef);
                let newCount = counterDoc.exists() ? counterDoc.data().currentSequence + 1 : 1001;
                
                if (!counterDoc.exists()) transaction.set(counterRef, { currentSequence: newCount });
                else transaction.update(counterRef, { currentSequence: newCount });

                displayOrderId = String(newCount).padStart(4, '0'); 

                // 2. Read/Update Promo Balances (Earning & Burning Logic)
                const promoRef = doc(db, "promo_balances", currentUser.uid);
                const promoDoc = await transaction.get(promoRef);
                let currentCredits = promoDoc.exists() ? promoDoc.data().credits : 0;

                // Earning: Did they buy a Sample Set for ₹250?
                const samplesBought = cart.filter(item => item.price === 250 && item.name.toLowerCase().includes('sample')).reduce((acc, item) => acc + item.quantity, 0);
                
                // Burning: Did they use the code?
                const creditsUsed = discountApplied ? 1 : 0;
                const newCredits = currentCredits + samplesBought - creditsUsed;

                if (promoDoc.exists()) transaction.update(promoRef, { credits: newCredits });
                else transaction.set(promoRef, { credits: newCredits });

                // 3. Save the Order
                const newOrderRef = doc(collection(db, "orders"));
                transaction.set(newOrderRef, {
                    userId: currentUser.uid, 
                    displayId: displayOrderId, 
                    items: cart,
                    amount: totalAmount,
                    discountApplied: discountApplied ? 250 : 0,
                    shippingDetails: shippingDetails,
                    paymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    status: "Paid",
                    createdAt: serverTimestamp()
                });
            });

            const emailParams = {
                customer_name: shippingDetails.fullName,
                order_id: displayOrderId, 
                amount: totalAmount,
                address: `${shippingDetails.address}, ${shippingDetails.city}`,
                to_email: shippingDetails.email 
            };

            await emailjs.send('service_6kjfm2h', 'template_k1bkxfj', emailParams, 'LlIP1132QrVkXTpfk');

            dispatch({ type: "CLEAR_CART" });
            navigate('/order-success', { state: { orderId: displayOrderId } });

          } catch (error) {
            console.error("Error saving order:", error);
            alert(`Payment ID: ${response.razorpay_payment_id}. Order save failed. Please contact support.`);
          }
        },
        prefill: { name: shippingDetails.fullName, email: shippingDetails.email, contact: shippingDetails.phone },
        theme: { color: "#EAB308" }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white py-12 px-4 font-sans">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-serif text-yellow-500 mb-8 text-center">Checkout</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
               <h3 className="text-xl font-bold border-b border-gray-800 pb-2 mb-4">Shipping Details</h3>
               <input type="text" name="fullName" placeholder="Full Name" required className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none" value={shippingDetails.fullName} onChange={handleChange} />
               <div className="grid grid-cols-2 gap-4">
                  <input type="email" name="email" placeholder="Email" required className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none" value={shippingDetails.email} onChange={handleChange} />
                  <input type="tel" name="phone" placeholder="Phone Number" required className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none" value={shippingDetails.phone} onChange={handleChange} />
               </div>
               <textarea name="address" placeholder="Full Address" required rows="3" className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none" value={shippingDetails.address} onChange={handleChange}></textarea>
               <div className="grid grid-cols-3 gap-2">
                 <input type="text" name="city" placeholder="City" required className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none" value={shippingDetails.city} onChange={handleChange} />
                 <input type="text" name="state" placeholder="State" required className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none" value={shippingDetails.state} onChange={handleChange} />
                 <input type="text" name="pincode" placeholder="Pincode" required className="w-full bg-gray-900 border border-gray-800 p-3 rounded text-white focus:border-yellow-500 outline-none" value={shippingDetails.pincode} onChange={handleChange} />
               </div>
            </form>
            
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

              {/* --- PROMO CODE UI --- */}
              <div className="border-t border-gray-800 pt-4 pb-4">
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    placeholder="Promo Code" 
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    disabled={discountApplied}
                    className="flex-1 bg-black border border-gray-700 p-2 text-sm text-white focus:border-yellow-500 outline-none uppercase"
                  />
                  <button 
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={discountApplied}
                    className="bg-gray-800 text-white px-4 text-sm font-bold hover:bg-gray-700 disabled:opacity-50"
                  >
                    {discountApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-xs">{promoError}</p>}
                {discountApplied && <p className="text-green-500 text-xs">SOUL250 Applied! ₹250 deducted.</p>}
              </div>

              <div className="border-t border-gray-800 pt-4 space-y-2">
                <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>₹{total}</span></div>
                <div className="flex justify-between text-gray-400"><span>Shipping</span><span>{shippingCost === 0 ? "FREE" : `₹${shippingCost}`}</span></div>
                
                {discountApplied && (
                  <div className="flex justify-between text-green-500"><span>Discount</span><span>-₹250</span></div>
                )}

                <div className="flex justify-between text-xl font-bold text-yellow-500 pt-2"><span>Total To Pay</span><span>₹{totalAmount}</span></div>
              </div>
              <button type="submit" form="checkout-form" className="w-full mt-6 bg-yellow-500 text-black py-4 font-bold uppercase tracking-widest hover:bg-white transition shadow-lg hover:shadow-yellow-500/20">Pay Now</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;