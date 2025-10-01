import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- Import useAuth
import { useCart } from '../context/CartContext';

// SVG Icons (UserIcon, ShoppingCartIcon, etc.) remain the same...
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const ShoppingCartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
);
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
);
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);


const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const { currentUser } = useAuth(); // <-- Get the current user status

  const totalCartItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Our Story", path: "/our-story" },
    { name: "For Him", path: "/for-him" },
    { name: "For Her", path: "/for-her" },
    { name: "Gift Sets", path: "/gift-sets" },
    { name: "All Products", path: "/all-products" },
    { name: "Contact Us", path: "/contact-us" }
  ];

  return (
    <div className="bg-black text-gray-100 min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-black border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gold-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Logo */}
          <div className="flex-1 flex justify-center md:flex-none md:justify-start">
            <Link to="/">
              <img
                src="/logo.png"
                alt="SOUL Logo"
                className="w-[200px] md:w-[280px] lg:w-[320px] h-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 text-lg font-semibold">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative group transition-all duration-300 ${
                  location.pathname === item.path ? "text-gold-500" : "text-gold-500/80 hover:text-gold-500"
                }`}
              >
                {item.name}
                <span className={`absolute left-0 -bottom-1 h-0.5 bg-gold-500 transition-all duration-300 ${
                  location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* --- THIS IS THE UPDATED PART --- */}
            <Link to={currentUser ? "/profile" : "/login"} className="text-gold-500 hover:text-gold-300 transition">
              <UserIcon />
            </Link>
            <Link to="/cart" className="text-gold-500 hover:text-gold-300 transition relative">
              <ShoppingCartIcon />
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-gray-900 py-4 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-2 text-lg font-semibold ${
                  location.pathname === item.path ? "text-gold-500" : "text-gold-500/80"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center border-t border-gray-800">
        <div className="container mx-auto px-4">
          <p className="font-sans">© 2025 SOUL Fragrance. All Rights Reserved.</p>
          <div className="mt-4 flex flex-wrap justify-center space-x-6 font-sans">
            <a href="#" className="text-gold-500 hover:text-gold-300 transition">Privacy Policy</a>
            <a href="#" className="text-gold-500 hover:text-gold-300 transition">Terms of Service</a>
            <Link to="/contact-us" className="text-gold-500 hover:text-gold-300 transition">Contact Us</Link>
            <a href="#" className="text-gold-500 hover:text-gold-300 transition">Shipping & Returns</a>
          </div>
        </div>
      </footer>

      {/* Custom styles for gold color */}
      <style jsx>{`
        .text-gold-500 { color: #D4AF37; }
        .text-gold-400 { color: #E5C158; }
        .text-gold-300 { color: #F1D486; }
        .bg-gold-600 { background-color: #B8860B; }
        .bg-gold-500 { background-color: #D4AF37; }
        .border-gold-500 { border-color: #D4AF37; }
        .hover\:bg-gold-500:hover { background-color: #D4AF37; }
        .hover\:text-gold-300:hover { color: #F1D486; }
      `}</style>
    </div>
  );
};

export default Layout;