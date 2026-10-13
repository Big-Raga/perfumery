const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title: { type: String, required: true },
    description: String,
    // The designer fragrance this one is inspired by, e.g. "Aventus by Creed"
    impression: String,
    picture: { type: String, required: true },
    rating: { type: Number, default: 0 },
    price: { type: Number, required: true },
    // Catalogue structure: Perfume > Classic/Premium > Men/Women, and Oud
    productLine: { type: String, enum: ['perfume', 'oud', null], default: null },
    range: { type: String, enum: ['classic', 'premium', null], default: null },
    gender: { type: String, enum: ['men', 'women', null], default: null },
    // Legacy category ref, kept so older data/clients keep working
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    notes: [{
        name: String,
        color: String
    }],
    Type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
    stock: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
