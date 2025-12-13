import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- CHANGE #3: Get the page they came from (or default to home) ---
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      navigate(from); // <--- Redirects back to Checkout
    } catch (err) {
      setError('Failed to log in: ' + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      await loginWithGoogle();
      navigate(from); // <--- Redirects back to Checkout
    } catch (err) {
      setError('Google Log in failed: ' + err.message);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg border border-gray-800 shadow-2xl">
          <h2 className="text-3xl font-serif text-yellow-500 mb-6 text-center">Welcome Back</h2>
          
          {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 mb-4 text-sm rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-1">Email</label>
              <input type="email" required className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 outline-none" 
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Password</label>
              <input type="password" required className="w-full bg-black border border-gray-700 text-white p-3 rounded focus:border-yellow-500 outline-none" 
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            
            <div className="text-right">
                <Link to="/forgot-password" className="text-xs text-yellow-500 hover:text-white">Forgot Password?</Link>
            </div>

            <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-3 rounded hover:bg-white transition uppercase tracking-wide">
              Log In
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <hr className="w-full border-gray-700" />
            <span className="px-2 text-gray-500 text-xs">OR</span>
            <hr className="w-full border-gray-700" />
          </div>

          <button onClick={handleGoogleLogin} className="w-full mt-6 bg-white text-black font-bold py-3 rounded hover:bg-gray-200 transition flex items-center justify-center gap-2">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>

          <p className="mt-6 text-center text-gray-400 text-sm">
            New to Soul? <Link to="/signup" className="text-yellow-500 font-bold hover:underline">Create Account</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;