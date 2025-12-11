import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, "orders");
        // Query: Get orders where userId matches the logged-in user
        const q = query(
          ordersRef, 
          where("userId", "==", currentUser.uid)
        );
        
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort manually by date (Newest first)
        userOrders.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
        
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white py-16 px-4 font-sans">
        <div className="container mx-auto max-w-4xl">
          
          {/* HEADER */}
          <div className="flex justify-between items-end mb-12 border-b border-gray-800 pb-6">
            <div>
              <h1 className="text-4xl font-serif text-yellow-500 mb-2">My Profile</h1>
              <p className="text-gray-400">Welcome back, {currentUser?.email}</p>
            </div>
            <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-400 underline">
              Log Out
            </button>
          </div>

          {/* ORDERS LIST */}
          <h2 className="text-2xl font-serif text-white mb-6">Order History</h2>
          
          {loading ? (
            <p className="text-gray-500">Loading your orders...</p>
          ) : orders.length === 0 ? (
            <div className="text-center py-10 bg-gray-900 rounded-lg">
              <p className="text-gray-400 mb-4">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {/* --- THE FIX: Show Order #0001 instead of #RandomID --- */}
                      <p className="text-yellow-500 font-bold text-lg">
                        Order #{order.orderNumber || order.id.slice(0, 8).toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500">
                        Date: {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                      </p>
                    </div>
                    <span className="bg-green-900 text-green-300 text-xs px-2 py-1 rounded">
                      {order.status || "Paid"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm text-gray-300">
                        <span>{item.quantity} x {item.name} ({item.selectedSize || '50ml'})</span>
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