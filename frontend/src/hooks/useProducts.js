import { useState, useEffect, useMemo } from 'react';
import { getAllProducts, getFeaturedProducts } from '../api/productAPI';
import { matchesFilter } from '../utils/catalog';

const useProducts = (filter = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    // Fetch products effect
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const productData = filter.featured
                    ? await getFeaturedProducts()
                    : await getAllProducts();

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
    }, [filter.featured, reloadKey]);

    // Memoized filtered products for performance
    const filteredProducts = useMemo(
        () => products.filter(product => matchesFilter(product, filter)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [products, filter.featured, filter.productLine, filter.range, filter.gender, filter.invalid]
    );

    return {
        products: filteredProducts,
        allProducts: products,
        loading,
        error,
        refetch: () => setReloadKey(key => key + 1)
    };
};

export default useProducts;
