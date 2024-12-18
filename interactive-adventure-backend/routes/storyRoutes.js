const express = require('express');
const router = express.Router();
const { createStory, deleteStory } = require('../controllers/storyController');
const { addScene, modifyScene, deleteScene } = require('../controllers/sceneController')

// Route to create a new story
router.post('/create', createStory);

// Route to add a scene to a story
router.post('/:storyId/add-scene', addScene);

// Route to modify a scene in a story
router.post('/:storyId/scenes/:sceneId/modify-scene', modifyScene);

// Route to delete a scene in a story
router.delete('/:storyId/scenes/:sceneId/delete-scene', deleteScene)

// Route to delete a story
router.delete('/:storyId/delete-story', deleteStory)

module.exports = router;
