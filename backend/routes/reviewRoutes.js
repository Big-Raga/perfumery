const express = require('express');
const Router = express.Router();
const { submitReview, getApprovedReviews } = require('../controllers/reviewController');

// Public routes
Router.post('/:productId/reviews', submitReview);
Router.get('/:productId/reviews', getApprovedReviews);

module.exports = Router;
