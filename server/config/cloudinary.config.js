const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dxykvyyhq",
  api_key: "419164613381625",
  api_secret: "9KiU8yrMak7ynlZC_B8e4g_q7bs",
  // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  // api_key: process.env.CLOUDINARY_API_KEY,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "shopcuatui",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
