// multerConfig.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create the 'uploads/product' directory if it doesn't exist
const uploadDir = path.join(__dirname, '..', 'uploads', 'product');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Store files in the 'uploads/product' directory
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename based on the timestamp and the file's extension
    cb(null, Date.now() + path.extname(file.originalname));  // Example: 1623874085132.jpg
  }
});

// File filter to allow only images (JPG, JPEG, PNG)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file type! Only JPG, JPEG, and PNG are allowed.'), false); // Reject the file
  }
};

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maximum file size (5MB)
  fileFilter: fileFilter
});

module.exports = upload;
