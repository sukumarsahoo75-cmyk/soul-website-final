import React, { useState } from 'react';
import Layout from '../components/Layout';
import { products } from '../data'; 
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Samples = () => {
  // FIX 1: Destructure 'dispatch' instead of 'addToCart'
  const { dispatch } = useCart();
  const navigate = useNavigate();
  
  // CONFIGURATION
  const BOX_PRICE = 250;
  const REQUIRED_COUNT = 10;

  const [selectedScents, setSelectedScents] = useState([]);

  // Helper to check if box is full
  const isFull = selectedScents.length === REQUIRED_COUNT;
  const remaining = REQUIRED_COUNT - selectedScents.length;

  // Toggle Selection Logic
  const toggleScent = (product) => {
    const isSelected = selectedScents.find(p => p.id === product.id);

    if (isSelected) {
      // Remove if already selected
      setSelectedScents(selectedScents.filter(p => p.id !== product.id));
    } else {
      // Add if not full
      if (selectedScents.length < REQUIRED_COUNT) {
        setSelectedScents([...selectedScents, product]);
      } else {
        alert(`You can only select ${REQUIRED_COUNT} testers for this pack!`);
      }
    }
  };

  const handleAddToCart = () => {
    if (selectedScents.length !== REQUIRED_COUNT) {
      return; 
    }

    try {
      // FIX 2: Use dispatch directly (Pattern from CustomBox.jsx)
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: "sample-pack-" + Date.now(), // Unique ID so you can add multiple different packs
          name: "Discovery Sample Pack (10 x 2ml)",
          price: BOX_PRICE,
          image: "/images/hero5.jpg", 
          quantity: 1,
          category: "Sample Set",
          selectedSize: "2ml Vial",
          inStock: true,
          description: `Selection: ${selectedScents.map(s => s.name).join(", ")}`
        }
      });
      
      // FIX 3: Force Navigation to Cart
      navigate('/cart');

    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Something went wrong adding to cart. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="bg-black min-h-screen text-white pb-32 font-sans">
        
        {/* --- HERO SECTION --- */}
        <div className="relative h-[40vh] bg-gray-900 flex items-center justify-center overflow-hidden">
          <img 
            src="/images/hero5.jpg" 
            alt="Perfume Samples" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-serif text-yellow-500 mb-4">Discovery Sample Pack</h1>
            <p className="text-gray-300 text-lg">
              Try before you buy. Select <strong>10 scents</strong> (2ml each) for just <strong>₹{BOX_PRICE}</strong>.
            </p>
          </div>
        </div>

        {/* --- SELECTION TRACKER (Sticky Header) --- */}
        <div className="sticky top-20 z-30 bg-black/90 backdrop-blur border-b border-gray-800 p-4 shadow-xl">
          <div className="container mx-auto flex justify-between items-center">
             <div className="flex flex-col">
               <span className="text-gray-400 text-[10px] uppercase tracking-widest">Your Box</span>
               <span className={`text-xl font-bold ${isFull ? 'text-green-400' : 'text-yellow-500'}`}>
                 {selectedScents.length} / {REQUIRED_COUNT} Selected
               </span>
             </div>
             
             {/* CLEAR BUTTON */}
             {selectedScents.length > 0 && (
               <button 
                 onClick={() => setSelectedScents([])}
                 className="text-xs text-red-500 underline hover:text-red-400"
               >
                 Clear All
               </button>
             )}
          </div>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((product) => {
              const isSelected = selectedScents.find(s => s.id === product.id);
              
              // FADE LOGIC
              const fadeClass = (isFull && !isSelected) ? "opacity-30 pointer-events-none grayscale" : "opacity-100";

              return (
                <div 
                  key={product.id} 
                  onClick={() => product.inStock && toggleScent(product)}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border transition-all duration-300 group ${fadeClass}
                    ${isSelected ? 'border-yellow-500 ring-2 ring-yellow-500/50 bg-gray-900' : 'border-gray-800 hover:border-gray-600'}
                    ${!product.inStock ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {/* Image */}
                  <div className="h-40 w-full bg-gray-800 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    
                    {/* Checkbox Overlay */}
                    <div className="absolute top-2 right-2">
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition shadow-lg
                        ${isSelected ? 'bg-yellow-500 border-yellow-500' : 'bg-black/50 border-white'}`}>
                        {isSelected && <span className="text-black font-bold text-xs">✓</span>}
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 text-center">
                    <h3 className="text-xs md:text-sm font-bold text-white truncate">{product.name}</h3>
                    <p className="text-[10px] text-gray-400 uppercase">{product.category}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- BOTTOM ACTION BAR (Dynamic Button) --- */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-900 border-t border-gray-800 z-50">
          <div className="container mx-auto max-w-lg">
             <button 
                type="button" 
                onClick={handleAddToCart}
                disabled={!isFull}
                className={`w-full py-4 rounded font-bold uppercase tracking-widest text-sm transition-all shadow-lg
                  ${isFull 
                    ? 'bg-yellow-500 text-black hover:bg-white hover:scale-105 active:scale-95' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`
                }
             >
                {remaining > 0 
                  ? `Select ${remaining} more item${remaining !== 1 ? 's' : ''}` 
                  : `Add to Cart - ₹${BOX_PRICE}`
                }
             </button>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Samples;