import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc, orderBy, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Admin = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // 🔒 SECURITY CHECK
  const ADMIN_EMAIL = "soulfragranceindia@gmail.com"; 

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0 });

  useEffect(() => {
    // 1. Check if user is admin
    if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
      return; 
    }
    fetchOrders();
  }, [currentUser, navigate]);

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      
      const orderList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(orderList);

      // Calculate Stats
      const revenue = orderList.reduce((sum, order) => sum + (order.amount || 0), 0);
      setStats({ totalRevenue: revenue, totalOrders: orderList.length });
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // --- UPDATED: MARK SHIPPED + SEND EMAIL ---
  const handleMarkShipped = async (order) => {
    if (!window.confirm(`Mark Order #${order.displayId} as Shipped? This will email the customer.`)) return;

    try {
      // 1. Update Firestore Status
      const orderRef = doc(db, "orders", order.id);
      await updateDoc(orderRef, { status: 'Shipped' });

      // 2. Send "Dispatched" Email
      const emailParams = {
        to_name: order.shippingDetails.fullName,
        to_email: order.shippingDetails.email,
        order_id: order.displayId, // Using the friendly ID (e.g. 1003)
        message: "Your order has been dispatched and is on its way!",
        courier_name: "Standard Shipping" // You can customize this if you have tracking info
      };

      // USE YOUR EMAILJS SERVICE ID & TEMPLATE ID HERE
      // Make sure you have a template for "Order Shipped" or use the generic one
      await emailjs.send('service_6kjfm2h', 'template_jzthsni', emailParams, 'LlIP1132QrVkXTpfk');

      alert(`Order #${order.displayId} marked as Shipped & Email Sent!`);
      fetchOrders(); // Refresh list to show green badge

    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status or send email.");
    }
  };

  // 🔒 If not admin, show Access Denied
  if (!currentUser || currentUser.email !== ADMIN_EMAIL) {
    return (
      <Layout>
        <div className="h-screen bg-black text-white flex flex-col items-center justify-center">
          <h1 className="text-4xl font-serif text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-400">You do not have permission to view this page.</p>
          <button onClick={() => navigate('/login')} className="mt-6 bg-yellow-500 text-black px-6 py-2 font-bold rounded">
            Log In as Admin
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-black text-white py-12 px-4 font-sans">
        <div className="container mx-auto max-w-7xl">
          
          {/* HEADER & STATS */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-800 pb-6">
            <div>
              <h1 className="text-4xl font-serif text-yellow-500 mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Welcome back, Boss.</p>
            </div>
            <div className="flex gap-6 mt-6 md:mt-0 text-right">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Total Sales</p>
                <p className="text-3xl font-bold text-white">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Total Orders</p>
                <p className="text-3xl font-bold text-yellow-500">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          {/* ORDERS TABLE */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-400">
                <thead className="bg-gray-800 text-white uppercase tracking-wider text-xs">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-800/50 transition">
                      
                      {/* 1. FIXED: Show "displayId" (1003) instead of random ID */}
                      <td className="p-4 font-mono text-yellow-500">
                        #{order.displayId || order.id.slice(0,5)}
                      </td>
                      
                      <td className="p-4">
                        {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : '-'}
                      </td>
                      
                      <td className="p-4 text-white font-bold">
                        {order.shippingDetails?.fullName}<br/>
                        <span className="text-xs text-gray-500 font-normal">{order.shippingDetails?.phone}</span>
                      </td>
                      
                      <td className="p-4 max-w-xs">
                        {order.items?.map((item, i) => (
                           <span key={i} className="block text-xs">
                             {item.quantity}x {item.name}
                           </span>
                        ))}
                      </td>
                      
                      <td className="p-4 text-white font-bold">₹{order.amount}</td>
                      
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                          ${order.status === 'Paid' ? 'bg-blue-900 text-blue-300' : 
                            order.status === 'Shipped' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-300'}`}>
                          {order.status}
                        </span>
                      </td>
                      
                      <td className="p-4">
                        {order.status !== 'Shipped' && (
                          <button 
                            onClick={() => handleMarkShipped(order)}
                            className="bg-yellow-500 text-black px-3 py-1 rounded text-xs font-bold hover:bg-white"
                          >
                            Mark Shipped
                          </button>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Admin;