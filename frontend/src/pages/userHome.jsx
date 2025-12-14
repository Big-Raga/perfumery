import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useFeaturedProducts } from "../hooks/productHooks";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";

const UserHome = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const { data, isLoading, isError } = useFeaturedProducts();

    const featuredProducts = data;

    const heroSlides = [
        {
            title: "Authentic Oud",
            subtitle: "Discover our signature collection",
            image: "/hero.jpg"
        },
        {
            title: "Luxury Fragrances",
            subtitle: "Experience elegance and sophistication",
            image: "/background2.png"
        }
    ];
    // set slideshow
    useEffect(() => {
        setIsLoaded(true);
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // change later once backend established

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    const floatAnimation = {
        y: [0, -10, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            <Navbar />
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
                    />
                </AnimatePresence>

                <div className="relative z-20 text-center text-white px-4 md:px-6 max-w-6xl">
                    <motion.h1
                        key={`title-${currentSlide}`}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent"
                    >
                        {heroSlides[currentSlide].title}
                    </motion.h1>

                    <motion.p
                        key={`subtitle-${currentSlide}`}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-gray-200"
                    >
                        {heroSlides[currentSlide].subtitle}
                    </motion.p>

                    <motion.button
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-2xl hover:shadow-amber-500/25 transition-all"
                    >
                        Explore Collection
                    </motion.button>
                </div>

                {/* Slide Indicators - Hidden on small screens */}
                {heroSlides.length > 1 && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
                        {heroSlides.map((_, index) => (
                            <motion.button
                                key={index}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-amber-400' : 'bg-white/50'
                                    }`}
                                whileHover={{ scale: 1.2 }}
                                onClick={() => setCurrentSlide(index)}
                            />
                        ))}
                    </div>
                )}

                {/* Floating Elements - Hidden on mobile */}
                <motion.div
                    animate={floatAnimation}
                    className="hidden lg:block absolute top-1/4 left-10 text-amber-300/30"
                >
                    <svg className="w-8 lg:w-12 h-8 lg:h-12" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </motion.div>

                <motion.div
                    animate={{ ...floatAnimation, transition: { ...floatAnimation.transition, delay: 1 } }}
                    className="hidden lg:block absolute top-1/3 right-16 text-yellow-300/30"
                >
                    <svg className="w-6 lg:w-8 h-6 lg:h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </motion.div>
            </section>

            {/* Featured Products */}
            <section className="py-12 md:py-20 px-4 md:px-6">
                <div className="container mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <motion.h2
                            variants={itemVariants}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
                        >
                            Featured Collection
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4"
                        >
                            Handcrafted fragrances that tell your unique story
                        </motion.p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        // initial="hidden"
                        // whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    >
                        {isLoading ? (
                            // Loading skeleton
                            Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                                    <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-200"></div>
                                    <div className="p-4 md:p-6">
                                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                                        <div className="flex justify-between items-center">
                                            <div className="h-8 bg-gray-200 rounded w-20"></div>
                                            <div className="h-8 bg-gray-200 rounded w-24"></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : isError ? (
                            <div className="col-span-full text-center py-12">
                                <p className="text-red-500 text-lg">Error loading products. Please try again later.</p>
                            </div>
                        ) : featuredProducts && featuredProducts.length > 0 ? (
                            featuredProducts.map((product, index) => (
                                <ProductCard key={product._id || product.id || index} product={product} index={index} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-gray-500 text-lg">No products available.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-12 md:py-20 bg-gradient-to-r from-amber-100 to-yellow-100">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                                Our Story
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                                For over a decade, we've been crafting exceptional fragrances that capture the essence of luxury and sophistication. Each bottle tells a story, each scent creates a memory.
                            </p>
                            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                                Our master perfumers blend the finest ingredients from around the world to create unique fragrances that celebrate individuality and elegance.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
                            >
                                Learn More
                            </motion.button>
                        </motion.div>

                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative order-1 lg:order-2"
                        >
                            <motion.img
                                animate={floatAnimation}
                                src="https://images.unsplash.com/photo-1709662217618-83586dc9b777?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Perfume crafting"
                                className="w-full h-64 sm:h-80 md:h-96 lg:h-auto rounded-2xl shadow-2xl object-cover"
                            />
                            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-4 md:p-6 rounded-2xl shadow-xl">
                                <div className="text-2xl md:text-3xl font-bold text-amber-600">10+</div>
                                <div className="text-sm md:text-base text-gray-600">Years of Excellence</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            {/* <section className="py-12 md:py-20 bg-gradient-to-r from-amber-600 to-yellow-600">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Stay in the Scent
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
                            Subscribe to our newsletter and be the first to discover new fragrances and exclusive offers
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 md:px-6 py-2.5 md:py-3  focus:bg-white focus:text-black rounded-full border-2 border-white outline-none text-white text-sm md:text-base"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-amber-600 px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section> */}

            <Footer />
        </div>
    );
};

export default UserHome;

