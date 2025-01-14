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
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename based on the timestamp and original filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
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
