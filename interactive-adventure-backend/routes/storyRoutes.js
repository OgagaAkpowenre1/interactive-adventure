const express = require("express")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }).single("cover"); // Apply multer
const {createStory, deleteStory, editStory, fetchStories} = require("../controllers/storyController")
const router = express.Router()

 
router.get("/", fetchStories)
router.post("/create", upload,  createStory)
router.delete("/:storyId/delete",  deleteStory)
router.put("/:storyId/edit", upload, editStory)
module.exports = router