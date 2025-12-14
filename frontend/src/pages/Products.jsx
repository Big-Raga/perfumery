import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { ErrorState, EmptyState } from '../components/StateComponents';
import useProducts from '../hooks/useProducts';
import useCategoryTitle from '../hooks/useCategoryTitle';
import Footer from '../components/Footer';

const Products = () => {
    const { category = 'all' } = useParams();
    const { products, loading, error, refetch } = useProducts(category);
    const categoryTitle = useCategoryTitle(category);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            <Navbar />

            <div className="pt-24 pb-12">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                            {categoryTitle}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                            Discover our carefully curated collection of premium fragrances, each crafted with the finest ingredients and traditional techniques.
                        </p>
                    </motion.div>

                    {/* Products Section */}
                    {loading ? (
                        <LoadingSkeleton count={8} />
                    ) : error ? (
                        <ErrorState error={error} onRetry={refetch} />
                    ) : products.length === 0 ? (
                        <EmptyState message="No products found in this collection" />
                    ) : (
                        <>
                            {/* Results Count */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-center mb-8"
                            >
                                <p className="text-gray-600">
                                    Showing {products.length} product{products.length !== 1 ? 's' : ''} in {categoryTitle}
                                </p>
                            </motion.div>

                            {/* Products Grid */}
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {products.map((product, index) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        index={index}
                                    />
                                ))}
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
            <div className="mt-16 md:mt-20"> 
                <Footer />      
            </div>
        </div>
    );
};

export default Products;