import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const fetchOrders = async () => {
        try {
          const q = query(
            collection(db, "orders"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const fetchedOrders = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setOrders(fetchedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };
      fetchOrders();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  if (!currentUser) return <Layout><div className="text-white text-center p-20">Please Login</div></Layout>;

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white py-12 px-4 font-sans">
        <div className="container mx-auto max-w-4xl">
          
          <div className="flex justify-between items-end mb-12 border-b border-gray-800 pb-8">
            <div>
              <h1 className="text-4xl font-serif text-yellow-500 mb-2">My Profile</h1>
              <p className="text-gray-400">Welcome back, {currentUser.email}</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="text-red-500 hover:text-red-400 font-bold uppercase tracking-widest text-sm underline"
            >
              Log Out
            </button>
          </div>

          <h2 className="text-2xl font-serif text-white mb-6">Order History</h2>

          {orders.length === 0 ? (
            <p className="text-gray-500">You haven't placed any orders yet.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {/* --- FIX IS HERE: Show displayId if it exists, otherwise show old ID --- */}
                      <h3 className="text-xl font-bold text-yellow-500">
                        Order #{order.displayId || order.id.slice(0, 8).toUpperCase()}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        Date: {order.createdAt?.toDate().toLocaleDateString()}
                      </p>
                    </div>
                    <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded uppercase tracking-wider font-bold">
                      {order.status || "Paid"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm text-gray-300">
                        <span>{item.quantity} x {item.name} ({item.selectedSize || "50ml"})</span>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-800 pt-4 flex justify-between items-center">
                    <p className="text-xs text-gray-500">Tracking ID: {order.paymentId}</p>
                    <p className="text-xl font-bold text-white">Total: ₹{order.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;