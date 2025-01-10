// const mongoose = require('mongoose');

// // Category Schema (with only the 'name' field)
// const categorySchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true, // Ensures the category name is unique
//     trim: true,   // Trims any leading or trailing spaces
//   },
// });

// // Create Category model
// const Category = mongoose.model('Category', categorySchema);

// module.exports = Category;

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Category', categorySchema);
