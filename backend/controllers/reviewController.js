const Review = require('../models/review');
const Product = require('../models/product');

// Get all reviews for a product
exports.getReviews = async (req, res) => {
    const { productId } = req.params;
    try {
        const reviews = await Review.find({ product: productId }).populate('user', 'name email');
        if (!reviews) {
            return res.status(404).json({ message: 'No reviews found for this product' });
        }
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve reviews', error: error.message });
    }
};

// Add a review for a product
exports.addReview = async (req, res) => {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const newReview = new Review({
            user: userId,
            product: productId,
            rating,
            comment,
        });

        await newReview.save();
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add review', error: error.message });
    }
};

// Update a review
exports.updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to update this review' });
        }

        review.rating = rating;
        review.comment = comment;
        await review.save();

        res.status(200).json({ message: 'Review updated successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update review', error: error.message });
    }
};

// Delete a review
exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    const userId = req.user._id;

    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this review' });
        }

        await review.remove();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error: error.message });
    }
};
