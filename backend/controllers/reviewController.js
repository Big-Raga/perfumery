const Review = require('../models/review');
const Product = require('../models/product');

// PUBLIC: Submit a new review (goes into 'pending' state)
const submitReview = async (req, res) => {
    const { productId } = req.params;
    const { reviewerName, rating, comment } = req.body;

    if (!reviewerName || !rating || !comment) {
        return res.status(400).json({ message: 'Name, rating, and comment are required.' });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        const review = new Review({
            product: productId,
            reviewerName: reviewerName.trim(),
            rating: Number(rating),
            comment: comment.trim(),
            status: 'pending',
        });

        await review.save();
        res.status(201).json({ message: 'Thank you! Your review has been submitted and will be visible after approval by our team.' });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// PUBLIC: Get only approved reviews for a product
const getApprovedReviews = async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await Review.find({ product: productId, status: 'approved' })
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// ADMIN: Get all reviews (all statuses), optionally filter by status
const getAllReviewsAdmin = async (req, res) => {
    const { status } = req.query; // optional: ?status=pending
    try {
        const filter = status ? { status } : {};
        const reviews = await Review.find(filter)
            .populate('product', 'title picture')
            .sort({ createdAt: -1 });
        res.json({ data: reviews, message: 'Reviews fetched successfully.' });
    } catch (error) {
        console.error('Error fetching reviews (admin):', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// ADMIN: Approve a review
const approveReview = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findByIdAndUpdate(
            reviewId,
            { status: 'approved' },
            { new: true }
        ).populate('product', 'title');
        if (!review) return res.status(404).json({ message: 'Review not found.' });
        res.json({ data: review, message: 'Review approved.' });
    } catch (error) {
        console.error('Error approving review:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// ADMIN: Reject a review
const rejectReview = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findByIdAndUpdate(
            reviewId,
            { status: 'rejected' },
            { new: true }
        ).populate('product', 'title');
        if (!review) return res.status(404).json({ message: 'Review not found.' });
        res.json({ data: review, message: 'Review rejected.' });
    } catch (error) {
        console.error('Error rejecting review:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

// ADMIN: Delete a review
const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) return res.status(404).json({ message: 'Review not found.' });
        res.json({ message: 'Review deleted.' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = {
    submitReview,
    getApprovedReviews,
    getAllReviewsAdmin,
    approveReview,
    rejectReview,
    deleteReview,
};
