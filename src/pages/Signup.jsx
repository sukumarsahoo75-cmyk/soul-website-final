import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/'); // Redirect to homepage after successful signup
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <section className="py-16 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="bg-gray-800 shadow-2xl rounded-xl p-8 border border-gold-500/30">
            <h2 className="text-3xl font-bold text-gold-500 text-center mb-6">Create Account</h2>
            
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

            <div className="mb-4">
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

            <div className="mb-6">
              <label className="block text-gold-400 text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-gray-200 focus:outline-none focus:border-gold-500"
              />
            </div>

            <button disabled={loading} type="submit" className="w-full bg-gold-600 text-black font-semibold py-3 rounded-lg hover:bg-gold-500 transition disabled:bg-gray-500">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <p className="text-center text-gray-400 mt-6">
              Already have an account? <Link to="/login" className="text-gold-500 hover:text-gold-300">Log In</Link>
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Signup;