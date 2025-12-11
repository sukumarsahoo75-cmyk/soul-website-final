import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/'); 
    } catch (err) {
      setError("Failed to log in. Please check your email and password.");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl">
          <h2 className="text-3xl font-serif text-yellow-500 text-center mb-6">Welcome Back</h2>
          
          {error && <div className="bg-red-500/20 text-red-500 p-3 rounded mb-4 text-sm text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">Email</label>
              <input 
                type="email" 
                required 
                className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">Password</label>
              <input 
                type="password" 
                required 
                className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="text-right mt-1">
                <Link to="/forgot-password" class="text-xs text-gray-500 hover:text-yellow-500">Forgot Password?</Link>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-white transition uppercase tracking-widest"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-sm">
            Need an account? <Link to="/signup" className="text-yellow-500 underline">Sign Up</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;