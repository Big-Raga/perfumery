const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    title: { type: String, required: true },
    description: String,
    picture: { type: String, required: true },
    rating: { type: Number, default: 0 },
    price: { type: Number, required: true },
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
