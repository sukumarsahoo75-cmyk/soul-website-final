import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp, orderBy } from 'firebase/firestore';

// A simple component for displaying star ratings
const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};


const ProductDetail = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { dispatch } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  // State for reviews
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');

  // Your complete product data
  const allProducts = {
    1: { id: 1, name: "Mystic", description: "A captivating unisex fragrance with citrus and amber notes.", longDescription: "Mystic is a captivating unisex fragrance that opens with bright citrus notes of bergamot, lemon and orange revealing a heart of delicate Saffron, Jasmine and Amber. Perfect for daytime wear, it leaves a subtle, memorable trail that works beautifully for both men and women.", price: 599, images: ["/product1.jpg","/product1.jpg","/product1.jpg"], features: ["Long-lasting 8+ hours","Natural essential oils","Alcohol-free formula","Cruelty-free","Unisex fragrance"], notes: { top: ["Bergamot", "Mandarin", "Lemon Zest"], middle: ["Saffron", "Amberwood", "Ambergris"], base: ["Cedar", "Oakmoss"] }, category: "unisex" },
    2: { id: 2, name: "Blu", description: "A bold and masculine aquatic fragrance inspired by the Mediterranean.", longDescription: "Blu is a bold and masculine fragrance that captures the alluring essence of the Mediterranean. Its powerful aquatic heart is invigorated by zesty bursts of bergamot and grapefruit, while rare saffron adds a touch of spice. A rich, musky base rounds out the scent, creating a captivating and sophisticated aroma.", price: 499, images: ["/product2.jpg","/product2.jpg","/product2.jpg"], features: ["Long-lasting 10+ hours","Aquatic aromatic profile","Natural ingredients","Cruelty-free"], notes: { top: ["Calabrian Bergamot", "Water Notes", "Grapefruit", "Fig Leaf"], middle: ["Violet leaves", "Patchouli", "Papyrus", "Black Pepper", "Ambroxan"], base: ["Musk", "Tonka Beans", "Saffron", "Frankincense"] }, category: "for-him" },
    3: { id: 3, name: "Oud Intense", description: "A powerful unisex Oriental Woody fragrance with exotic spices.", longDescription: "Oud Intense is a powerful unisex Oriental Woody fragrance that celebrates the rich heritage of oud. With deep woody notes complemented by exotic spices, this scent makes a bold statement while maintaining an air of sophistication suitable for both men and women.", price: 599, images: ["/product3.jpg","/product3.jpg","/product3.jpg"], features: ["Long-lasting 8+ hours","Premium oud composition","Concentrated formula","Cruelty-free","Unisex fragrance"], notes: { top: ["Cardamom", "Pink Pepper", "Rosewood"], middle: ["Sandalwood", "Agarwood", "Vetiver"], base: ["Vanilla", "Tonka Bean", "Amber"] }, category: "unisex" },
    4: { id: 4, name: "Her", description: "A radiant and empowering fragrance blending softness with strength.", longDescription: "Her is a radiant and empowering fragrance crafted for the woman who blends softness with strength. It opens with a delicate veil of powdery musk, kissed by sparkling citrus notes of bergamot and grapefruit, creating a fresh yet sophisticated first impression. As the scent unfolds, a heart of rose and patchouli adds depth and allure, while smoky pineapple and oakmoss from Creed Aventus lend a bold, modern twist. The base settles into warm amber and woods, leaving a trail that's both sensual and unforgettable.", price: 499, images: ["/product4.jpg","/product4.jpg","/product4.jpg"], features: ["Long-lasting 8+ hours","Floral woody musk","Natural extracts","Cruelty-free"], notes: { top: ["Powdery musk", "Bergamot", "Lemon"], middle: ["Rose", "Patchouli", "Smoky Pineapple"], base: ["Amber", "Oakmoss", "Soft Woods"] }, category: "for-her" },
    5: { id: 5, name: "Luxury Perfume Gift Set - 4 x 20ml", description: "The perfect fragrance collection featuring our four signature scents.", longDescription: "Experience the complete SOUL fragrance journey with our exquisite Luxury Perfume Gift Set. This carefully curated collection includes all four of our signature scents in elegant 20ml bottles, beautifully presented in premium gift packaging. Perfect for discovering your favorite fragrance or as an unforgettable gift for someone special. From the captivating Mystic to the bold Oud Intense, the aquatic Blu to the radiant Her - this set offers a complete olfactory experience for every mood and occasion.", price: 699, images: ["/product5.jpg","/product5.jpg","/product5.jpg"], features: ["4 different fragrances","20ml each bottle","Premium gift packaging","Perfect for travel","Ideal for gifting","Discover your signature scent"], category: "gift-sets" }
  };

  useEffect(() => {
    const currentProduct = allProducts[id];
    setProduct(currentProduct);
    setLoading(false);

    const fetchReviews = async () => {
      if (!currentProduct) return;
      setLoadingReviews(true);
      try {
        const reviewsRef = collection(db, "reviews");
        const q = query(reviewsRef, where("productId", "==", id), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReviews(fetchedReviews);
      } catch (error) { console.error("Error fetching reviews: ", error); }
      setLoadingReviews(false);
    };

    fetchReviews();
    window.scrollTo(0, 0);
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) { return setReviewError("Please select a star rating."); }
    setReviewError('');
    
    const newReview = { productId: id, userId: currentUser.uid, userEmail: currentUser.email, rating, comment, createdAt: serverTimestamp() };

    try {
      const docRef = await addDoc(collection(db, "reviews"), newReview);
      setReviews([{ ...newReview, id: docRef.id, userEmail: currentUser.email }, ...reviews]);
      setComment(''); setRating(0);
    } catch (error) {
      console.error("Error adding review: ", error);
      setReviewError("Failed to submit review. Please try again.");
    }
  };

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity: quantity } });
    alert(`Added ${quantity} of ${product.name} to cart!`);
  };

  const formatIndianRupees = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  if (loading) { return <Layout><div className="text-center p-10">Loading...</div></Layout>; }
  if (!product) { return ( <Layout> <section className="py-16 bg-gray-900 min-h-screen"> <div className="container mx-auto px-4 text-center"> <h1 className="text-3xl text-gold-500 mb-4">Product Not Found</h1> <p className="text-gray-300 mb-6">The product you're looking for doesn't exist.</p> <Link to="/all-products" className="text-gold-300 hover:text-gold-500 font-sans">Back to All Products</Link> </div> </section> </Layout> ); }

  return (
    <Layout>
      <section className="py-16 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="flex mb-8 text-sm font-sans">
              <Link to="/" className="text-gold-500 hover:text-gold-300">Home</Link>
              <span className="mx-2 text-gray-500">/</span>
              <Link to="/all-products" className="text-gold-500 hover:text-gold-300">All Products</Link>
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-300">{product.name}</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-gray-800 rounded-xl p-4 mb-4"><img src={product.images[selectedImage]} alt={product.name} className="w-full h-96 object-cover rounded-lg"/></div>
                <div className="flex space-x-4">
                  {product.images.map((image, index) => (<button key={index} onClick={() => setSelectedImage(index)} className={`bg-gray-800 rounded-lg p-2 border-2 transition-all ${selectedImage === index ? 'border-gold-500' : 'border-transparent hover:border-gold-300'}`}><img src={image} alt={`${product.name} view ${index + 1}`} className="w-16 h-16 object-cover rounded"/></button>))}
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gold-500 mb-4">{product.name}</h1>
                <p className="text-2xl font-semibold text-gold-400 mb-6">{formatIndianRupees(product.price)}</p>
                <p className="text-gray-300 mb-6 leading-relaxed font-sans">{product.longDescription}</p>
                {product.id === 5 && ( <div className="mb-6"> <h3 className="text-xl font-semibold text-gold-400 mb-3">What's Included</h3> <ul className="text-gray-300 space-y-2 font-sans"> <li className="flex items-center"><span className="text-gold-500 mr-2">•</span>Mystic 20ml</li> <li className="flex items-center"><span className="text-gold-500 mr-2">•</span>Blu 20ml</li> <li className="flex items-center"><span className="text-gold-500 mr-2">•</span>Oud Intense 20ml</li> <li className="flex items-center"><span className="text-gold-500 mr-2">•</span>Her 20ml</li> <li className="flex items-center"><span className="text-gold-500 mr-2">•</span>Elegant Gift Box</li> <li className="flex items-center"><span className="text-gold-500 mr-2">•</span>Care Instructions</li> </ul> </div> )}
                <div className="flex items-center mb-6">
                  <span className="text-gray-300 mr-4 font-sans">Quantity:</span>
                  <div className="flex items-center border border-gray-600 rounded">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 text-gold-500 hover:bg-gray-700 transition">-</button>
                    <span className="px-4 py-1 text-gray-300 font-sans">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1 text-gold-500 hover:bg-gray-700 transition">+</button>
                  </div>
                </div>
                <button onClick={addToCart} className="w-full bg-gold-600 text-black font-semibold py-3 rounded-lg hover:bg-gold-500 transition mb-6 font-sans">Add to Cart - {formatIndianRupees(product.price * quantity)}</button>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gold-400 mb-3">Features</h3>
                  <ul className="text-gray-300 space-y-2 font-sans">
                    {product.features.map((feature, index) => (<li key={index} className="flex items-center"><span className="text-gold-500 mr-2">•</span>{feature}</li>))}
                  </ul>
                </div>
                {product.notes && product.id !== 5 && ( <div> <h3 className="text-xl font-semibold text-gold-400 mb-3">Fragrance Notes</h3> <div className="grid grid-cols-3 gap-4 text-sm"> <div> <h4 className="text-gold-500 font-semibold mb-2">Top Notes</h4> <p className="text-gray-300 font-sans">{product.notes.top.join(', ')}</p> </div> <div> <h4 className="text-gold-500 font-semibold mb-2">Middle Notes</h4> <p className="text-gray-300 font-sans">{product.notes.middle.join(', ')}</p> </div> <div> <h4 className="text-gold-500 font-semibold mb-2">Base Notes</h4> <p className="text-gray-300 font-sans">{product.notes.base.join(', ')}</p> </div> </div> </div> )}
              </div>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto mt-12">
            <h2 className="text-3xl font-bold text-gold-400 mb-6 border-b border-gray-700 pb-2">Reviews & Ratings</h2>
            {currentUser ? (
              <form onSubmit={handleSubmitReview} className="bg-gray-800 p-6 rounded-lg mb-8">
                <h3 className="text-xl text-gold-500 mb-4">Write a Review</h3>
                {reviewError && <p className="text-red-400 mb-4">{reviewError}</p>}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-2">Your Rating</label>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (<button type="button" key={ratingValue} onClick={() => setRating(ratingValue)}><svg className={`w-8 h-8 ${ratingValue <= rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69L9.049 2.927z" /></svg></button>);
                    })}
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-gray-300 mb-2">Your Review</label>
                  <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} rows="4" className="w-full p-2 bg-gray-700 rounded text-gray-200 focus:outline-none focus:border-gold-500" placeholder="Tell us what you think..."></textarea>
                </div>
                <button type="submit" className="bg-gold-600 text-black font-semibold px-6 py-2 rounded-lg hover:bg-gold-500 transition">Submit Review</button>
              </form>
            ) : (<p className="text-gray-400 mb-8">You must be <Link to="/login" className="text-gold-500 hover:underline">logged in</Link> to write a review.</p>)}
            {loadingReviews ? (<p className="text-gray-400">Loading reviews...</p>) : reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map(review => (<div key={review.id} className="bg-gray-800 p-4 rounded-lg"><StarRating rating={review.rating} /><p className="text-gray-300 my-2">{review.comment}</p><small className="text-gray-500">by {review.userEmail}</small></div>))}
              </div>
            ) : (<p className="text-gray-400">Be the first to review this product!</p>)}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;