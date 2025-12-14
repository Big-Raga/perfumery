import { useState, useEffect, useMemo } from 'react';
import { getAllProducts, getFeaturedProducts } from '../api/productAPI';

// Category matching logic extracted to pure function for better performance
const categoryMatchers = {
    men: (categoryName) =>
        /\bmen\b|\bmale\b|\bhomme\b|\bmasculine\b/i.test(categoryName) &&
        !/\bwomen\b|\bfemale\b|\bfemme\b|\bfeminine\b/i.test(categoryName),
    women: (categoryName) =>
        /\bwomen\b|\bfemale\b|\bfemme\b|\bfeminine\b/i.test(categoryName),
    unisex: (categoryName) =>
        /\bunisex\b|\bneutral\b|\bboth\b/i.test(categoryName),
    luxury: (categoryName) =>
        /\bluxury\b|\bpremium\b|\bexclusive\b|\bcollection\b/i.test(categoryName),
    fresh: (categoryName) =>
        /\bfresh\b|\bcitrus\b|\blight\b|\baqua\b/i.test(categoryName),
    oriental: (categoryName) =>
        /\boriental\b|\bspicy\b|\bwarm\b|\bexotic\b/i.test(categoryName),
    featured: (categoryName, product) =>
        product?.featured === true,
};

const useProducts = (category = 'all') => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products effect
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                let productData;
                if (category === 'featured') {
                    productData = await getFeaturedProducts();
                } else {
                    productData = await getAllProducts();
                }

                setProducts(productData || []);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again.');
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    // Memoized filtered products for performance
    const filteredProducts = useMemo(() => {
        if (!products.length || category === 'all') {
            return products;
        }

        const matcher = categoryMatchers[category];
        if (!matcher) {
            // Fallback for unknown categories
            return products.filter(product => {
                const productCategory = product.category?.name?.toLowerCase() || '';
                return productCategory.includes(category.toLowerCase()) ||
                    category.toLowerCase().includes(productCategory);
            });
        }

        return products.filter(product => {
            const productCategory = product.category?.name?.toLowerCase() || '';
            return matcher(productCategory, product);
        });
    }, [products, category]);

    return {
        products: filteredProducts,
        allProducts: products,
        loading,
        error,
        refetch: () => {
            setProducts([]);
            setLoading(true);
            setError(null);
        }
    };
};

export default useProducts;