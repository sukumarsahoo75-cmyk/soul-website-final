import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <--- Added this to check login status

const Layout = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useAuth(); // <--- Get the logged-in user

  // Helper: Active link style (Yellow) vs Inactive (White)
  const isActive = (path) => 
    location.pathname === path 
      ? "text-yellow-500 font-bold border-b-2 border-yellow-500 pb-1" 
      : "text-gray-300 hover:text-yellow-500 transition-colors pb-1";

  return (
    <div className="flex flex-col min-h-screen font-sans bg-black text-white">
      
      {/* --- CENTERED NAVBAR --- */}
      <nav className="bg-black py-6 sticky top-0 z-50 border-b border-gray-900 shadow-xl">
        <div className="container mx-auto px-4">
          
          {/* ROW 1: LOGO (Center) & ICONS (Right) */}
          <div className="relative flex justify-center items-center mb-6">
            
            {/* 1. LOGO */}
            <Link to="/">
               <img 
                 src="/logo.png" 
                 alt="SOUL Fragrance" 
                 className="h-[100px] md:h-[140px] w-auto object-contain hover:opacity-90 transition" 
               />
            </Link>

            {/* 2. ICONS (Positioned Absolute Right) */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-6">
               
               {/* PROFILE ICON LOGIC: If logged in -> Profile, else -> Login */}
               <Link to={currentUser ? "/profile" : "/login"} className="text-yellow-500 hover:text-white transition">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
               </Link>

               {/* CART ICON */}
               <Link to="/cart" className="text-yellow-500 hover:text-white transition relative">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                 </svg>
               </Link>
            </div>
          </div>

          {/* ROW 2: MENU (Centered Below Logo) */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-xs md:text-sm uppercase tracking-widest">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/for-him" className={isActive('/for-him')}>For Him</Link>
            <Link to="/for-her" className={isActive('/for-her')}>For Her</Link>
            <Link to="/unisex" className={isActive('/unisex')}>Unisex</Link>
            <Link to="/all-products" className={isActive('/all-products')}>All Products</Link>
            
            {/* Special Button */}
            <Link 
              to="/custom-box" 
              className="ml-2 border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition-all font-bold"
            >
              Make Your Own Gift Set
            </Link>
          </div>

        </div>
      </nav>

      {/* --- CONTENT --- */}
      <main className="flex-grow bg-black">
        {children}
      </main>

      {/* --- FOOTER (CLEAN VERSION) --- */}
      <footer className="bg-black text-gray-500 py-12 text-center border-t border-gray-900">
        
        {/* MAIN LINKS */}
        <div className="flex justify-center space-x-6 text-xs uppercase tracking-widest mb-6 text-white font-bold">
          <Link to="/contact-us" className="hover:text-yellow-500 transition">Contact</Link>
          <Link to="/our-story" className="hover:text-yellow-500 transition">Our Story</Link>
          <Link to="/profile" className="hover:text-yellow-500 transition">My Account</Link>
        </div>

        {/* POLICY LINKS */}
        <div className="flex justify-center space-x-6 text-[10px] uppercase tracking-wider mb-8 text-gray-400">
          <Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
          <Link to="/shipping-policy" className="hover:text-white transition">Shipping Policy</Link>
          <Link to="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
        </div>

        {/* COPYRIGHT */}
        <p className="text-[10px] tracking-widest text-gray-500">
          © 2025 Soul Fragrance. All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default Layout;