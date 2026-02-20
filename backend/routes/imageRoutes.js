const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/authMiddleware');
const { upload, uploadImage, deleteImage } = require('../controllers/admin/imageUploadController');

// Upload single image (protected)
router.post('/upload', AuthMiddleware, upload.single('image'), uploadImage);

// Delete image (protected)
router.delete('/:filename', AuthMiddleware, deleteImage);

module.exports = router;