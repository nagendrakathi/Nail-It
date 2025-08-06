const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();
let c=1;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    
    return {
      folder: "nail-it/uploads",
      allowed_formats: ["jpg", "jpeg", "png"],
      transformation: [{ width: 500, height: 500, crop: "limit" }],
      public_id: `user-${c++}`
    };
  },
});

const upload = multer({ storage });

module.exports = upload;