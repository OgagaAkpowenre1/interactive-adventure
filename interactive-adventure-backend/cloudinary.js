const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "du4vfhhym", // Replace with your Cloudinary Cloud Name
  api_key: "529348912997879",       // Replace with your API Key
  api_secret: "mHcriw5kp92B6nIkihA7u7ETTA4", // Replace with your API Secret
});

module.exports = cloudinary;
