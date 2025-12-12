import React, { useState } from 'react';
import Layout from '../components/Layout';
import { products } from '../data'; 
import { useCart } from '../context/CartContext';

const CustomBox = () => {
  const [selectedScents, setSelectedScents] = useState([]);
  const { dispatch } = useCart();
  
  const toggleSelection = (product) => {
    const isAlreadySelected = selectedScents.find(item => item.id === product.id);
    if (isAlreadySelected) {
      setSelectedScents(selectedScents.filter(item => item.id !== product.id));
    } else {
      if (selectedScents.length < 4) {
        setSelectedScents([...selectedScents, product]);
      }
    }
  };

  const handleAddToCart = () => {
    if (selectedScents.length !== 4) return;
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: "custom-box-set",
        name: "Discovery Box (4 x 20ml)",
        price: 999,
        image: "/logo.png", 
        quantity: 1,
        description: `Contains: ${selectedScents.map(p => p.name).join(", ")}`
      }
    });
    alert("Discovery Box added to Cart!");
  };

  return (
    <Layout>
      <div className="bg-black min-h-screen text-white pb-24">
        
        {/* --- 1. HERO IMAGE SECTION --- */}
        {/* 'w-full h-auto' ensures the full image is shown on mobile without cropping */}
        <div className="w-full bg-gray-900">
           <img 
             src="/images/costume.jpg" 
             alt="Build Your Box"
             onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1616091093747-4d830b56b35d?auto=format&fit=crop&w=1500&q=80'}
             className="w-full h-auto md:h-[400px] object-contain md:object-cover"
           />
        </div>

        {/* --- 2. STICKY HEADER & TRACKER --- */}
        {/* This sticks to the top once you scroll past the image */}
        <div className="text-center sticky top-16 bg-black/95 backdrop-blur z-20 py-6 border-b border-gray-800 shadow-xl">
          <h1 className="text-3xl md:text-4xl text-yellow-500 font-serif font-bold">Build Your Own Box</h1>
          <p className="text-gray-400 mt-2 text-sm">Select 4 Miniatures (20ml) for <span className="text-white font-bold text-lg">₹999</span></p>
          
          {/* TRACKER CIRCLES */}
          <div className="mt-4 flex justify-center space-x-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all
                ${i < selectedScents.length ? 'border-yellow-500 bg-gray-900 text-yellow-500 shadow-lg scale-110' : 'border-gray-800 border-dashed text-gray-700'}`}>
                {i < selectedScents.length ? (
                   <span className="text-[10px] font-bold text-center leading-tight overflow-hidden px-1">{selectedScents[i].name.substring(0,3)}</span>
                ) : <span className="text-xl">+</span>}
              </div>
            ))}
          </div>
        </div>

        {/* --- 3. PRODUCT GRID --- */}
        {/* Added top padding (pt-8) for spacing after the sticky header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 pt-8">
          {products.map((product) => {
            const isSelected = selectedScents.find(item => item.id === product.id);
            const isDisabled = !isSelected && selectedScents.length >= 4;

            return (
              <div 
                key={product.id} 
                onClick={() => !isDisabled && toggleSelection(product)}
                className={`cursor-pointer p-4 rounded-lg transition-all relative group
                  ${isSelected 
                    ? 'border-2 border-yellow-500 bg-gray-800 shadow-[0_0_15px_rgba(234,179,8,0.3)]' 
                    : 'border border-gray-800 bg-black hover:border-gray-600'}
                  ${isDisabled ? 'opacity-30 cursor-not-allowed grayscale' : ''}
                `}
              >
                {/* "SELECTED" BADGE */}
                {isSelected && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-[10px] font-bold z-10 shadow-md">
                    SELECTED
                  </div>
                )}
                
                <div className="h-32 w-full bg-gray-900 rounded mb-3 overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className={`h-full w-full object-cover transition-all duration-300 ${isSelected ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} 
                  />
                </div>
                
                <h3 className={`font-semibold text-sm transition-colors ${isSelected ? 'text-yellow-400' : 'text-gray-300'}`}>
                  {product.name}
                </h3>
                <p className="text-gray-500 text-xs mt-1 capitalize">{product.category.replace('-',' ')}</p>
              </div>
            )
          })}
        </div>

        {/* --- 4. CHECKOUT BUTTON --- */}
        <div className="fixed bottom-0 left-0 w-full bg-black/95 backdrop-blur p-4 border-t border-gray-800 flex justify-center z-50">
          <button 
            onClick={handleAddToCart}
            disabled={selectedScents.length !== 4}
            className={`px-8 py-4 rounded shadow-lg font-bold text-lg w-full max-w-md transition-all uppercase tracking-wider
              ${selectedScents.length === 4 
                ? 'bg-yellow-500 text-black hover:bg-white hover:scale-105' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
          >
            {selectedScents.length === 4 ? "Add Box to Cart - ₹999" : `Select ${4 - selectedScents.length} more`}
          </button>
        </div>

      </div>
    </Layout>
  );
};

export default CustomBox;