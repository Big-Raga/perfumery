import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ count = 8 }) => {
    const skeletonVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            variants={skeletonVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
            {Array.from({ length: count }).map((_, index) => (
                <motion.div
                    key={index}
                    variants={itemVariants}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
                >
                    <div className="w-full h-64 bg-gray-200"></div>
                    <div className="p-6">
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="flex justify-between items-center">
                            <div className="h-8 bg-gray-200 rounded w-20"></div>
                            <div className="h-8 bg-gray-200 rounded w-24"></div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
};

export default LoadingSkeleton;