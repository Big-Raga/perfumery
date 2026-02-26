import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { ErrorState, EmptyState } from '../components/StateComponents';
import useSearch from '../hooks/useSearch';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('q') || '';
    const [searchInput, setSearchInput] = useState(query);
    const { results, loading, error } = useSearch(query);

    // Update input when URL query changes
    useEffect(() => {
        setSearchInput(query);
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
        }
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const getSearchSuggestions = () => {
        const suggestions = [
            'men perfume', 'women fragrance', 'unisex scent',
            'luxury perfume', 'fresh citrus', 'oriental spicy',
            'Tom Ford', 'Dior', 'Chanel', 'vanilla', 'oud', 'rose'
        ];
        return suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(searchInput.toLowerCase()) &&
            suggestion.toLowerCase() !== searchInput.toLowerCase()
        ).slice(0, 5);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Search Header */}
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                            Search Results
                        </h1>

                        {/* Search Form */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={handleInputChange}
                                    placeholder="Search for perfumes, brands, notes..."
                                    className="w-full px-6 py-4 pr-14 text-lg border-2 border-amber-200 rounded-full focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition-all"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 text-white p-3 rounded-full hover:bg-amber-600 transition-colors cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </form>

                            {/* Search Suggestions */}
                            {searchInput && getSearchSuggestions().length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                    <span className="text-sm text-gray-600">Try:</span>
                                    {getSearchSuggestions().map((suggestion, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                setSearchInput(suggestion);
                                                navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                                            }}
                                            className="text-sm bg-amber-100 text-amber-700 px-3 py-1 rounded-full hover:bg-amber-200 transition-colors cursor-pointer"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Query Display */}
                        {query && (
                            <p className="text-lg md:text-xl text-gray-600">
                                {loading ? 'Searching...' :
                                    error ? 'Search failed' :
                                        results.length > 0 ?
                                            `Found ${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"` :
                                            `No results found for "${query}"`
                                }
                            </p>
                        )}
                    </motion.div>

                    {/* Search Results */}
                    {!query ? (
                        <EmptyState message="Enter a search term to find products" />
                    ) : loading ? (
                        <LoadingSkeleton count={8} />
                    ) : error ? (
                        <ErrorState error={error} onRetry={() => window.location.reload()} />
                    ) : results.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center py-20"
                        >
                            <div className="text-gray-500 text-xl mb-4">No products found for "{query}"</div>
                            <div className="space-y-4">
                                <p className="text-gray-400">Try searching for:</p>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {['perfume', 'men', 'women', 'luxury', 'fresh', 'oriental'].map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => {
                                                setSearchInput(suggestion);
                                                navigate(`/search?q=${suggestion}`);
                                            }}
                                            className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full hover:bg-amber-200 transition-colors cursor-pointer"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {results.map((product, index) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    )}

                    {/* Quick Actions */}
                    {query && !loading && (
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-center mt-12"
                        >
                            <div className="flex flex-wrap gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/products')}
                                    className="bg-white text-amber-600 border border-amber-600 px-6 py-3 rounded-full font-semibold hover:bg-amber-50 transition-all cursor-pointer"
                                >
                                    Browse All Products
                                </button>
                                <button
                                    onClick={() => navigate('/products/featured')}
                                    className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all cursor-pointer"
                                >
                                    View Featured
                                </button>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;