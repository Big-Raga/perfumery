import { useState, useEffect, useMemo } from 'react';
import { getAllProducts } from '../api/productAPI';

const useSearch = (query) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all products once
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const productData = await getAllProducts();
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
    }, []);

    // Memoized search results for performance
    const searchResults = useMemo(() => {
        if (!query || query.trim().length < 2) {
            return [];
        }

        const searchTerm = query.trim().toLowerCase();

        // Create regex pattern for flexible matching
        const searchRegex = new RegExp(searchTerm.split('').join('.*'), 'i');
        const exactRegex = new RegExp(`\\b${searchTerm}`, 'i');
        const partialRegex = new RegExp(searchTerm, 'i');

        return products.filter(product => {
            const title = product.title?.toLowerCase() || '';
            const description = product.description?.toLowerCase() || '';
            const category = product.category?.name?.toLowerCase() || '';
            const type = product.Type?.name?.toLowerCase() || '';

            // Search in notes if available
            const notes = [
                ...(product.notes?.top || []),
                ...(product.notes?.middle || []),
                ...(product.notes?.base || [])
            ].join(' ').toLowerCase();

            // Priority scoring for better results
            const fields = [
                { text: title, weight: 3 },
                { text: category, weight: 2 },
                { text: type, weight: 2 },
                { text: description, weight: 1 },
                { text: notes, weight: 1 }
            ];

            return fields.some(field => {
                return exactRegex.test(field.text) ||
                    partialRegex.test(field.text) ||
                    searchRegex.test(field.text);
            });
        }).sort((a, b) => {
            // Sort by relevance - exact title matches first
            const aTitle = a.title?.toLowerCase() || '';
            const bTitle = b.title?.toLowerCase() || '';

            const aExact = exactRegex.test(aTitle);
            const bExact = exactRegex.test(bTitle);

            if (aExact && !bExact) return -1;
            if (!aExact && bExact) return 1;

            // Then by title alphabetically
            return aTitle.localeCompare(bTitle);
        });
    }, [products, query]);

    return {
        results: searchResults,
        loading,
        error,
        totalProducts: products.length
    };
};

export default useSearch;