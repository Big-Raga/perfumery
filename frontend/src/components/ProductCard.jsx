import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useStarRating from '../hooks/useStarRating.jsx';

const ProductCard = ({ product, index = 0 }) => {
    const { renderStars } = useStarRating();
    const navigate = useNavigate();

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, delay: index * 0.1 }
        }
    };

    const handleViewDetails = () => {
        navigate(`/product/${product._id}`);
    };

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
        >
            <div>
                <div className="relative overflow-hidden">
                    <img
                        src={product.picture}
                        alt={product.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Wishlist Button */}
                    <button
                        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                        onClick={(e) => e.preventDefault()}
                        aria-label="Add to wishlist"
                    >
                        <svg className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>

                <div className="p-6">
                    {/* Category and Type */}
                    <div className="flex items-center gap-2 mb-2">
                        {product.category && (
                            <span className="text-xs text-amber-600 uppercase tracking-wide font-medium">
                                {product.category.name}
                            </span>
                        )}
                        {product.Type && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                {product.Type.name}
                            </span>
                        )}
                    </div>

                    {/* Product Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.title}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                            {renderStars(product.rating)}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                            ({product.rating || 0})
                        </span>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                            {product.price} Rs
                        </span>
                        <button
                            className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                            onClick={handleViewDetails}
                        >
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;