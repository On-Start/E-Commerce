const express = require('express');
const router = express.Router();
const { getAllCategories, addCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { verifyToken } = require('../utils/auth');
const { isAdmin } = require('../middleware/roleMiddleware');

// Get all categories
router.get('/', getAllCategories);

// Add a new category (Admin only)
router.post('/', verifyToken, isAdmin, addCategory);

// Update a category (Admin only)
router.put('/:categoryId', verifyToken, isAdmin, updateCategory);

// Delete a category (Admin only)
router.delete('/:categoryId', verifyToken, isAdmin, deleteCategory);

module.exports = router;
