import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { collectionLinks } from "../utils/catalog";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "../utils/contact";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileSearchQuery, setMobileSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const navigationItems = [
        { name: 'Home', path: '/', hasDropdown: false },
        {
            name: 'Products',
            path: '/products',
            hasDropdown: true,
            dropdownItems: collectionLinks
        },
        { name: 'Contact', path: '/contact', hasDropdown: false },
    ];

    // Desktop bar shows the main collections as their own links
    const desktopNavItems = [
        { name: 'Home', path: '/' },
        { name: 'Shop', path: '/products', hasDropdown: true, dropdownItems: collectionLinks },
        { name: 'Featured', path: '/products/featured' },
        { name: 'Perfumes', path: '/products/perfume' },
        { name: 'Classic', path: '/products/perfume/classic' },
        { name: 'Premium', path: '/products/perfume/premium' },
        { name: 'Oud', path: '/products/oud' },
        { name: 'Contact', path: '/contact' },
    ];

    const navLinkClass = 'relative group flex items-center h-full text-xs lg:text-sm font-semibold uppercase tracking-wider lg:tracking-[0.2em] hover:text-white transition-colors leading-none';

    const isExactActive = (path) => location.pathname === path;

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    // Search handlers
    const handleDesktopSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const handleMobileSearch = (e) => {
        e.preventDefault();
        if (mobileSearchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(mobileSearchQuery.trim())}`);
            setMobileSearchQuery('');
            setIsMobileMenuOpen(false);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleMobileSearchInputChange = (e) => {
        setMobileSearchQuery(e.target.value);
    };

    return (
        <>
            {/* Navigation */}
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md shadow-lg border-b border-white/20"
            >
                {/* Top Row - Logo, Search and Socials */}
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        <motion.div whileHover={{ scale: 1.03 }}>
                            <Link to="/" className="flex items-center">
                                <img src="/logo_white.png" alt="House of Oud by Al-Jabbal" className="h-11 md:h-14 w-auto" />
                            </Link>
                        </motion.div>

                        <div className="flex items-center space-x-5">
                            {/* Search Bar */}
                            <form onSubmit={handleDesktopSearch} className="relative hidden md:block">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchInputChange}
                                    placeholder="Search products..."
                                    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 pr-10 text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/20 transition-all w-56 lg:w-72"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </form>

                            {/* Social Links */}
                            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                className="hidden md:block text-white hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                    <rect x="3" y="3" width="18" height="18" rx="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                                </svg>
                            </a>
                            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                                className="hidden md:block text-white hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.5h-.01a9.43 9.43 0 01-4.8-1.32l-.35-.2-3.57.93.95-3.48-.22-.36a9.42 9.42 0 01-1.45-5.03c0-5.2 4.24-9.44 9.46-9.44 2.52 0 4.9.99 6.68 2.77a9.38 9.38 0 012.76 6.68c0 5.21-4.24 9.45-9.45 9.45zm8.04-17.5A11.3 11.3 0 0012.04.68C5.77.68.66 5.78.66 12.05c0 2 .52 3.96 1.52 5.69L.57 23.68l6.08-1.6a11.36 11.36 0 005.39 1.38h.01c6.27 0 11.38-5.1 11.38-11.38 0-3.04-1.18-5.9-3.33-8.04z" />
                                </svg>
                            </a>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 text-white hover:text-white transition-colors cursor-pointer"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Bottom Row - Desktop Navigation */}
                <div className="hidden md:block border-t border-white/10">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center space-x-5 lg:space-x-10">
                            {desktopNavItems.map((item, index) => (
                                <div
                                    key={item.name}
                                    className="relative flex items-center h-12"
                                    onMouseEnter={() => item.hasDropdown && setIsProductsDropdownOpen(true)}
                                    onMouseLeave={() => item.hasDropdown && setIsProductsDropdownOpen(false)}
                                >
                                    {item.hasDropdown ? (
                                        <motion.button
                                            className={`${navLinkClass} flex items-center space-x-1 cursor-pointer ${isActive(item.path) ? 'text-white' : 'text-white/70'}`}
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <span>{item.name}</span>
                                            <svg className="w-3.5 h-3.5 transition-transform duration-200"
                                                style={{ transform: isProductsDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </motion.button>
                                    ) : (
                                        <Link to={item.path} className="flex items-center h-full">
                                            <motion.span
                                                className={`${navLinkClass} ${isExactActive(item.path) ? 'text-white' : 'text-white/70'}`}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                {item.name}
                                                <span className={`absolute bottom-3 left-0 h-px bg-white transition-all duration-300 ${isExactActive(item.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                            </motion.span>
                                        </Link>
                                    )}

                                    {/* Dropdown Menu */}
                                    {item.hasDropdown && (
                                        <AnimatePresence>
                                            {isProductsDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-0 w-56 bg-black/95 backdrop-blur-md rounded-lg shadow-2xl border border-white/20 z-50"
                                                >
                                                    <div className="py-2">
                                                        {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                                                            <Link
                                                                key={dropdownItem.name}
                                                                to={dropdownItem.path}
                                                                className={`block py-3 text-white hover:text-white hover:bg-neutral-1000/10 transition-colors ${dropdownItem.indent ? 'pl-8 pr-4 text-sm' : 'px-4'}`}
                                                                onClick={() => setIsProductsDropdownOpen(false)}
                                                            >
                                                                <motion.div
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: dropdownIndex * 0.05 }}
                                                                    className="flex items-center space-x-2"
                                                                >
                                                                    <span className="text-white">•</span>
                                                                    <span>{dropdownItem.name}</span>
                                                                </motion.div>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed top-0 right-0 w-80 h-full bg-black/95 backdrop-blur-md z-50 md:hidden"
                    >
                        <div className="p-6 pt-20">
                            {/* Mobile Search */}
                            <div className="mb-6">
                                <form onSubmit={handleMobileSearch} className="relative">
                                    <input
                                        type="text"
                                        value={mobileSearchQuery}
                                        onChange={handleMobileSearchInputChange}
                                        placeholder="Search products..."
                                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-3 pr-10 text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </button>
                                </form>
                            </div>

                            <div className="flex flex-col space-y-6">
                                {navigationItems.map((item, index) => (
                                    <div key={item.name}>
                                        {item.hasDropdown ? (
                                            <div className="space-y-3">
                                                <motion.span
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    className="text-white font-medium text-xl border-b border-gray-700 pb-4 block"
                                                >
                                                    {item.name}
                                                </motion.span>
                                                <div className="pl-4 space-y-2">
                                                    {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                                                        <Link
                                                            key={dropdownItem.name}
                                                            to={dropdownItem.path}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className={`block text-white/80 hover:text-white transition-colors py-2 ${dropdownItem.indent ? 'pl-4 text-sm' : ''}`}
                                                        >
                                                            <motion.div
                                                                initial={{ opacity: 0, x: 30 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: (index * 0.1) + (dropdownIndex * 0.05) }}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <span className="text-white text-sm">•</span>
                                                                <span>{dropdownItem.name}</span>
                                                            </motion.div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                to={item.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={`block text-white hover:text-white font-medium text-xl transition-colors border-b border-gray-700 pb-4 ${isActive(item.path) ? 'text-white' : ''
                                                    }`}
                                            >
                                                <motion.span
                                                    initial={{ opacity: 0, x: 50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                >
                                                    {item.name}
                                                </motion.span>
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
