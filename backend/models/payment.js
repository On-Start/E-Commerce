const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String, enum: ['card', 'paypal', 'cod'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    transactionDate: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Payment', paymentSchema);
  