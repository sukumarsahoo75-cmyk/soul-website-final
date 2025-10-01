import React, { useState } from 'react';
import Layout from '../components/Layout';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Layout>
      <section className="py-16 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gold-500 text-center mb-8">Contact Us</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-semibold text-gold-400 mb-6 font-sans">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gold-300 mb-2 font-sans">Customer Care</h3>
                    <p className="text-gray-300 font-sans">+91 98765 43210</p>
                    <p className="text-gray-300 font-sans">care@soulfragrance.com</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gold-300 mb-2 font-sans">Store Address</h3>
                    <p className="text-gray-300 font-sans leading-relaxed">
                      SOUL Fragrance<br />
                      123 Luxury Lane<br />
                      Bandra West, Mumbai<br />
                      Maharashtra - 400050
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gold-300 mb-2 font-sans">Business Hours</h3>
                    <p className="text-gray-300 font-sans leading-relaxed">
                      Monday - Saturday: 10:00 AM - 8:00 PM<br />
                      Sunday: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-800 rounded-xl p-8 border border-gold-500/30">
                <h2 className="text-2xl font-semibold text-gold-400 mb-6 font-sans">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gold-300 mb-2 font-sans">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 transition font-sans"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gold-300 mb-2 font-sans">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 transition font-sans"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gold-300 mb-2 font-sans">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 transition font-sans"
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gold-300 mb-2 font-sans">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 transition font-sans resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gold-600 text-black font-semibold py-3 rounded-lg hover:bg-gold-500 transition font-sans"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;