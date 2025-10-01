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
      navigate('/'); // Redirect to homepage after successful login
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <section className="py-16 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="bg-gray-800 shadow-2xl rounded-xl p-8 border border-gold-500/30">
            <h2 className="text-3xl font-bold text-gold-500 text-center mb-6">Log In</h2>
            
            {error && <p className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-center">{error}</p>}

            <div className="mb-4">
              <label className="block text-gold-400 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gold-400 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200 focus:outline-none focus:border-gold-500"
              />
            </div>

            <button disabled={loading} type="submit" className="w-full bg-gold-600 text-black font-semibold py-3 rounded-lg hover:bg-gold-500 transition disabled:bg-gray-500">
              {loading ? 'Logging In...' : 'Log In'}
            </button>

            <p className="text-center text-gray-400 mt-6">
              Need an account? <Link to="/signup" className="text-gold-500 hover:text-gold-300">Sign Up</Link>
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Login;