import React, { useState } from 'react';
import Layout from '../components/Layout';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later you can connect this to EmailJS or Firebase
    alert("Thank you! Your message has been sent. We will contact you shortly.");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <Layout>
      <div className="bg-black min-h-screen text-white py-16 px-4">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-yellow-500 mb-4">Get in Touch</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions about our fragrances? Need help with your custom box? 
            We are here to assist you.
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-8"></div>
        </div>

        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* LEFT: CONTACT INFORMATION */}
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-2xl h-full">
            <h2 className="text-3xl font-serif text-white mb-8">Contact Information</h2>
            
            {/* 1. FACTORY ADDRESS */}
            <div className="mb-8 flex items-start space-x-4">
              <div className="bg-yellow-500 p-3 rounded-full text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-yellow-500 font-bold uppercase tracking-wider mb-1">Factory Address</h3>
                <p className="text-gray-300 leading-relaxed">
                  Plot no - 184/504, Paikanagar Lane 2,<br/>
                  Baramunda, Delta Square,<br/>
                  Bhubaneswar, 751003
                </p>
              </div>
            </div>

            {/* 2. WHATSAPP */}
            <div className="mb-8 flex items-start space-x-4">
              <div className="bg-yellow-500 p-3 rounded-full text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-yellow-500 font-bold uppercase tracking-wider mb-1">Customer Care</h3>
                <a 
                  href="https://wa.me/919777293543" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-lg hover:text-green-400 transition flex items-center gap-2"
                >
                  +91 97772 93543
                  <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">WhatsApp</span>
                </a>
                <p className="text-gray-500 text-sm mt-1">Mon - Sat, 10am - 7pm</p>
              </div>
            </div>

            {/* 3. EMAIL */}
            <div className="mb-8 flex items-start space-x-4">
              <div className="bg-yellow-500 p-3 rounded-full text-black">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-yellow-500 font-bold uppercase tracking-wider mb-1">Email Us</h3>
                <a href="mailto:soulfragranceindia@gmail.com" className="text-gray-300 hover:text-white transition">
                  soulfragranceindia@gmail.com
                </a>
              </div>
            </div>

            {/* 4. INSTAGRAM BUTTON */}
            <div className="mt-8 pt-8 border-t border-gray-800">
               <a 
                 href="https://instagram.com/soulfragrance.in/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="w-full flex justify-center items-center gap-2 bg-gray-800 border border-gray-700 text-white px-6 py-4 rounded-lg hover:border-pink-500 hover:text-pink-500 transition font-bold uppercase tracking-widest"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.163 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                 </svg>
                 Visit Instagram Page
               </a>
            </div>

          </div>

          {/* RIGHT: QUERY FORM (REPLACED MAP) */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 h-full">
            <h2 className="text-3xl font-serif text-white mb-6">Send us a Query</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-600 text-white p-4 rounded focus:border-yellow-500 focus:outline-none transition"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-600 text-white p-4 rounded focus:border-yellow-500 focus:outline-none transition"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2 uppercase tracking-wide">Message</label>
                <textarea 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-gray-900 border border-gray-600 text-white p-4 rounded focus:border-yellow-500 focus:outline-none transition"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-yellow-500 text-black font-bold uppercase tracking-widest py-4 rounded hover:bg-white transition-all shadow-lg"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;