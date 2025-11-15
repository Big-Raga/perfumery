const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    base: [String],
    middle: [String],
    top: [String],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);