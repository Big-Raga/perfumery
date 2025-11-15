import { useCallback } from 'react';

const useStarRating = () => {
    const renderStars = useCallback((rating) => {
        const stars = [];
        const fullStars = Math.floor(rating || 0);
        const hasHalfStar = (rating || 0) % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} className="text-amber-400">★</span>);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<span key={i} className="text-amber-400">★</span>);
            } else {
                stars.push(<span key={i} className="text-gray-300">☆</span>);
            }
        }
        return stars;
    }, []);

    return { renderStars };
};

export default useStarRating;