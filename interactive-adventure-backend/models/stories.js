const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    synopsis: { type: String, required: true },
    cover: { type: String, required: true }, // URL or file path for cover image
    genres: [{ type: String }],
    readingTime: { type: String }, // Optional, e.g., "20 mins"
    rating: { type: Number, min: 1, max: 5 }, // Optional
    gallery: [{type: String}]
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

storySchema.index({ title: 1 });

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
