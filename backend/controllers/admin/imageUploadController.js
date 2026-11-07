const multer = require('multer');
const mongoose = require('mongoose');
const Image = require('../../models/image');
const Product = require('../../models/product');

const MAX_SIZE_MB = 5;
const ALLOWED_MIMES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

// Keep the file in memory; it is stored in MongoDB, not on disk
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (ALLOWED_MIMES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'), false);
        }
    },
    limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
});

// Runs multer and turns its errors (too large, wrong type) into JSON responses
const handleUpload = (req, res, next) => {
    upload.single('image')(req, res, (err) => {
        if (!err) return next();
        const message = err.code === 'LIMIT_FILE_SIZE'
            ? `Image is too large. Maximum size is ${MAX_SIZE_MB}MB.`
            : err.message;
        res.status(400).json({ data: null, message });
    });
};

// Public URL an uploaded image is served from
const imageUrlFor = (req, id) => `${req.protocol}://${req.get('host')}/api/images/${id}`;

// The image id in a picture URL, if it points at an uploaded image
const uploadedImageId = (picture) => {
    const match = /\/api\/images\/([a-f0-9]{24})$/.exec(picture || '');
    return match ? match[1] : null;
};

// Removes an uploaded image once no product uses it any more
const deleteUploadedImageIfUnused = async (picture) => {
    const id = uploadedImageId(picture);
    if (!id) return;
    const stillUsed = await Product.exists({ picture: { $regex: `/api/images/${id}$` } });
    if (!stillUsed) await Image.findByIdAndDelete(id);
};

// Upload single image endpoint
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                data: null,
                message: 'No image file provided'
            });
        }

        const image = await Image.create({
            data: req.file.buffer,
            contentType: req.file.mimetype,
            originalName: req.file.originalname,
            size: req.file.size,
        });

        res.status(200).json({
            data: {
                id: image._id,
                imageUrl: imageUrlFor(req, image._id),
                originalName: image.originalName,
                size: image.size
            },
            message: 'Image uploaded successfully'
        });

    } catch (error) {
        console.error('Image upload error:', error);
        res.status(500).json({
            data: null,
            message: 'Error uploading image'
        });
    }
};

// Serve an uploaded image (public)
const getImage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ data: null, message: 'Image not found' });
        }

        const image = await Image.findById(id);
        if (!image) {
            return res.status(404).json({ data: null, message: 'Image not found' });
        }

        // An id always refers to the same image, so browsers can cache it for good
        res.set({
            'Content-Type': image.contentType,
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Cross-Origin-Resource-Policy': 'cross-origin',
        });
        res.send(image.data);
    } catch (error) {
        res.status(500).json({ data: null, message: 'Error loading image' });
    }
};

// Delete image endpoint
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = mongoose.isValidObjectId(id) && await Image.findByIdAndDelete(id);

        if (image) {
            res.status(200).json({
                data: null,
                message: 'Image deleted successfully'
            });
        } else {
            res.status(404).json({
                data: null,
                message: 'Image not found'
            });
        }

    } catch (error) {
        res.status(500).json({
            data: null,
            message: 'Error deleting image'
        });
    }
};

module.exports = {
    handleUpload,
    uploadImage,
    getImage,
    deleteImage,
    deleteUploadedImageIfUnused
};
