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
        
        {/* --- 1. HERO SECTION (SLIDESHOW) --- */}
        <div className="relative h-[75vh] w-full bg-gray-900 overflow-hidden flex items-center justify-center">
          {heroImages.map((img, index) => (
            <img 
              key={index}
              src={img}
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=1000&auto=format&fit=crop'} 
              alt={`Soul Fragrance Hero ${index}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? "opacity-60" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 z-10"></div>
          
          {/* Hero Text */}
          <div className="relative z-20 text-center px-4 animate-fade-in-up max-w-4xl mx-auto">
            {/* SEO TAGLINE */}
            <h2 className="text-yellow-500 tracking-[0.2em] text-xs md:text-sm uppercase mb-4 font-bold">
              India's Premier Inspired Fragrance House
            </h2>
            <h1 className="text-5xl md:text-8xl font-serif text-white mb-6 leading-tight">
              Wear Your <span className="italic text-yellow-500">Soul</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto">
              Experience the art of luxury with our handcrafted <strong>Extrait de Parfums</strong>. 
              Long-lasting, premium scents designed to leave a mark.
            </p>
            <Link to="/all-products" className="inline-block bg-white text-black px-10 py-4 hover:bg-yellow-500 hover:text-black transition uppercase tracking-widest text-sm font-bold shadow-lg shadow-white/10">
              Shop The Collection
            </Link>
          </div>
        </div>

        {/* --- 2. THE 3 CATEGORIES --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 h-auto md:h-[600px] border-b border-gray-800">
          {/* 1. FOR HIM */}
          <Link to="/for-him" className="relative group h-64 md:h-full border-r border-gray-800 overflow-hidden">
            <img src="/images/male.jpg" alt="Best Perfumes for Men" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-3xl md:text-5xl font-serif text-white group-hover:text-yellow-500 transition tracking-wider">FOR HIM</h3>
              <span className="mt-2 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition duration-500 transform translate-y-4 group-hover:translate-y-0">Bold & Masculine</span>
            </div>
          </Link>
          {/* 2. FOR HER */}
          <Link to="/for-her" className="relative group h-64 md:h-full border-r border-gray-800 overflow-hidden">
            <img src="/images/female.jpg" alt="Best Perfumes for Women" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-3xl md:text-5xl font-serif text-white group-hover:text-yellow-500 transition tracking-wider">FOR HER</h3>
              <span className="mt-2 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition duration-500 transform translate-y-4 group-hover:translate-y-0">Elegant & Floral</span>
            </div>
          </Link>
          {/* 3. UNISEX */}
          <Link to="/unisex" className="relative group h-64 md:h-full overflow-hidden">
            <img src="/images/unisex.jpg" alt="Unisex Fragrances" className="w-full h-full object-cover transition duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-3xl md:text-5xl font-serif text-white group-hover:text-yellow-500 transition tracking-wider">UNISEX</h3>
              <span className="mt-2 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition duration-500 transform translate-y-4 group-hover:translate-y-0">Modern & Versatile</span>
            </div>
          </Link>
        </div>

        {/* --- 3. CUSTOM GIFT SET BANNER (The "Hook") --- */}
        <div className="relative min-h-[600px] flex items-center justify-center px-4 text-center border-b border-gray-800 overflow-hidden group">
           {/* Background Image */}
           <img 
             src="/images/costume.jpg" 
             onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1616091093747-4d830b56b35d?auto=format&fit=crop&w=1500&q=80'}
             alt="Custom Perfume Gift Box India" 
             className="absolute inset-0 w-full h-full object-cover object-left opacity-100 transition duration-1000 group-hover:scale-105 group-hover:opacity-70"
           />
           <div className="absolute inset-0 bg-black/60 z-10"></div>

           <div className="relative z-20 max-w-4xl p-10 md:p-16 border border-white/20 rounded-sm bg-black/40 backdrop-blur-sm">
              <p className="text-yellow-500 uppercase tracking-widest text-xs mb-4">The Ultimate Gift</p>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6">Create Your Signature Box</h2>
              <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto">
                Why choose one when you can have four? Curate a <strong>Discovery Set</strong> with 4 of your favorite 20ml luxury scents. 
                Perfect for gifting or finding your new signature scent.
              </p>
              <Link 
                  to="/custom-box" 
                  className="inline-block bg-yellow-500 text-black px-12 py-4 font-bold uppercase tracking-[0.2em] text-sm md:text-base hover:bg-white transition shadow-lg hover:shadow-yellow-500/20"
                >
                  Build Your Box - ₹999
              </Link>
           </div>
        </div>

        {/* --- 4. NEW: TRUST SIGNALS (SEO GOLDMINE) --- */}
        <div className="py-16 border-b border-gray-800 bg-gray-900/50">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-yellow-500 text-4xl mb-4">✦</div>
              <h4 className="text-xl font-serif text-white mb-2">Extrait de Parfum</h4>
              <p className="text-gray-400 text-sm">Highest oil concentration (30%) ensuring your fragrance lasts 12+ hours.</p>
            </div>
            <div className="p-6 border-l-0 md:border-l border-r-0 md:border-r border-gray-800">
              <div className="text-yellow-500 text-4xl mb-4">🇮🇳</div>
              <h4 className="text-xl font-serif text-white mb-2">Handcrafted in Odisha</h4>
              <p className="text-gray-400 text-sm">Proudly Indian. Premium ingredients blended to perfection in Bhubaneswar.</p>
            </div>
            <div className="p-6">
              <div className="text-yellow-500 text-4xl mb-4">⚖️</div>
              <h4 className="text-xl font-serif text-white mb-2">Fair Price Luxury</h4>
              <p className="text-gray-400 text-sm">Designer quality scents at a fraction of the price. No hidden markups.</p>
            </div>
          </div>
        </div>

        {/* --- 5. BEST SELLERS SCROLL --- */}
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">Trending Now</h2>
              <p className="text-gray-500 text-sm">Our most loved inspired fragrances.</p>
            </div>
            <Link to="/all-products" className="text-yellow-500 text-xs uppercase tracking-widest border-b border-yellow-500 pb-1 hover:text-white hover:border-white transition">View All</Link>
          </div>

          <div className="flex overflow-x-auto space-x-6 pb-8 custom-scrollbar">
            {featuredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="min-w-[280px] group">
                <div className="bg-gray-900 rounded-sm overflow-hidden border border-gray-800 relative">
                  <div className="relative h-80">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className={`w-full h-full object-cover transition duration-700 ease-in-out ${!product.inStock ? 'grayscale opacity-50' : 'group-hover:scale-110 group-hover:opacity-80'}`} 
                    />
                    {!product.inStock && (
                       <div className="absolute inset-0 flex items-center justify-center z-10">
                         <span className="bg-red-600 text-white text-xs font-bold px-4 py-2 uppercase tracking-widest">Sold Out</span>
                       </div>
                    )}
                    {/* Hover Add to Cart Overlay (Visual Only) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                       <span className="bg-white text-black px-6 py-2 uppercase text-xs font-bold tracking-widest">View Details</span>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-white font-serif text-xl mb-2">{product.name}</h3>
                    <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{product.category}</p>
                    <p className="text-yellow-500 font-bold text-lg">₹{product.price}</p>
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