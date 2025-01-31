const cloudinary = require("../cloudinary"); // Import Cloudinary config
const { v4: uuidv4 } = require("uuid");

const uploadImage = async (file, folder = "story_covers") => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject("No file provided");
    }

    const publicId = `${folder}/${uuidv4()}`;

    cloudinary.uploader.upload_stream(
      // { public_id: uuidv4() }, // You can generate a custom public ID here
      { folder, public_id: publicId, overwrite: true },
      (error, result) => {
        if (error) {
          return reject(`Error uploading image to Cloudinary, ${error.message}`);
        }

        // Resolve with the URL to the uploaded image
        resolve(result.secure_url);
      }
    ).end(file.buffer); // Upload the image file's buffer to Cloudinary
  });
};

module.exports = uploadImage;
