import React from 'react';
import Layout from '../components/Layout';

const OurStory = () => {
  return (
    <Layout>
      <section className="py-16 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gold-500 text-center mb-8">Our Story</h1>
            
            <div className="bg-gray-800 rounded-xl p-8 border border-gold-500/30">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Founded in 2020, SOUL emerged from a simple belief: every individual deserves a signature scent that resonates with their essence. 
                </p>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Our journey began in the heart of Mumbai, where master perfumers and dreamers came together to create fragrances that tell stories. Each bottle contains not just perfume, but memories, emotions, and the very soul of its wearer.
                </p>

                <h2 className="text-2xl font-semibold text-gold-400 mt-8 mb-4">Our Philosophy</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  We believe in sustainable luxury, ethical sourcing, and creating products that stand the test of time. Every ingredient is carefully selected, every bottle thoughtfully designed, and every customer treated like family.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OurStory;