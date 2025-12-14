const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
});

/*
EXISTING CATEGORIES IN DATABASE:
1. "Men's Fragrances" - Sophisticated and masculine scents for the modern man
2. "Women's Fragrances" - Elegant and captivating perfumes for women
3. "Unisex Fragrances" - Versatile scents that transcend gender boundaries
4. "Luxury Collection" - Premium and exclusive fragrances from top designers
5. "Fresh & Citrus" - Light, refreshing scents perfect for everyday wear
6. "Oriental & Spicy" - Rich, warm fragrances with exotic spices and woods
7. "mens" - Men's category (lowercase)
8. "womens" - Women's category (lowercase)
*/

module.exports = mongoose.model('Category', categorySchema);
