// const Product = require('../models/product')
// const Category  = require('../models/category');

// // get all products
// exports.getProducts = async (req, res) => {
//     try {
//         const products = await Product.find({})
//         console.log(products)
//         res.status(200).json({ data: products })
//     } catch (error) {
//         console.log(error)
//         // res.status(500).json({ message: 'Internal server error' })
//     }
// }

// // get product by id
// exports.getProductById = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id)
//         res.status(200).json({ data: product })
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' })
//     }
// }

// exports.addProducts = async (req, res)=> {
//     try {
//         console.log(req.body);
//         const addProduct = await Product.create(req.body);
//         // console.log(addProduct)
//         res.json({message: 'Product Added Successfully'})

//     } catch (error) {
//         console.error(error);
//     }
// }

// // get category
// exports.getCategory = async (req, res) => {
//     try {
//         // Fetch all categories from the database
//         const category = await Category.find({});


//         return res.status(200).json({ data: category });
//     } catch (error) {
//         // Log the error for debugging purposes
//         console.error("Error fetching categories:", error);

//         return res.status(500).json({ message: "An error occurred while fetching categories." });
//     }
// };



// exports.addCategory = async (req, res)=> {
//     try {
//         console.log(req.body);
//         const addProduct = await Category.create(req.body);
//         // console.log(addProduct)
//         res.json({message: 'Category Added Successfully'})

//     } catch (error) {
//         console.error(error);
//     }
// }


const Product = require('../models/product');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Retrieve all products
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};




// Controller to handle product creation
exports.createProduct = async (req, res) => {
    try {
        console.log("req.body",req.body);
        console.log('req.file',req.files);
        // Ensure that files are uploaded
        if (!req.files) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Map the uploaded files to URLs (stored in 'uploads/product/')
        const imageUrls = req.files.map(file => `/uploads/product/${file.filename}`);

        // Create a new product in the database
        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            images: imageUrls,  // Store the image URLs in the database
        });

        // Save the product to the database
        await newProduct.save();

        // Send back the created product data
        res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating product' });
    }
};




// Update a product by ID (only accessible to admin)
exports.updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, category, imageUrl } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(
            productId,
            { name, description, price, category, imageUrl },
            { new: true } // Return the updated product
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete a product by ID (only accessible to admin)
exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
