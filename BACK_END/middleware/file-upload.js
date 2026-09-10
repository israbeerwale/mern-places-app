const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder:"uploads",
    allowed_formats: ["png", "jpeg", "jpg"],
  
  },
});

const fileUpload = multer({
  limits: {
    fileSize: 5000000,
  },
  storage: storage,
});
module.exports = fileUpload;
