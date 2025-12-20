import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // <--- ADDED useNavigate
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { products } from '../data';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, Timestamp, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const StarRating = ({ rating }) => {
  return (
    <div className="flex text-yellow-500 text-sm">
      {[...Array(5)].map((_, i) => (
        <span key={i}>{i < Math.floor(rating) ? "★" : "☆"}</span>
      ))}
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // <--- INITIALIZE NAVIGATE
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  
  // TRACK WHICH REVIEW IS BEING EDITED
  const [editingId, setEditingId] = useState(null);

  const product = products.find(p => p.id === parseInt(id));

  // FETCH REVIEWS
  useEffect(() => {
    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const q = query(
        collection(db, "reviews"), 
        where("productId", "==", parseInt(id)),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // SUBMIT (ADD OR UPDATE)
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Please login to review");
    if (!newReview.trim()) return;

    try {
      if (editingId) {
        // UPDATE EXISTING REVIEW
        const reviewRef = doc(db, "reviews", editingId);
        await updateDoc(reviewRef, {
          text: newReview,
          rating: rating,
        });
        alert("Review updated successfully!");
        setEditingId(null); 
      } else {
        // ADD NEW REVIEW
        await addDoc(collection(db, "reviews"), {
          productId: parseInt(id),
          user: currentUser.email.split('@')[0],
          userId: currentUser.uid,
          text: newReview,
          rating: rating,
          createdAt: Timestamp.now()
        });
        alert("Review posted successfully!");
      }

      setNewReview('');
      setRating(5);
      fetchReviews(); 
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to save review.");
    }
  };

  // DELETE FUNCTION
  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await deleteDoc(doc(db, "reviews", reviewId));
        fetchReviews(); 
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review.");
      }
    }
  };

  // EDIT FUNCTION
  const handleEdit = (review) => {
    setNewReview(review.text);
    setRating(review.rating);
    setEditingId(review.id);
    document.getElementById('review-form').scrollIntoView({ behavior: 'smooth' });
  };

  // --- UPDATED ADD TO CART FUNCTION ---
  const addToCart = () => {
    dispatch({ 
      type: 'ADD_ITEM', 
      payload: { ...product, quantity, selectedSize: "50ml", price: product.price } 
    });
    
    // 1. Show alert
    alert(`Added ${quantity} x ${product.name} to cart!`);
    
    // 2. Redirect to Checkout immediately after user clicks OK
    navigate('/checkout'); 
  };

  if (!product) return <Layout><div className="text-center p-20 text-white">Product Not Found</div></Layout>;

  return (
    <Layout>
      <section className="py-12 bg-black min-h-screen text-white font-sans">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* TOP SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 flex items-center justify-center relative">
              <img src={product.image} alt={product.name} className={`w-full max-w-md h-auto rounded shadow-2xl transition duration-500 ${!product.inStock && 'grayscale opacity-50'}`}/>
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-red-600 text-white font-bold px-6 py-2 text-xl rounded uppercase tracking-widest shadow-xl">Out of Stock</span>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex justify-between items-start mb-2">
                <span className="text-yellow-500 tracking-widest text-xs uppercase font-bold border border-yellow-500 px-2 py-1 rounded">
                  {product.category.replace('-', ' ')}
                </span>
                <div className="flex items-center space-x-2 bg-gray-900 px-3 py-1 rounded-full">
                  <StarRating rating={product.rating} />
                  <span className="text-xs text-gray-400">({reviews.length > 0 ? reviews.length : product.reviews.length} Reviews)</span>
                </div>
              </div>

              <h1 className="text-5xl font-serif text-white mb-4">{product.name}</h1>
              <p className="text-gray-400 mb-6 text-lg leading-relaxed italic border-l-2 border-yellow-500 pl-4">"{product.inspiration}"</p>
              
              <div className="mb-8 bg-gray-900 p-4 rounded-lg border border-gray-800">
                <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                <div className="flex items-baseline space-x-2 mt-4">
                  <p className="text-4xl text-yellow-500 font-bold">₹{product.price}</p>
                  <p className="text-gray-500 text-sm">/ 50ml</p>
                </div>
              </div>

              <div className="flex space-x-4 h-14">
                 <div className="flex items-center border border-gray-700 rounded bg-black">
                   <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 text-yellow-500 text-2xl hover:bg-gray-800 h-full rounded-l" disabled={!product.inStock}>-</button>
                   <span className="px-5 text-white font-bold text-lg">{quantity}</span>
                   <button onClick={() => setQuantity(quantity + 1)} className="px-5 text-yellow-500 text-2xl hover:bg-gray-800 h-full rounded-r" disabled={!product.inStock}>+</button>
                 </div>
                 {product.inStock ? (
                   <button onClick={addToCart} className="flex-1 bg-yellow-500 text-black font-bold uppercase tracking-widest text-lg rounded hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(234,179,8,0.4)]">Add to Cart</button>
                 ) : (
                   <button disabled className="flex-1 bg-gray-700 text-gray-400 font-bold uppercase tracking-widest text-lg rounded cursor-not-allowed">Sold Out</button>
                 )}
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: TABS */}
          <div className="border-t border-gray-800 pt-10">
            <div className="flex justify-center space-x-8 mb-10 border-b border-gray-800 pb-4">
              <button onClick={() => setActiveTab('details')} className={`text-lg uppercase tracking-widest pb-2 ${activeTab === 'details' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-500 hover:text-white'}`}>Olfactory Notes & Specs</button>
              <button onClick={() => setActiveTab('reviews')} className={`text-lg uppercase tracking-widest pb-2 ${activeTab === 'reviews' ? 'text-yellow-500 border-b-2 border-yellow-500' : 'text-gray-500 hover:text-white'}`}>Customer Reviews</button>
            </div>

            {/* TAB CONTENT: DETAILS */}
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in">
                <div>
                  <h3 className="text-2xl font-serif text-white mb-6">Fragrance Pyramid</h3>
                  <div className="space-y-6">
                    <div className="bg-gray-900 p-4 rounded border-l-4 border-yellow-500">
                      <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Top Notes</span>
                      <p className="text-white text-lg">{product.notes.top}</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded border-l-4 border-yellow-600">
                      <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Heart Notes</span>
                      <p className="text-white text-lg">{product.notes.mid}</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded border-l-4 border-yellow-700">
                      <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Base Notes</span>
                      <p className="text-white text-lg">{product.notes.base}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-white mb-6">Performance</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900 p-4 rounded text-center">
                      <span className="block text-gray-500 text-xs uppercase mb-2">Ideal Weather</span>
                      <p className="text-yellow-500 font-bold">{product.specs.weather}</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded text-center">
                      <span className="block text-gray-500 text-xs uppercase mb-2">Occasion</span>
                      <p className="text-yellow-500 font-bold">{product.specs.time}</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded text-center">
                      <span className="block text-gray-500 text-xs uppercase mb-2">Longevity</span>
                      <p className="text-white">{product.specs.longevity}</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded text-center">
                      <span className="block text-gray-500 text-xs uppercase mb-2">Projection</span>
                      <p className="text-white">{product.specs.projection}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="max-w-3xl mx-auto space-y-6">
                
                {currentUser ? (
                  <form id="review-form" onSubmit={handleSubmitReview} className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-800">
                    <h4 className="text-xl font-bold text-white mb-4">
                      {editingId ? "Edit Your Review" : "Write a Review"}
                    </h4>
                    
                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button type="button" key={star} onClick={() => setRating(star)} className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-600'}`}>★</button>
                      ))}
                    </div>

                    <textarea 
                      className="w-full bg-black border border-gray-700 p-3 rounded text-white mb-4 focus:border-yellow-500 outline-none"
                      rows="3"
                      placeholder="Share your experience..."
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      required
                    ></textarea>
                    
                    <div className="flex gap-4">
                      <button type="submit" className="bg-white text-black px-6 py-2 font-bold uppercase text-sm tracking-wider hover:bg-gray-200">
                        {editingId ? "Update Review" : "Submit Review"}
                      </button>
                      
                      {editingId && (
                        <button 
                          type="button" 
                          onClick={() => { setEditingId(null); setNewReview(''); setRating(5); }}
                          className="text-red-500 text-sm font-bold uppercase tracking-wider hover:text-red-400"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                ) : (
                  <div className="text-center mb-10 bg-gray-900 p-6 rounded border border-gray-800">
                      <p className="text-gray-400 mb-4">Please login to write a review.</p>
                      <Link to="/login" className="text-yellow-500 underline hover:text-white font-bold">Login Here</Link>
                  </div>
                )}

                {(reviews.length > 0 ? reviews : product.reviews).length === 0 ? (
                    <div className="text-center text-gray-500">No reviews yet. Be the first!</div>
                ) : (
                    (reviews.length > 0 ? reviews : product.reviews).map((review, index) => (
                    <div key={index} className="bg-gray-900 p-6 rounded border border-gray-800 relative group">
                        
                        {/* DELETE & EDIT BUTTONS (Only visible for the author) */}
                        {currentUser && review.userId === currentUser.uid && (
                          <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleEdit(review)} 
                              className="text-blue-400 hover:text-white text-xs font-bold uppercase"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete(review.id)} 
                              className="text-red-500 hover:text-red-300 text-xs font-bold uppercase"
                            >
                              Delete
                            </button>
                          </div>
                        )}

                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-white">{review.user || review.userName}</h4>
                          <StarRating rating={review.rating} />
                        </div>
                        <p className="text-gray-300">"{review.text}"</p>
                    </div>
                    ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;