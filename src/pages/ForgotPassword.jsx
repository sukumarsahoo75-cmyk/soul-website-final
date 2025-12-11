import React, { useState } from 'react';
import Layout from '../components/Layout';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      setMessage('');
      setError('');
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent! Check your email inbox.');
    } catch (err) {
      setError('Failed to reset password. Please check if the email is correct.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl">
          <h2 className="text-2xl font-serif text-white text-center mb-6">Reset Password</h2>
          
          {error && <div className="bg-red-500/20 text-red-500 p-3 rounded mb-4 text-sm text-center">{error}</div>}
          {message && <div className="bg-green-500/20 text-green-500 p-3 rounded mb-4 text-sm text-center">{message}</div>}

          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">Enter your email</label>
              <input 
                type="email" 
                required 
                className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-white transition uppercase tracking-widest">
              Reset Password
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-sm">
            <Link to="/login" className="text-yellow-500 underline">Back to Login</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;