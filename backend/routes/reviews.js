const express = require('express');
const router = express.Router();
const { getReviews, addReview, updateReview, deleteReview } = require('../controllers/reviewController');
const { verifyToken } = require('../utils/auth');

// Get all reviews for a product
router.get('/:productId', getReviews);

// Add a review for a product
router.post('/:productId', verifyToken, addReview);

// Update an existing review
router.put('/:reviewId', verifyToken, updateReview);

// Delete a review
router.delete('/:reviewId', verifyToken, deleteReview);

module.exports = router;
