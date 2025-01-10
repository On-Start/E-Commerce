// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   countInStock: {
//     type: Number,
//     required: true,
//   },
// });

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;


// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   price: { type: Number, required: true },
//   category: { type: String, required: true },
//   brand: { type: String },
//   stock: { type: Number, required: true, default: 0 },
//   images: [String],
//   ratings: { type: Number, default: 0 },
//   reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
// });

// module.exports = mongoose.model('Product', productSchema);


const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{
        type: String,  // This will store the image URLs
    }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
