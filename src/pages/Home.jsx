import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { products } from '../data';

const Home = () => {
  // Get 4 Best Sellers for the carousel
  const featuredProducts = products.filter(p => p.isSignature).slice(0, 5);

  return (
    <Layout>
      <div className="bg-black text-white font-sans pb-12">
        
        {/* --- 1. HERO SECTION (Full Screen) --- */}
        <div className="relative h-[85vh] w-full bg-gray-900 overflow-hidden">
          {/* Background Image - You can replace this URL with your own banner later */}
          <img 
            src="/images/hero-banner.jpg" 
            onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop'} 
            alt="Soul Hero" 
            className="w-full h-full object-cover opacity-60"
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-yellow-500 tracking-[0.3em] text-xs md:text-sm uppercase mb-4 animate-fade-in-up">
              Luxury Redefined
            </h2>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight animate-fade-in-up animation-delay-200">
              Essence of <br/> <span className="italic text-yellow-500">Who You Are</span>
            </h1>
            <Link 
              to="/all-products" 
              className="mt-8 border border-white text-white px-8 py-3 hover:bg-white hover:text-black transition uppercase tracking-widest text-sm font-bold animate-fade-in-up animation-delay-400"
            >
              Shop Collection
            </Link>
          </div>
        </div>

        {/* --- 2. CATEGORY GRID (The Fix for "Bland" Look) --- */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            
            {/* CARD 1: FOR HIM */}
            <Link to="/for-him" className="group relative h-64 md:h-96 overflow-hidden rounded-lg border border-gray-800">
              <img 
                src="/images/men-cat.jpg" 
                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1552699609-8cfdd3c79cd7?auto=format&fit=crop&w=600&q=80'}
                alt="For Him" 
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition">
                <h3 className="text-xl md:text-2xl font-serif text-white border-b-2 border-yellow-500 pb-1">For Him</h3>
              </div>
            </Link>

            {/* CARD 2: FOR HER */}
            <Link to="/for-her" className="group relative h-64 md:h-96 overflow-hidden rounded-lg border border-gray-800">
              <img 
                src="/images/women-cat.jpg" 
                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1616091093747-4d830b56b35d?auto=format&fit=crop&w=600&q=80'}
                alt="For Her" 
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition">
                <h3 className="text-xl md:text-2xl font-serif text-white border-b-2 border-yellow-500 pb-1">For Her</h3>
              </div>
            </Link>

            {/* CARD 3: UNISEX */}
            <Link to="/unisex" className="group relative h-64 md:h-96 overflow-hidden rounded-lg border border-gray-800">
              <img 
                src="/images/unisex-cat.jpg" 
                onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80'}
                alt="Unisex" 
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition">
                <h3 className="text-xl md:text-2xl font-serif text-white border-b-2 border-yellow-500 pb-1">Unisex</h3>
              </div>
            </Link>

            {/* CARD 4: GIFT SETS */}
            <Link to="/custom-box" className="group relative h-64 md:h-96 overflow-hidden rounded-lg border border-gray-800">
              <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center border-2 border-yellow-500 p-4 text-center group-hover:bg-yellow-500 transition duration-500">
                <span className="text-yellow-500 group-hover:text-black text-4xl mb-2">🎁</span>
                <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-black font-bold">Make Your<br/>Own Box</h3>
                <p className="text-xs text-gray-400 group-hover:text-black mt-2 uppercase tracking-wider">Customize Now →</p>
              </div>
            </Link>

          </div>
        </div>

        {/* --- 3. BEST SELLERS SCROLL (App-like feel) --- */}
        <div className="container mx-auto px-4 mt-16">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-3xl font-serif text-yellow-500">Best Sellers</h2>
            <Link to="/all-products" className="text-gray-400 text-xs uppercase tracking-widest hover:text-white">View All</Link>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="flex overflow-x-auto space-x-6 pb-8 custom-scrollbar">
            {featuredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="min-w-[200px] md:min-w-[250px] group">
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={`w-full h-64 object-cover transition duration-500 group-hover:opacity-80 ${!product.inStock && 'grayscale'}`} 
                  />
                  {!product.inStock && (
                     <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase">Sold Out</span>
                  )}
                  <div className="p-4">
                    <h3 className="text-white font-bold group-hover:text-yellow-500 transition truncate">{product.name}</h3>
                    <p className="text-gray-500 text-xs uppercase mb-2">{product.category}</p>
                    <p className="text-yellow-500 font-bold">₹{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* --- 4. BRAND PROMISE --- */}
        <div className="container mx-auto px-4 mt-20 text-center border-t border-gray-900 pt-12">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <div>
               <h4 className="text-yellow-500 font-serif text-xl mb-2">Premium Quality</h4>
               <p className="text-gray-500 text-sm">Crafted with the finest ingredients for long-lasting scent.</p>
             </div>
             <div>
               <h4 className="text-yellow-500 font-serif text-xl mb-2">Cruelty Free</h4>
               <p className="text-gray-500 text-sm">We love animals. None of our products are tested on them.</p>
             </div>
             <div>
               <h4 className="text-yellow-500 font-serif text-xl mb-2">Made in India</h4>
               <p className="text-gray-500 text-sm">Proudly crafted in Bhubaneswar with a global vision.</p>
             </div>
           </div>
        </div>

      </div>
    </Layout>
  );
};

export default Home;