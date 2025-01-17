const express = require("express")
const {createStory, deleteStory} = require("../controllers/storyController")

const router = express.Router()

router.post("/create", createStory)
router.delete("/:storyId/delete", deleteStory)
module.exports = router