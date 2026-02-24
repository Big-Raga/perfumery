import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, submitReview, getProductReviews } from '../api/productAPI';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [activeTab, setActiveTab] = useState('description');

    // Reviews state
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [reviewForm, setReviewForm] = useState({ reviewerName: '', rating: 5, comment: '' });
    const [reviewSubmitting, setReviewSubmitting] = useState(false);
    const [reviewSubmitMsg, setReviewSubmitMsg] = useState(null); // { type: 'success'|'error', text }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const productData = await getProductById(productId);
                setProduct(productData);
                setError(null);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    // Fetch approved reviews when the reviews tab is opened
    useEffect(() => {
        if (activeTab === 'reviews' && productId) {
            const fetchReviews = async () => {
                setReviewsLoading(true);
                try {
                    const data = await getProductReviews(productId);
                    setReviews(data);
                } catch {
                    setReviews([]);
                } finally {
                    setReviewsLoading(false);
                }
            };
            fetchReviews();
        }
    }, [activeTab, productId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setReviewSubmitting(true);
        setReviewSubmitMsg(null);
        try {
            const result = await submitReview(productId, reviewForm);
            setReviewSubmitMsg({ type: 'success', text: result.message });
            setReviewForm({ reviewerName: '', rating: 5, comment: '' });
        } catch (err) {
            setReviewSubmitMsg({ type: 'error', text: err.response?.data?.message || 'Failed to submit review.' });
        } finally {
            setReviewSubmitting(false);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} className="text-yellow-400 text-lg">★</span>);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<span key={i} className="text-yellow-300 text-lg">★</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300 text-lg">☆</span>);
            }
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
                    <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                            <img
                                src={Array.isArray(product.picture) ? product.picture[selectedImage] : product.picture}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {Array.isArray(product.picture) && product.picture.length > 1 && (
                            <div className="flex space-x-2">
                                {product.picture.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`${product.title} ${index + 1}`}
                                        className={`w-16 h-16 object-cover rounded-lg cursor-pointer border-2 transition-all ${selectedImage === index
                                            ? 'border-gray-900 ring-2 ring-gray-900 ring-opacity-50'
                                            : 'border-gray-200 hover:border-gray-400'
                                            }`}
                                        onClick={() => setSelectedImage(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="flex items-center">
                                    {renderStars(product.rating || 0)}
                                </div>
                                <span className="text-gray-600">({product.rating || 0})</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <span className="text-3xl font-bold text-gray-900">{product.price} Rs</span>
                            {product.originalPrice && (
                                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                            )}
                        </div>

                        {product.category && (
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-600">Category:</span>
                                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                                    {product.category.name}
                                </span>
                            </div>
                        )}

                        {product.Type && (
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-600">Type:</span>
                                <span className="bg-blue-100 px-3 py-1 rounded-full text-sm font-medium text-blue-800">
                                    {product.Type.name}
                                </span>
                            </div>
                        )}

                        {product.description && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {product.ingredients && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ingredients</h3>
                                <p className="text-gray-600 leading-relaxed">{product.ingredients}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            {product.size && (
                                <div>
                                    <span className="text-gray-600">Size:</span>
                                    <span className="ml-2 font-medium text-gray-900">{product.size}</span>
                                </div>
                            )}

                            {product.brand && (
                                <div>
                                    <span className="text-gray-600">Brand:</span>
                                    <span className="ml-2 font-medium text-gray-900">{product.brand}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex space-x-4">    
                            <button
                                onClick={() => {
                                    const message = encodeURIComponent(
                                        `Hi House of Ouds! I'm interested in ordering:\n\n*${product.title}*\nPrice: ${product.price} Rs\n\nPlease let me know the details.`
                                    );
                                    window.open(`https://wa.me/923480007566?text=${message}`, '_blank');
                                }}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors w-64 flex items-center justify-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span>Order on WhatsApp</span>
                            </button>

                        </div>

                        {product.inStock !== undefined && (
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.inStock
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Detailed Description Section */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="border-b border-gray-200 mb-8">
                        <div className="flex space-x-8">
                            <button
                                className={`pb-4 border-b-2 font-medium transition-colors ${activeTab === 'description'
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                onClick={() => setActiveTab('description')}
                            >
                                Description
                            </button>
                            <button
                                className={`pb-4 border-b-2 font-medium transition-colors ${activeTab === 'notes'
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                onClick={() => setActiveTab('notes')}
                            >
                                Fragrance Notes
                            </button>
                            <button
                                className={`pb-4 border-b-2 font-medium transition-colors ${activeTab === 'reviews'
                                    ? 'border-gray-900 text-gray-900'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Reviews {reviews.length > 0 && `(${reviews.length})`}
                            </button>

                        </div>
                    </div>

                    <div className="tab-content">
                        {/* Description Tab */}
                        {activeTab === 'description' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {product.description || `Discover the captivating essence of ${product.title}, a masterfully crafted fragrance that embodies sophistication and elegance. This exquisite scent opens with vibrant top notes that immediately capture attention, followed by a heart of luxurious floral and aromatic accords that create depth and character.`}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-4">Product Highlights</h4>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Long-lasting Eau de Parfum concentration
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Premium quality ingredients sourced globally
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Suitable for both day and evening wear
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Elegant packaging perfect for gifting
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            Cruelty-free and ethically sourced
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-xl font-semibold text-gray-900 mb-3">Fragrance Family</h4>
                                    <p className="text-gray-600">{product.category?.name || 'Luxury Collection'} - A sophisticated blend that appeals to discerning fragrance enthusiasts.</p>
                                </div>
                            </div>
                        )}

                        {/* Fragrance Notes Tab */}
                        {activeTab === 'notes' && (
                            <div className="space-y-8">
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Fragrance Composition</h3>

                                {product.notes && product.notes.length > 0 ? (
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Fragrance Notes</h4>
                                            <div className="space-y-3">
                                                {product.notes.map((note, index) => {
                                                    // Calculate width percentage based on position
                                                    // First note: 100%, gradually decrease to last note
                                                    const totalNotes = product.notes.length;
                                                    const widthPercent = 100 - (index * (70 / totalNotes));
                                                    
                                                    return (
                                                        <div key={index} className="flex flex-col gap-1">
                                                            <div
                                                                className="h-10 rounded-lg flex items-center px-4 transition-transform hover:scale-105 origin-left"
                                                                style={{
                                                                    backgroundColor: note.color || '#E0E0E0',
                                                                    width: `${widthPercent}%`
                                                                }}
                                                            >
                                                                <span className="text-gray-800 font-medium text-sm">{note.name}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <h4 className="text-xl font-semibold text-gray-900 mb-3">Fragrance Notes</h4>
                                        <p className="text-gray-600">Detailed fragrance notes for this product will be available soon.</p>
                                    </div>
                                )}
                            </div>
                        )}


                        {/* Reviews Tab */}
                        {activeTab === 'reviews' && (
                            <div className="space-y-10">
                                <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>

                                {/* Approved reviews list */}
                                {reviewsLoading ? (
                                    <div className="flex justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                    </div>
                                ) : reviews.length === 0 ? (
                                    <p className="text-gray-500 italic">No reviews yet. Be the first to share your thoughts!</p>
                                ) : (
                                    <div className="space-y-6">
                                        {reviews.map((review) => (
                                            <div key={review._id} className="border border-gray-100 rounded-lg p-5 bg-gray-50">
                                                <div className="flex items-center justify-between mb-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-700 text-sm">
                                                            {review.reviewerName.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-gray-900 text-sm">{review.reviewerName}</p>
                                                            <p className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        {[1,2,3,4,5].map(s => (
                                                            <span key={s} className={s <= review.rating ? 'text-amber-400' : 'text-gray-300'}>★</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 text-sm leading-relaxed mt-2">{review.comment}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Divider */}
                                <hr className="border-gray-200" />

                                {/* Submit review form */}
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-900 mb-1">Write a Review</h4>
                                    <p className="text-sm text-gray-500 mb-5">
                                        Your review will be sent to our customer support team and published after approval.
                                    </p>

                                    {reviewSubmitMsg && (
                                        <div className={`mb-4 px-4 py-3 rounded-lg text-sm font-medium ${
                                            reviewSubmitMsg.type === 'success'
                                                ? 'bg-green-50 text-green-800 border border-green-200'
                                                : 'bg-red-50 text-red-800 border border-red-200'
                                        }`}>
                                            {reviewSubmitMsg.type === 'success' ? '✓ ' : '✗ '}{reviewSubmitMsg.text}
                                        </div>
                                    )}

                                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={reviewForm.reviewerName}
                                                    onChange={e => setReviewForm(f => ({ ...f, reviewerName: e.target.value }))}
                                                    placeholder="e.g. Ahmed K."
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                                <div className="flex items-center gap-1 mt-1">
                                                    {[1,2,3,4,5].map(star => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setReviewForm(f => ({ ...f, rating: star }))}
                                                            className={`text-2xl transition-colors ${
                                                                star <= reviewForm.rating ? 'text-amber-400' : 'text-gray-300 hover:text-amber-300'
                                                            }`}
                                                        >
                                                            ★
                                                        </button>
                                                    ))}
                                                    <span className="text-sm text-gray-500 ml-2">{reviewForm.rating}/5</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                                            <textarea
                                                required
                                                value={reviewForm.comment}
                                                onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                                                rows={4}
                                                placeholder="Share your experience with this fragrance..."
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                                            />
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <button
                                                type="submit"
                                                disabled={reviewSubmitting}
                                                className="bg-gray-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                                            </button>
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                </svg>
                                                Reviews are reviewed by our team before being published.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;