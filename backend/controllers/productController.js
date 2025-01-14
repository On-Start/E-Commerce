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
        const products = await Product.find().select('name description price category images'); // Select relevant fields
        const productsWithImageUrls = products.map(product => ({
            ...product.toObject(),
            images: product.images.map(image => `${req.protocol}://${req.get('host')}${image}`), // Full URL for each image
        }));

        res.status(200).json({ products: productsWithImageUrls });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
    }
};


// single product
exports.getProductById = async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const productWithImageUrls = {
            ...product.toObject(),  // Use `toObject()` to avoid Mongoose wrapper issues
            images: product.images.map(image => `${req.protocol}://${req.get('host')}${image}`)
        };
        console.log('product.images',typeof(product.images))
        console.log('product.images (instanceof):', product.images instanceof Array);  // Expected: true

        res.status(200).json({ product: productWithImageUrls });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};



// Controller to handle product creation
exports.createProduct = async (req, res) => {
    try {
        // Check for required fields
        const { name, description, price, category } = req.body;
        if (!name || !description || !price || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Map the uploaded files to URLs (stored in 'uploads/product/')
        const imageUrls = req.files.map(file => `/uploads/product/${file.filename}`);

        // Create a new product in the database
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            images: imageUrls
        });

        // Save the product to the database
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error creating product:', err.message);
        res.status(500).json({ message: 'Error creating product', error: err.message });
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
