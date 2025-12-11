import React from 'react';
import Layout from '../components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="bg-black min-h-screen text-white py-16 px-4 font-sans">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-serif text-yellow-500 mb-8 text-center">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>At Soul Fragrance, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
            
            <h2 className="text-xl text-yellow-500 font-bold mt-8">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, phone number, shipping address, and payment information.</p>

            <h2 className="text-xl text-yellow-500 font-bold mt-8">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process and fulfill your orders.</li>
              <li>Communicate with you about your order status.</li>
              <li>Send you updates, newsletters, and promotional offers (if you opted in).</li>
              <li>Improve our website and customer service.</li>
            </ul>

            <h2 className="text-xl text-yellow-500 font-bold mt-8">3. Cookies</h2>
            <p>We use cookies to enhance your browsing experience. Cookies help us remember your preferences and cart items. You can choose to disable cookies through your browser settings, but this may affect your ability to use certain features of our site.</p>

            <h2 className="text-xl text-yellow-500 font-bold mt-8">4. Third-Party Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties, except for trusted third parties who assist us in operating our website, conducting our business, or servicing you (e.g., shipping partners, payment gateways), so long as those parties agree to keep this information confidential.</p>

            <h2 className="text-xl text-yellow-500 font-bold mt-8">5. Contact Us</h2>
            <p>If you have any questions regarding this privacy policy, you may contact us at:</p>
            <p className="mt-2">
              <span className="text-white font-bold">Soul Fragrance</span><br/>
              Email: soulfragranceindia@gmail.com<br/>
              Phone: +91 97772 93543
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;