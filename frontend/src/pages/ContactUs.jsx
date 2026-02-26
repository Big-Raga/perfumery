import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WHATSAPP_NUMBER = '923480007566';
const WHATSAPP_QR_LINK = 'https://wa.me/qr/UP4PS6AIEGBTC1';
const INSTAGRAM_URL = 'https://www.instagram.com/houseofouds_aj/';

const ContactUs = () => {
    const handleWhatsAppClick = () => {
        const message = encodeURIComponent('Hi House of Ouds! I have an inquiry.');
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
            <Navbar />
            <div className="pt-24 md:pt-28 pb-16">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent"
                        >
                            Get in Touch
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
                        >
                            We&apos;d love to hear from you. Reach out to us through WhatsApp or Instagram for inquiries, orders, or just to say hello.
                        </motion.p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 -mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* WhatsApp Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full"
                        >
                            <div className="bg-green-500 p-6 text-center">
                                <svg className="w-12 h-12 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <h2 className="text-2xl font-bold text-white mt-3">WhatsApp</h2>
                            </div>
                            <div className="p-6 text-center flex flex-col flex-1">
                                <div className="mb-6 flex-1">
                                    <a href={WHATSAPP_QR_LINK} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src="/whatsapp.jpg"
                                            alt="Scan to connect on WhatsApp"
                                            className="w-56 h-56 mx-auto rounded-xl object-contain hover:opacity-90 transition-opacity cursor-pointer"
                                        />
                                    </a>
                                    <p className="text-gray-500 text-sm mt-2">Scan with your phone or <a href={WHATSAPP_QR_LINK} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">click here</a> to add us</p>
                                </div>
                                <div className="mb-6">
                                    <p className="text-gray-600 text-sm mb-1">Call or message us at</p>
                                    <a
                                        href="tel:+923480007566"
                                        className="text-2xl font-bold text-gray-900 hover:text-green-600 transition-colors"
                                    >
                                        +92 348 0007566
                                    </a>
                                </div>
                                <button
                                    onClick={handleWhatsAppClick}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    <span>Chat on WhatsApp</span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Instagram Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full"
                        >
                            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-6 text-center">
                                <svg className="w-12 h-12 mx-auto text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                </svg>
                                <h2 className="text-2xl font-bold text-white mt-3">Instagram</h2>
                            </div>
                            <div className="p-6 text-center flex flex-col flex-1">
                                <div className="mb-6 flex-1">
                                    <div className="w-56 h-56 mx-auto rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col items-center justify-center">
                                        <svg className="w-20 h-20 text-pink-400 mb-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                        </svg>
                                        <span className="text-gray-700 font-semibold text-lg">@houseofouds_aj</span>
                                        <span className="text-gray-500 text-sm mt-1">Follow us for updates</span>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <p className="text-gray-600 text-sm mb-1">Follow us on Instagram</p>
                                    <p className="text-xl font-bold text-gray-900">@houseofouds_aj</p>
                                </div>
                                <a
                                    href={INSTAGRAM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white font-semibold py-3 px-6 rounded-xl transition-all cursor-pointer"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                    <span>Visit our Instagram</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 bg-white rounded-2xl shadow-xl p-8 text-center"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">How to Order</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                            We currently take orders through WhatsApp and Instagram. Simply browse our collection, find a fragrance you love, and reach out to us!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col items-center p-4">
                                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-2xl font-bold text-amber-600">1</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">Browse</h4>
                                <p className="text-gray-500 text-sm">Explore our perfume collection and find your signature scent</p>
                            </div>
                            <div className="flex flex-col items-center p-4">
                                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-2xl font-bold text-amber-600">2</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">Reach Out</h4>
                                <p className="text-gray-500 text-sm">Message us on WhatsApp or Instagram with your order</p>
                            </div>
                            <div className="flex flex-col items-center p-4">
                                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-2xl font-bold text-amber-600">3</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-1">Receive</h4>
                                <p className="text-gray-500 text-sm">We&apos;ll confirm your order and deliver it to your doorstep</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;
