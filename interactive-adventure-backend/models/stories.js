const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  username: { type: String, required: true },
  log: [{
    description: String, 
    duration: Number,
    date: String
  }]
});

const User = mongoose.model('User', userSchema)
module.exports = User