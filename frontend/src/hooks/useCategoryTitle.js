import { useMemo } from 'react';

const categoryTitles = {
    featured: 'Featured Products',
    men: "Men's Collection",
    women: "Women's Collection",
    unisex: 'Unisex Collection',
    luxury: 'Luxury Collection',
    fresh: 'Fresh & Citrus',
    oriental: 'Oriental & Spicy',
    all: 'Our Products'
};

const useCategoryTitle = (category) => {
    return useMemo(() => {
        return categoryTitles[category] || 'Our Products';
    }, [category]);
};

export default useCategoryTitle;