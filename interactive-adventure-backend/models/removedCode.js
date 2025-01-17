// story schema v1

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const storySchema = new Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   genre: { type: String },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   scenes: {
//     type: Map, 
//     of: new Schema({
//       id: { type: String, required: true },
//       text: { type: String },
//       image: {type: String},
//       options: [
//         {
//           text: { type: String },
//           nextScene: { type: String },
//         },
//       ],
//     }),
//   },
// });

// const Story = mongoose.model("Story", storySchema);
// module.exports = Story;
