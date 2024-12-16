const Story = require('../models/stories');

// Create a new story
const createStory = async (req, res) => {
  try {
    console.log("Logging...")
    const { title, author, genre } = req.body;
    console.log(title, author, genre)

    // Validate required fields
    if (!title || !author) {
      return res.status(400).json({ message: 'Title and author are required.' });
    }

    // Create a new story document
    const newStory = new Story({
      title,
      author,
      genre,
      createdAt: new Date(),
      updatedAt: new Date(),
      scenes: []
    });

    // Save to database
    const savedStory = await newStory.save();
    console.log("Logging...")
    res.status(201).json(savedStory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating story', error: error.message });
  }
};

// Add a scene to an existing story
const addScene = async (req, res) => {
  try {
    const { storyId } = req.params;
    const { id, text, image, options } = req.body;

    // Validate required fields
    if (!id || !text) {
      return res.status(400).json({ message: 'Scene ID and text are required.' });
    }

    // Find the story by ID
    const story = await Story.findById(storyId);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }

    // Add the new scene
    const newScene = { id, text, image, options };
    story.scenes.push(newScene);
    story.updatedAt = new Date();

    // Save the updated story
    const updatedStory = await story.save();
    res.status(200).json(updatedStory);
  } catch (error) {
    res.status(500).json({ message: 'Error adding scene', error: error.message });
  }
};

module.exports = { createStory, addScene };
