const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to create storage for a specific folder
const createStorage = (folderName) => {
  return new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: `medsfinder/${folderName}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: (req, file) => {
        // Remove spaces and use timestamp for uniqueness
        const cleanName = file.originalname.split(".")[0].replace(/\s+/g, "-");
        return `${cleanName}-${Date.now()}`;
      },
    },
  });
};

// Export specialized uploaders
const uploadTo = (folderName) => {
  const storage = createStorage(folderName);
  return multer({
    storage,
    limits: { fileSize: 200 * 1024 }, // 200KB limit
  });
};

module.exports = { uploadTo };
