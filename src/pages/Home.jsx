import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection'; 

const Home = () => {
  return (
    <Layout>
      <HeroSection />

      <section className="py-16 bg-black text-white text-center">
        <h2 className="text-3xl font-serif text-yellow-500 mb-8">Start Your Journey</h2>
        <div className="flex justify-center gap-6">
            {/* Major Action: Yellow */}
            <Link to="/all-products" className="bg-yellow-500 text-black px-8 py-3 rounded font-bold hover:bg-white transition uppercase tracking-widest">
              Shop All
            </Link>
            
            {/* Secondary Action: Yellow Border */}
            <Link to="/custom-box" className="border border-yellow-500 text-yellow-500 px-8 py-3 rounded font-bold hover:bg-yellow-500 hover:text-black transition uppercase tracking-widest">
              Build a Box
            </Link>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-20 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center text-yellow-500 mb-12">Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
            <Link to="/for-him" className="group relative h-80 overflow-hidden rounded-lg border border-gray-800 hover:border-yellow-500 transition">
              <div className="absolute inset-0 bg-gray-900 group-hover:scale-105 transition duration-700"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-serif text-white group-hover:text-yellow-500 tracking-widest transition">FOR HIM</h3>
              </div>
            </Link>
            <Link to="/for-her" className="group relative h-80 overflow-hidden rounded-lg border border-gray-800 hover:border-yellow-500 transition">
               <div className="absolute inset-0 bg-gray-900 group-hover:scale-105 transition duration-700"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-serif text-white group-hover:text-yellow-500 tracking-widest transition">FOR HER</h3>
              </div>
            </Link>
            <Link to="/unisex" className="group relative h-80 overflow-hidden rounded-lg border border-gray-800 hover:border-yellow-500 transition">
               <div className="absolute inset-0 bg-gray-900 group-hover:scale-105 transition duration-700"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-3xl font-serif text-white group-hover:text-yellow-500 tracking-widest transition">UNISEX</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;