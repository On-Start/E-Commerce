const express = require('express');
const router = express.Router();
const { initiatePayment, getPaymentDetails, completePayment } = require('../controllers/paymentController');
const { verifyToken } = require('../utils/auth');

// Initiate payment
router.post('/initiate', verifyToken, initiatePayment);

// Get payment details
router.get('/:paymentId', verifyToken, getPaymentDetails);

// Complete payment (callback simulation)
router.post('/complete', verifyToken, completePayment);

module.exports = router;
