import React, { useEffect, useState } from 'react';

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);

  // Array of background images
  const backgroundImages = [
    "/hero-bg.jpg",
    "/hero-bg2.jpg",
    "/hero-bg3.jpg"
  ];

  useEffect(() => {
    setLoaded(true);
    
    // Set up the slideshow interval
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative bg-cover bg-center h-[80vh] flex items-center justify-center transition-all duration-1000"
      style={{ backgroundImage: `url(${backgroundImages[currentBg]})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      <div
        className={`bg-black bg-opacity-80 p-6 md:p-10 rounded-xl text-center transition-all duration-1000 transform border border-gold-500 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        } delay-700 relative z-10 mx-4`}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gold-500 tracking-wide drop-shadow-lg hero-glow">
          Discover Your Signature Scent
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-300 max-w-xl mx-auto font-sans">
          Premium, long-lasting perfumes designed to evoke emotions and
          memories. Experience the essence of SOUL.
        </p>
        <a
          href="#all-products"
          className="mt-6 inline-block px-6 md:px-8 py-2 md:py-3 bg-gold-600 text-black font-semibold rounded-full shadow-lg hover:bg-gold-500 transition transform hover:scale-105"
        >
          Shop Now
        </a>
      </div>
      
      {/* Slideshow indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentBg ? "bg-gold-500" : "bg-gray-600"
            }`}
            onClick={() => setCurrentBg(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Custom styles for text glow */}
      <style jsx>{`
        .hero-glow {
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.5),
                       0 0 20px rgba(212, 175, 55, 0.3),
                       0 0 30px rgba(212, 175, 55, 0.2);
        }
        
        @media (max-width: 768px) {
          .hero-glow {
            text-shadow: 0 0 8px rgba(212, 175, 55, 0.5),
                         0 0 15px rgba(212, 175, 55, 0.3);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;