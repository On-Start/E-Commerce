// const Order = require('../models/order')

// // create new order
// exports.createOrder = async (req, res) => {
//     try {
//         const { orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice } = req.body;

//         if (orderItems && orderItems.length === 0) {
//             return res.status(400).json({ message: 'No order items' })
//         } else {
//             const order = new Order({
//                 user: req.user._id,
//                 orderItems,
//                 shippingAddress,
//                 paymentMethod,
//                 taxPrice,
//                 shippingPrice,
//                 totalPrice,
//             })
//             const createdOrder = await order.save()
//             res.status(200).json({ data: createdOrder })
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Internal server error' })
//     }
// }


// // get order by id
// exports.getOrderById = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id).populate('user', 'name email')
//         if (order) {
//             res.status(200).json({ data: order })
//         } else {
//             res.status(404).json({ message: 'Order not found' })
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }


const Order = require('../models/order');
const Product = require('../models/product');

// Get all orders (admin only)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user products.product');
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve orders', error: error.message });
    }
};

// Get an order by ID
exports.getOrderById = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId).populate('user products.product');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ order });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving order', error: error.message });
    }
};

// Create a new order
exports.createOrder = async (req, res) => {
    const { products, shippingAddress, paymentMethod } = req.body;
    const user = req.user._id;  // User ID from token

    try {
        // Calculate the total price of the order
        let totalPrice = 0;
        for (let item of products) {
            const product = await Product.findById(item.product);
            totalPrice += product.price * item.quantity;  // Multiply price by quantity
        }

        // Create a new order
        const newOrder = new Order({
            user,
            products,
            shippingAddress,
            paymentMethod,
            totalPrice,
            status: 'pending', // Order status (could be 'pending', 'shipped', etc.)
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Update an order (e.g., status change)
exports.updateOrder = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findByIdAndDelete(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};
