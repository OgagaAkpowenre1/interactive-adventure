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
  },
  { timestamps: true }
);

sceneSchema.index({storyId:1})

const Scene = mongoose.model("Scene", sceneSchema);

module.exports = Scene;
