const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure directory exists or create it
const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true }); // Create directory and subdirectories
  }
};

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const directory = path.join(__dirname, `../../uploads`); // All files go to uploads
    ensureDirectoryExists(directory); // Ensure uploads folder exists
    cb(null, directory); // Use the same directory for all uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

// File filter to allow specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/mpeg",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed."));
  }
};

// Create a multer instance
const uploadMiddleware = () => {
  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
  });
};

module.exports = uploadMiddleware;
