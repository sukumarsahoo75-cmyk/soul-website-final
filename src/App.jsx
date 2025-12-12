import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Page Imports ---
import Home from './pages/Home';
import ForHim from './pages/ForHim';
import ForHer from './pages/ForHer';
import AllProducts from './pages/AllProducts';
import GiftSets from './pages/GiftSets';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import OurStory from './pages/OurStory';
import ContactUs from './pages/ContactUs';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin'; 

// --- Custom Collections ---
import CustomBox from './pages/CustomBox';
import Unisex from './pages/Unisex';
import SignatureCollection from './pages/SignatureCollection';

// --- Policy Pages ---
import PrivacyPolicy from './pages/PrivacyPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsConditions from './pages/TermsConditions'; // <--- NEW IMPORT

// --- Component Imports ---
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* 1. Home */}
        <Route path="/" element={<Home />} />

        {/* 2. Categories */}
        <Route path="/for-her" element={<ForHer />} />
        <Route path="/for-him" element={<ForHim />} />
        <Route path="/unisex" element={<Unisex />} />
        <Route path="/all-products" element={<AllProducts />} />

        {/* 3. Special Collections */}
        <Route path="/signature" element={<SignatureCollection />} />
        <Route path="/gift-sets" element={<GiftSets />} />
        <Route path="/custom-box" element={<CustomBox />} />

        {/* 4. Product Details */}
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* 5. User & Cart Flow */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected User Routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />

        {/* 6. Admin Dashboard (Secret Route) */}
        <Route path="/admin" element={<Admin />} />

        {/* 7. Info Pages */}
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/contact-us" element={<ContactUs />} />
        
        {/* 8. Policy Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} /> {/* <--- NEW ROUTE */}
        
      </Routes>
    </Router>
  );
}

export default App;