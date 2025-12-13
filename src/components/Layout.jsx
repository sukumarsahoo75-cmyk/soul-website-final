import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; // <--- NEW IMPORT
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const { cart } = useCart(); // <--- GET CART DATA

  const isActive = (path) => 
    location.pathname === path 
      ? "text-yellow-500 font-bold border-b-2 border-yellow-500 pb-1" 
      : "text-gray-300 hover:text-yellow-500 transition-colors pb-1";

  return (
    <div className="flex flex-col min-h-screen font-sans bg-black text-white">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-black py-6 sticky top-0 z-50 border-b border-gray-900 shadow-xl">
        <div className="container mx-auto px-4">
          
          <div className="relative flex justify-center items-center mb-6">
            
            {/* LOGO */}
            <Link to="/">
               <img src="/logo.png" alt="SOUL Fragrance" className="h-[100px] md:h-[140px] w-auto object-contain hover:opacity-90 transition" />
            </Link>

            {/* ICONS (Right) */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-6">
               
               {/* Profile */}
               <Link to={currentUser ? "/profile" : "/login"} className="text-yellow-500 hover:text-white transition">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                 </svg>
               </Link>

               {/* Cart Icon with Badge */}
               <Link to="/cart" className="text-yellow-500 hover:text-white transition relative">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                 </svg>
                 
                 {/* --- NEW: CART COUNTER BADGE --- */}
                 {cart.length > 0 && (
                   <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border border-black">
                     {cart.length}
                   </span>
                 )}
               </Link>

            </div>
          </div>

          {/* MENU LINKS */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-xs md:text-sm uppercase tracking-widest">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/for-him" className={isActive('/for-him')}>For Him</Link>
            <Link to="/for-her" className={isActive('/for-her')}>For Her</Link>
            <Link to="/unisex" className={isActive('/unisex')}>Unisex</Link>
            <Link to="/all-products" className={isActive('/all-products')}>All Products</Link>
            
            {/* Custom Box Button */}
            <Link to="/custom-box" className="ml-2 border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition-all font-bold">
              Make Your Own Gift Set
            </Link>
          </div>

        </div>
      </nav>

      <main className="flex-grow bg-black">
        {children}
      </main>

      <Footer /> 
    </div>
  );
};

export default Layout;