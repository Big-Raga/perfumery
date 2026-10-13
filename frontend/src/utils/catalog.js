// Catalogue structure: Perfume > Classic/Premium > Men/Women, plus Oud and Featured.
// URLs: /products, /products/featured, /products/oud, /products/perfume,
//       /products/perfume/classic, /products/perfume/classic/men, ...

export const PRODUCT_LINES = { perfume: 'Perfume', oud: 'Oud' };
export const RANGES = { classic: 'Classic', premium: 'Premium' };
export const GENDERS = { men: 'Men', women: 'Women' };

// Navigation links shared by the navbar and footer
export const collectionLinks = [
    { name: 'All Products', path: '/products' },
    { name: 'Featured', path: '/products/featured' },
    { name: 'All Perfumes', path: '/products/perfume' },
    { name: 'Classic · Men', path: '/products/perfume/classic/men', indent: true },
    { name: 'Classic · Women', path: '/products/perfume/classic/women', indent: true },
    { name: 'Premium · Men', path: '/products/perfume/premium/men', indent: true },
    { name: 'Premium · Women', path: '/products/perfume/premium/women', indent: true },
    { name: 'Oud', path: '/products/oud' },
];

// Turns route params into a filter. Old links like /products/men still work.
export const getFilterFromParams = ({ line, range, gender }) => {
    if (!line) return {};
    if (line === 'featured') return { featured: true };
    if (GENDERS[line]) return { gender: line };
    if (!PRODUCT_LINES[line]) return { invalid: true };
    if (range && !RANGES[range]) return { invalid: true };
    if (gender && !GENDERS[gender]) return { invalid: true };
    return { productLine: line, range, gender };
};

export const matchesFilter = (product, filter) => {
    if (filter.invalid) return false;
    if (filter.featured && !product.featured) return false;
    if (filter.productLine && product.productLine !== filter.productLine) return false;
    if (filter.range && product.range !== filter.range) return false;
    if (filter.gender && product.gender !== filter.gender) return false;
    return true;
};

export const getFilterTitle = (filter) => {
    if (filter.invalid) return 'Collection Not Found';
    if (filter.featured) return 'Featured Collection';
    if (filter.productLine === 'oud') return 'Oud Collection';
    if (filter.productLine === 'perfume') {
        const parts = [filter.range && RANGES[filter.range], filter.gender && `${GENDERS[filter.gender]}'s`].filter(Boolean);
        return parts.length ? `${parts.join(' ')} Perfumes` : 'Perfume Collection';
    }
    if (filter.gender) return `${GENDERS[filter.gender]}'s Collection`;
    return 'Our Products';
};

// Short label for a product, e.g. "Perfume · Classic · Men" or "Oud"
export const getProductLabel = (product) => {
    if (!product?.productLine) return product?.category?.name || '';
    return [
        PRODUCT_LINES[product.productLine],
        RANGES[product.range],
        GENDERS[product.gender],
    ].filter(Boolean).join(' · ');
};

// Products without a real photo use the logo (set by the catalogue seeder)
export const PLACEHOLDER_PICTURE = '/logo.webp';
