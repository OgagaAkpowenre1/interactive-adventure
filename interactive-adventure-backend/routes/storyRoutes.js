const express = require('express');
const router = express.Router();
const { createStory, addScene } = require('../controllers/storyController');

// Route to create a new story
router.post('/create', (req, res) => {
    console.log(req.body); // Log the incoming request body
    res.send('OK');
});

// Route to add a scene to a story
router.post('/:storyId/add-scene', addScene);

module.exports = router;
