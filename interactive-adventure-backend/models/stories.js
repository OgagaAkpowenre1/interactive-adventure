const mongoose = require("mongoose");
const {Schema} = mongoose

const storySchema = new Schema({
  title: { type: String, required: true },
  id: {type: String, required: true},
  author: {type: String, required: true},
  genre: {type: String},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  scenes: [
    {
      id: {type: String, required: true},
      text : {type: String, required: true},
      image: {type: String},
      options: [
        {
          text: {type: String, required: true},
          nextSceneId: {type: String, required: true}
        }
      ]
    }
  ]
});

const Story = mongoose.model('Story', storySchema)
module.exports = Story


