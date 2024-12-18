const { default: mongoose } = require("mongoose");
const Story = require("../models/stories");

// Create a new story
const createStory = async (req, res) => {
  try {
    console.log("Logging...");
    const { title, author, genre } = req.body;
    console.log(title, author, genre);

    // Validate required fields
    if (!title || !author) {
      return res
        .status(400)
        .json({ message: "Title and author are required." });
    }

    // Create a new story document
    const newStory = new Story({
      title,
      author,
      genre,
      createdAt: new Date(),
      updatedAt: new Date(),
      scenes: [],
    });

    // Save to database
    const savedStory = await newStory.save();
    console.log("Story created successfully.");
    res.status(201).json(savedStory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating story", error: error.message });
  }
};


const deleteStory = async (req, res) => {
  try {
    console.log("Request received:", req.body);
    const {storyId} = req.params

    // Validate ObjectId format for storyId
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      console.log("Invalid story ID format:", storyId);
      return res.status(400).json({ message: "Invalid story ID format" });
    }

    //Find and delete the story
    const deletedStory = await Story.findByIdAndDelete(storyId)

    if(!deletedStory){
      return res.status(404).json({message: "Story not found"})
    }

    res.status(200).json({message:"Story deleted successfully", deletedStory})

  } catch (error) {
    console.error('Error deleting story', error)
    res.status(500).json({message: "Error deleting story", error:error.message})
  }
}



module.exports = { createStory, deleteStory };
