import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { products } from '../data';

const Home = () => {
  // --- 1. HERO SLIDER LOGIC ---
  const heroImages = [
    "/images/hero1.jpg", // Make sure you have this image
    "/images/hero2.jpg"  // Make sure you have this image
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  // Get Best Sellers
  const featuredProducts = products.filter(p => p.isSignature).slice(0, 5);

  return (
    <Layout>
      <div className="bg-black text-white font-sans">
        
        {/* --- 1. HERO SECTION (SLIDESHOW) --- */}
        <div className="relative h-[70vh] w-full bg-gray-900 overflow-hidden flex items-center justify-center">
          
          {/* Background Images with Fade Effect */}
          {heroImages.map((img, index) => (
            <img 
              key={index}
              src={img}
              // Fallback if image is missing
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop'} 
              alt={`Hero ${index}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? "opacity-60" : "opacity-0"
              }`}
            />
          ))}
          
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          
          {/* Hero Text */}
          <div className="relative z-20 text-center px-4 animate-fade-in-up">
            <h2 className="text-yellow-500 tracking-[0.3em] text-xs md:text-sm uppercase mb-4">
              Luxury Redefined
            </h2>
            <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
              Essence of <br/> <span className="italic text-yellow-500">Who You Are</span>
            </h1>
            <Link 
              to="/all-products" 
              className="border border-white text-white px-10 py-3 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition uppercase tracking-widest text-sm font-bold"
            >
              Shop All
            </Link>
          </div>
        </div>

        {/* --- 2. THE 3 CATEGORIES (3-Column Layout) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 h-auto md:h-[600px]">
          
          {/* 1. FOR HIM */}
          <Link to="/for-him" className="relative group h-64 md:h-full border-r border-b border-gray-800 overflow-hidden">
            <img 
              src="/images/male.jpg" 
              alt="For Him" 
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-3xl md:text-4xl font-serif text-white group-hover:text-yellow-500 transition tracking-wider">
                FOR HIM
              </h3>
            </div>
          </Link>

          {/* 2. FOR HER */}
          <Link to="/for-her" className="relative group h-64 md:h-full border-r border-b border-gray-800 overflow-hidden">
            <img 
              src="/images/female.jpg" 
              alt="For Her" 
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-3xl md:text-4xl font-serif text-white group-hover:text-yellow-500 transition tracking-wider">
                FOR HER
              </h3>
            </div>
          </Link>

          {/* 3. UNISEX */}
          <Link to="/unisex" className="relative group h-64 md:h-full border-b border-gray-800 overflow-hidden">
            <img 
              src="/images/unisex.jpg" 
              alt="Unisex" 
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-3xl md:text-4xl font-serif text-white group-hover:text-yellow-500 transition tracking-wider">
                UNISEX
              </h3>
            </div>
          </Link>

        </div>

        {/* --- 3. CUSTOM GIFT SET BANNER --- */}
        <div className="py-20 px-4 text-center bg-gray-900 border-b border-gray-800">
           <h2 className="text-3xl font-serif text-yellow-500 mb-4">The Perfect Gift</h2>
           <p className="text-gray-400 mb-8 max-w-xl mx-auto">Create a custom box with 4 of your favorite scents (20ml each).</p>
           <Link 
              to="/custom-box" 
              className="inline-block bg-yellow-500 text-black px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition"
            >
              Build Your Box
           </Link>
        </div>

        {/* --- 4. BEST SELLERS SCROLL --- */}
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-white">Trending Now</h2>
            <Link to="/all-products" className="text-yellow-500 text-xs uppercase tracking-widest border-b border-yellow-500 pb-1">View All</Link>
          </div>

          <div className="flex overflow-x-auto space-x-6 pb-8 custom-scrollbar">
            {featuredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="min-w-[220px] group">
                <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                  <div className="relative h-64">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className={`w-full h-full object-cover transition duration-500 ${!product.inStock ? 'grayscale opacity-50' : 'group-hover:opacity-80'}`} 
                    />
                    {!product.inStock && (
                       <div className="absolute inset-0 flex items-center justify-center">
                         <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Sold Out</span>
                       </div>
                    )}
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-white font-serif text-lg mb-1">{product.name}</h3>
                    <p className="text-yellow-500 font-bold">₹{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Home;