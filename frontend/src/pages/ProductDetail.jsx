import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/productAPI';
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
                            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors w-64">
                               Order Now!
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


                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;