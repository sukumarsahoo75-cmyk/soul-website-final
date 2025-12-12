import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { products } from '../data';

const Home = () => {
  // --- HERO SLIDER LOGIC ---
  const heroImages = [
    "/images/hero1.jpg",
    "/images/hero2.jpg"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Get Best Sellers
  const featuredProducts = products.filter(p => p.isSignature).slice(0, 5);

  return (
    <Layout>
      <div className="bg-black text-white font-sans">
        
        {/* --- 1. HERO SECTION (UPDATED FOR MOBILE) --- */}
        {/* Changed h-[70vh] to h-[50vh] md:h-[70vh] to show more width on mobile */}
        <div className="relative h-[50vh] md:h-[70vh] w-full bg-gray-900 overflow-hidden flex items-center justify-center">
          {heroImages.map((img, index) => (
            <img 
              key={index}
              src={img}
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop'} 
              alt={`Hero ${index}`} 
              // Added object-center to keep focus in the middle
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? "opacity-60" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          
          <div className="relative z-20 text-center px-4 animate-fade-in-up">
            <h2 className="text-yellow-500 tracking-[0.3em] text-[10px] md:text-sm uppercase mb-2 md:mb-4">Luxury Redefined</h2>
            <h1 className="text-4xl md:text-7xl font-serif text-white mb-6 md:mb-8 leading-tight">
              Wear Your <br/> <span className="italic text-yellow-500">Soul</span>
            </h1>
            <Link to="/all-products" className="border border-white text-white px-8 py-2 md:px-10 md:py-3 hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition uppercase tracking-widest text-xs md:text-sm font-bold">Shop All</Link>
          </div>
        </div>

        {/* --- 2. THE 3 CATEGORIES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 h-auto md:h-[600px]">
          {/* FOR HIM */}
          <Link to="/for-him" className="relative group h-64 md:h-full border-r border-b border-gray-800 overflow-hidden">
            <img src="/images/male.jpg" alt="For Him" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-3xl md:text-4xl font-serif text-white group-hover:text-yellow-500 transition tracking-wider">FOR HIM</h3>
            </div>
          </Link>
          {/* FOR HER */}
          <Link to="/for-her" className="relative group h-64 md:h-full border-r border-b border-gray-800 overflow-hidden">
            <img src="/images/female.jpg" alt="For Her" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-3xl md:text-4xl font-serif text-white group-hover:text-yellow-500 transition tracking-wider">FOR HER</h3>
            </div>
          </Link>
          {/* UNISEX */}
          <Link to="/unisex" className="relative group h-64 md:h-full border-b border-gray-800 overflow-hidden">
            <img src="/images/unisex.jpg" alt="Unisex" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-3xl md:text-4xl font-serif text-white group-hover:text-yellow-500 transition tracking-wider">UNISEX</h3>
            </div>
          </Link>
        </div>

        {/* --- 3. CUSTOM GIFT SET BANNER (UPDATED FOR MOBILE) --- */}
        {/* Changed min-h to be smaller on mobile (400px) so less image is cropped */}
        <div className="relative min-h-[400px] md:min-h-[550px] flex items-center justify-center px-4 text-center border-b border-gray-800 overflow-hidden group">
           
           <img 
             src="/images/costume.jpg" 
             onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1616091093747-4d830b56b35d?auto=format&fit=crop&w=1500&q=80'}
             alt="Custom Gift Set background" 
             // Added object-center to force the middle of the image to show
             className="absolute inset-0 w-full h-full object-cover object-center opacity-60 transition duration-1000 group-hover:scale-105 group-hover:opacity-70"
           />
           
           <div className="absolute inset-0 bg-black/50 z-10"></div>

           <div className="relative z-20 max-w-3xl p-6 md:p-12 bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl">
              <h2 className="text-3xl md:text-5xl font-serif text-yellow-500 mb-4 md:mb-6">The Perfect Gift</h2>
              <p className="text-gray-100 text-sm md:text-xl mb-8 md:mb-10 leading-relaxed">
                Curate an exclusive box with 4 of your favorite scents (20ml each). A unique experience, crafted by you.
              </p>
              <Link 
                  to="/custom-box" 
                  className="inline-block bg-yellow-500 text-black px-8 py-3 md:px-12 md:py-4 font-bold uppercase tracking-[0.2em] text-xs md:text-base hover:bg-white transition shadow-lg hover:shadow-yellow-500/20"
                >
                  Build Your Box
              </Link>
           </div>
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