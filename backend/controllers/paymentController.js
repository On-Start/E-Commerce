// const Order = require('../models/order');
// const { processPayment } = require('../utils/paymentGateway');
// const { sendOrderConfirmation } = require('../utils/emailService');

// // Initiate payment for an order
// exports.initiatePayment = async (req, res) => {
//     const { orderId } = req.body;
//     const userId = req.user._id;

//     try {
//         // Retrieve the order from the database
//         const order = await Order.findOne({ _id: orderId, user: userId });
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         // Calculate the total amount to be paid
//         const amount = order.totalAmount; // Assuming totalAmount is already calculated in the Order model

//         // Initiate the payment using a payment gateway
//         const paymentData = await processPayment(amount, orderId);

//         // Send the payment link or redirect URL
//         res.status(200).json({ message: 'Payment initiated', paymentUrl: paymentData.paymentUrl });
//     } catch (error) {
//         res.status(500).json({ message: 'Error initiating payment', error: error.message });
//     }
// };

// // Handle the payment gateway callback
// exports.handlePaymentCallback = async (req, res) => {
//     const { paymentStatus, orderId, transactionId } = req.body;

//     try {
//         // Find the order in the database
//         const order = await Order.findById(orderId);
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         // Verify the payment status and update the order accordingly
//         if (paymentStatus === 'success') {
//             order.paymentStatus = 'Paid';
//             order.transactionId = transactionId;
//             await order.save();

//             // Send confirmation email to the user
//             await sendOrderConfirmation(order);

//             res.status(200).json({ message: 'Payment successful', order });
//         } else {
//             order.paymentStatus = 'Failed';
//             await order.save();
//             res.status(400).json({ message: 'Payment failed' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error processing payment callback', error: error.message });
//     }
// };


const Payment = require('../models/payment');
const Order = require('../models/order');

// Initiate a payment
exports.initiatePayment = async (req, res) => {
    const { orderId, paymentMethod, amount, transactionId } = req.body;
    const userId = req.user._id;

    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const payment = new Payment({
            user: userId,
            order: orderId,
            paymentMethod,
            transactionId,
            amount,
        });

        await payment.save();
        res.status(201).json({ message: 'Payment initiated successfully', payment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to initiate payment', error: error.message });
    }
};

// Get payment details
exports.getPaymentDetails = async (req, res) => {
    const { paymentId } = req.params;

    try {
        const payment = await Payment.findById(paymentId).populate('user', 'name email').populate('order');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
        res.status(200).json({ payment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve payment details', error: error.message });
    }
};

// Complete a payment
exports.completePayment = async (req, res) => {
    const { paymentId, status } = req.body;

    try {
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        payment.paymentStatus = status === 'success' ? 'Completed' : 'Failed';
        await payment.save();

        res.status(200).json({ message: 'Payment status updated', payment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to complete payment', error: error.message });
    }
};
