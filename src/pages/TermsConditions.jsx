import React from 'react';
import Layout from '../components/Layout';

const TermsConditions = () => {
  return (
    <Layout>
      <div className="bg-black min-h-screen text-white py-16 px-4 font-sans">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-serif text-yellow-500 mb-8 text-center">Terms & Conditions</h1>
          
          <div className="space-y-6 text-gray-300 leading-relaxed text-sm md:text-base">
            <p>Welcome to Soul Fragrance. By accessing or using our website, you agree to be bound by these Terms and Conditions.</p>
            
            <h2 className="text-xl text-yellow-500 font-bold mt-6">1. General</h2>
            <p>This website is operated by Soul Fragrance. Throughout the site, the terms “we”, “us” and “our” refer to Soul Fragrance. We reserve the right to refuse service to anyone for any reason at any time.</p>

            <h2 className="text-xl text-yellow-500 font-bold mt-6">2. Products & Pricing</h2>
            <p>Prices for our products are subject to change without notice. We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor's display of any color will be accurate.</p>

            <h2 className="text-xl text-yellow-500 font-bold mt-6">3. Accuracy of Billing</h2>
            <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.</p>

            <h2 className="text-xl text-yellow-500 font-bold mt-6">4. Intellectual Property</h2>
            <p>All content included on this site, such as text, graphics, logos, images, and software, is the property of Soul Fragrance and protected by Indian copyright laws.</p>

            <h2 className="text-xl text-yellow-500 font-bold mt-6">5. Governing Law</h2>
            <p>These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising in relation to these terms shall be subject to the exclusive jurisdiction of the courts in Bhubaneswar, Odisha.</p>

            <h2 className="text-xl text-yellow-500 font-bold mt-6">6. Contact Information</h2>
            <p>Questions about the Terms of Service should be sent to us at <span className="text-white font-bold">soulfragranceindia@gmail.com</span>.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermsConditions;