const Category = require('../models/category');

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('parentCategory', 'name');
        res.status(200).json({ categories });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch categories', error: error.message });
    }
};

// Add a new category
exports.addCategory = async (req, res) => {
    const { name, description, parentCategory } = req.body;
    try {
        const category = new Category({ name, description, parentCategory });
        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create category', error: error.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, description, parentCategory } = req.body;
    try {
        const category = await Category.findByIdAndUpdate(
            categoryId,
            { name, description, parentCategory },
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update category', error: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete category', error: error.message });
    }
};
