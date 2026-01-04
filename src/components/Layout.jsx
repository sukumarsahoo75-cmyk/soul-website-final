import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext'; 
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const { cart } = useCart(); 

  const isActive = (path) => 
    location.pathname === path 
      ? "text-yellow-500 font-bold border-b-2 border-yellow-500 pb-1" 
      : "text-gray-300 hover:text-yellow-500 transition-colors pb-1";

  return (
    <div className="flex flex-col min-h-screen font-sans bg-black text-white relative">
      
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
                 
                 {/* CART COUNTER BADGE */}
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
            
            <div className="flex gap-4 mt-4 md:mt-0">
                {/* Custom Box Button (Left) */}
                <Link 
                to="/custom-box" 
                className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition-all font-bold text-[10px] md:text-xs"
                >
                Make Your Own Gift Set
                </Link>

                {/* Buy Samples Button (Right - NOW VISIBLE ON MOBILE) */}
                <Link 
                to="/samples" 
                className="inline-block border border-gray-600 text-gray-300 px-4 py-2 rounded text-[10px] md:text-xs font-bold uppercase tracking-widest hover:border-white hover:text-white transition"
                >
                Buy Samples
                </Link>
            </div>

          </div>

        </div>
      </nav>

      <main className="flex-grow bg-black">
        {children}
      </main>

      <Footer /> 

      {/* --- WHATSAPP FLOATING BUTTON --- */}
      <a 
        href="https://wa.me/919777293543?text=Hi%20Soul%20Fragrance,%20I%20need%20help%20choosing%20a%20perfume" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:scale-110 transition-transform duration-300 border-2 border-white flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
        <span className="absolute right-14 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us!
        </span>
      </a>

    </div>
  );
};

export default Layout;