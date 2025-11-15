import React from 'react';
import { motion } from 'framer-motion';

const ErrorState = ({ error, onRetry }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
        >
            <div className="text-red-500 text-xl mb-4">⚠️ {error}</div>
            <button
                onClick={onRetry}
                className="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
            >
                Try Again
            </button>
        </motion.div>
    );
};

const EmptyState = ({ message = "No products found" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-20"
        >
            <div className="text-gray-500 text-xl mb-4">{message}</div>
            <p className="text-gray-400">Check back later for new products.</p>
        </motion.div>
    );
};

export { ErrorState, EmptyState };