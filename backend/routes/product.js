// const express = require('express')
// const router = express.Router()

// const productController = require('../controllers/product')

// router.get('/', productController.getProducts)
// router.post('/', productController.addProducts)
// router.get('/:id', productController.getProductById)


// router.get('/category', productController.getCategory)
// router.post('/category', productController.addCategory)

// module.exports = router;

const express = require('express');
const router = express.Router();
const { getProducts, getProductById, updateProduct, deleteProduct ,createProduct } = require('../controllers/productController');
const { verifyToken } = require('../utils/auth'); // Middleware to protect certain routes
const upload = require('../middleware/upload');

// Get all products
router.get('/', getProducts);

// Get a single product by ID
router.get('/:productId', getProductById);



// Create a new product (admin only)
// router.post('/', verifyToken, upload.array('image') ,createProduct);

// POST route to create a new product with multiple images
router.post('/', upload.array('images'), createProduct);


// Update a product by ID (admin only)
router.put('/:productId', verifyToken, updateProduct);

// Delete a product by ID (admin only)
router.delete('/:productId', verifyToken, deleteProduct);

module.exports = router;
