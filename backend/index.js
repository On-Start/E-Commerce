const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Importing routes
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');       // New Route for Cart
const reviewRoute = require('./routes/reviews');   // New Route for Review
const paymentRoute = require('./routes/payment'); // New Route for Payment
const categoryRoute = require('./routes/category');


const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Default route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Setting up routes
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/categories', categoryRoute);
app.use('/cart', cartRoute);       // Cart route
app.use('/reviews', reviewRoute);  // Review route
app.use('/payments', paymentRoute); // Payment route

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


// Starting the server
const PORT = process.env.PORT || 8080; // Default to 8080 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
