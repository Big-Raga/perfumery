const mongoose = require('mongoose');

// Images uploaded from the admin panel. They live in the database rather than on
// disk because Render's filesystem is wiped on every deploy/restart.
const imageSchema = new mongoose.Schema({
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    originalName: String,
    size: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Image', imageSchema);
