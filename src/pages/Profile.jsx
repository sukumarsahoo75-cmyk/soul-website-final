import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Layout>
      <section className="py-16 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-gray-800 rounded-xl p-8 border border-gold-500/30">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gold-500 mb-2">My Profile</h1>
              <p className="text-lg text-gray-300">
                Welcome, {currentUser?.email}
              </p>
            </div>

            {/* --- ADDED THIS SECTION --- */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gold-400 mb-4 border-b border-gray-700 pb-2">Order History</h2>
              <div className="text-center text-gray-400 py-8">
                <p>You have no past orders.</p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-500 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;