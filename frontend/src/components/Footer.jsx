import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const collectionLinks = [
        { name: 'Men', path: '/products/men' },
        { name: 'Women', path: '/products/women' },
        { name: 'Unisex', path: '/products/unisex' },
        { name: 'Luxury', path: '/products/luxury'},
        { name: 'Featured', path: '/products/featured' }
    ];

    const companyLinks = [
        { name: 'About Us', path: '#' },
        { name: 'Our Story', path: '#' },
    ];

    const supportLinks = [
        { name: 'Contact', path: '#' },
        { name: 'FAQ', path: '#' },
    ];

    return (
        <footer className="bg-gray-900 text-white py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
                    {/* Logo and Description */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="md:col-span-1"
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <img src="/logo.svg" alt="House of Oud" className="h-6 md:h-8 w-6 md:w-8" />
                            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                                House of Oud
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm md:text-base">
                            Crafting exceptional fragrances since 2013.
                        </p>
                    </motion.div>

                    {/* Collections - 2 Columns */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="md:col-span-1"
                    >
                        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Collections</h3>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 md:gap-y-2">
                            {collectionLinks.map((item) => (
                                <div key={item.name}>
                                    <Link 
                                        to={item.path} 
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-xs md:text-sm whitespace-nowrap"
                                    >
                                        {item.name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Company */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="md:col-span-1"
                    >
                        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Company</h3>
                        <ul className="space-y-1.5 md:space-y-2">
                            {companyLinks.map((item) => (
                                <li key={item.name}>
                                    <Link 
                                        to={item.path} 
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="md:col-span-1"
                    >
                        <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Support</h3>
                        <ul className="space-y-1.5 md:space-y-2">
                            {supportLinks.map((item) => (
                                <li key={item.name}>
                                    <Link 
                                        to={item.path} 
                                        className="text-gray-400 hover:text-amber-400 transition-colors text-sm md:text-base"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <div className="border-t border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400">
                    <p className="text-sm md:text-base">&copy; 2025 House of Oud. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
