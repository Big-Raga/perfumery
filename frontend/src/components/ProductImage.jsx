import React, { useState, useEffect } from 'react';
import { PLACEHOLDER_PICTURE, isPlaceholderPicture } from '../utils/catalog';

// Product photo that falls back to the white logo on black when the product has
// no photo yet or its photo fails to load.
const ProductImage = ({ src, alt, className = '', photoClassName = 'object-cover', placeholderClassName = 'object-contain bg-black p-10', ...props }) => {
    const [failed, setFailed] = useState(false);
    useEffect(() => setFailed(false), [src]);

    const placeholder = failed || isPlaceholderPicture(src);
    return (
        <img
            src={placeholder ? PLACEHOLDER_PICTURE : src}
            alt={alt}
            className={`${className} ${placeholder ? placeholderClassName : photoClassName}`}
            onError={() => setFailed(true)}
            {...props}
        />
    );
};

export default ProductImage;
