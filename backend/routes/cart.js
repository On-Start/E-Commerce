const express = require('express');
const router = express.Router();
const { getCart, addToCart, updateCart, removeFromCart, clearCart } = require('../controllers/cartController');
const { verifyToken } = require('../utils/auth');

// Get user's cart
router.get('/', verifyToken, getCart);

// Add a product to the cart
router.post('/add', verifyToken, addToCart);

// Update product quantity in the cart
router.put('/update', verifyToken, updateCart);

// Remove a product from the cart
router.delete('/remove', verifyToken, removeFromCart);

// Clear all items from the cart
router.delete('/clear', verifyToken, clearCart);

module.exports = router;
