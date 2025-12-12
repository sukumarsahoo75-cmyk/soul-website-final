import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-800 pt-16 pb-8 font-sans">
      <div className="container mx-auto px-4">
        
        {/* Changed grid from 4 columns to 3 columns since we removed the Brand section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-center md:text-left">
          
          {/* Shop */}
          <div>
            <h4 className="text-yellow-500 font-bold uppercase tracking-widest mb-6 text-sm">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/all-products" className="hover:text-white transition">All Perfumes</Link></li>
              <li><Link to="/for-him" className="hover:text-white transition">For Him</Link></li>
              <li><Link to="/for-her" className="hover:text-white transition">For Her</Link></li>
              <li><Link to="/custom-box" className="hover:text-white transition">Make Your Own Box</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-yellow-500 font-bold uppercase tracking-widest mb-6 text-sm">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact-us" className="hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/profile" className="hover:text-white transition">My Account</Link></li>
              <li><Link to="/admin" className="hover:text-white transition">Admin Login</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-yellow-500 font-bold uppercase tracking-widest mb-6 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/shipping-policy" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition">Refund Policy</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-white transition">Terms & Conditions</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Soul Fragrance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;