const express = require("express")
const {createStory, deleteStory, editStory} = require("../controllers/storyController")

const router = express.Router()

router.post("/create", createStory)
router.delete("/:storyId/delete", deleteStory)
router.put("/:storyId/edit", editStory)
module.exports = router