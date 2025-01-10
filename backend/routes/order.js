// const express = require('express')
// const router = express.Router()

// const orderController = require('../controllers/order')

// router.post('/', orderController.createOrder)

// router.get('/:id', orderController.getOrderById)

// module.exports = router;    


const express = require('express');
const router = express.Router();
const { getOrders, getOrderById, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { verifyToken } = require('../utils/auth');

// Get all orders (admin only)
router.get('/', verifyToken, getOrders);

// Get a specific order by ID
router.get('/:orderId', verifyToken, getOrderById);

// Create a new order
router.post('/', verifyToken, createOrder);

// Update an order by ID (admin only)
router.put('/:orderId', verifyToken, updateOrder);

// Delete an order by ID (admin only)
router.delete('/:orderId', verifyToken, deleteOrder);

module.exports = router;
