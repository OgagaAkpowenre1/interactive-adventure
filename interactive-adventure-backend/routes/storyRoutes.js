const express = require("express")
const {createStory, deleteStory, editStory, fetchStories} = require("../controllers/storyController")

const router = express.Router()

router.get("/", fetchStories)
router.post("/create", createStory)
router.delete("/:storyId/delete", deleteStory)
router.put("/:storyId/edit", editStory)
module.exports = router