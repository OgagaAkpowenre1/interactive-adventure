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

// const uploadSceneImage = async (file, folder = "scene_images") => {
//   return new Promise((resolve, reject) => {
//     if (!file) {
//       return reject("No file provided");
//     }

//     const publicId = `${folder}/${uuidv4()}`;

//     cloudinary.uploader.upload_stream(
//       // { public_id: uuidv4() }, // You can generate a custom public ID here
//       { folder, public_id: publicId, overwrite: true },
//       (error, result) => {
//         if (error) {
//           return reject(`Error uploading image to Cloudinary, ${error.message}`);
//         }

//         // Resolve with the URL to the uploaded image
//         resolve(result.secure_url);
//       }
//     ).end(file.buffer); // Upload the image file's buffer to Cloudinary
//   });
// };

const uploadSceneImage = async (file, folder = "scene_images") => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject("No file provided");
    }

    console.log("Uploading image to folder:", folder);  // Log the folder
    const publicId = `${folder}/${uuidv4()}`;

    cloudinary.uploader.upload_stream(
      { folder, public_id: publicId, overwrite: true },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error); // Log detailed Cloudinary error
          return reject(`Error uploading image to Cloudinary, ${error.message}`);
        }

        resolve(result.secure_url);
      }
    ).end(file.buffer);
  });
};


module.exports = {uploadImage, uploadSceneImage};
