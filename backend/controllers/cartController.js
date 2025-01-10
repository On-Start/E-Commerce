const Cart = require('../models/cart');
const Product = require('../models/product');

// Get the user's cart
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve cart', error: error.message });
    }
};

// Add a product to the cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the user's cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // If no cart exists, create a new one
            cart = new Cart({ user: userId, products: [{ product: productId, quantity }] });
        } else {
            // If the product already exists in the cart, update the quantity
            const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product to cart', error: error.message });
    }
};

// Update the quantity of a product in the cart
exports.updateCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        if (quantity <= 0) {
            return res.status(400).json({ message: 'Quantity must be greater than 0' });
        }

        cart.products[productIndex].quantity = quantity;
        await cart.save();
        res.status(200).json({ message: 'Cart updated', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
};

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.products.splice(productIndex, 1); // Remove the product from the array
        await cart.save();
        res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error removing product from cart', error: error.message });
    }
};

// Clear all items from the cart
exports.clearCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = []; // Empty the cart
        await cart.save();
        res.status(200).json({ message: 'Cart cleared', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
};
