const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/authMiddleware');
const { handleUpload, uploadImage, getImage, deleteImage } = require('../controllers/admin/imageUploadController');

// Upload single image (protected)
router.post('/upload', AuthMiddleware, handleUpload, uploadImage);

// Serve an uploaded image (public, used as the product picture URL)
router.get('/:id', getImage);

// Delete image (protected)
router.delete('/:id', AuthMiddleware, deleteImage);

module.exports = router;
