const mongoose = require("mongoose");
 
const sceneSchema = new mongoose.Schema(
  {
    storyId: { type: mongoose.Schema.Types.ObjectId, ref: "Story", required: true },
    sceneTitle: { type: String, required: true },
    sceneContent: { type: String },
    options: [{ // Options that link to other scenes
      text: { type: String }, 
      nextScene: { type: mongoose.Schema.Types.ObjectId, ref: "Scene" }
    }],
    image: { type: String }, // URL or file path for image if applicable
    isPlaceholder: { type: Boolean, default: false },
    isEnd : { type : Boolean, default: false },
    isStartingScene: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// sceneSchema.index({storyId:1})

// const Scene = mongoose.model("Scene", sceneSchema);

// module.exports = Scene;


// const sceneSchema = new mongoose.Schema(
//   {
//     storyId: { type: mongoose.Schema.Types.ObjectId, ref: "Story", required: true },
//     sceneTitle: { type: String, required: true },
//     sceneContent: { type: String },
//     options: [{ // Options that link to other scenes
//       text: { type: String }, 
//       nextSceneTitle: { type: String } // Store the title instead of ObjectId
//     }],
//     image: { type: String }, // URL or file path for image if applicable
//   },
//   { timestamps: true }
// );

// Add a compound index for `storyId` and `sceneTitle` to enforce uniqueness
sceneSchema.index({ storyId: 1, sceneTitle: 1 }, { unique: true });

const Scene = mongoose.model("Scene", sceneSchema);

module.exports = Scene;
