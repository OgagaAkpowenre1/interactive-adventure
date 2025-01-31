const express = require("express")
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() }).single("cover"); // Apply multer
const {createStory, deleteStory, editStory, fetchStories} = require("../controllers/storyController")

const router = express.Router()

const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Param middleware for ObjectId validation
router.param("storyId", (req, res, next, storyId) => {
    if (!validateObjectId(storyId)) {
        return res.status(400).json({ message: "Invalid story ID format" });
    }
    next();
});

// Debugging middleware
router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});
 
router.get("/", fetchStories)
router.post("/create", upload,  createStory)
router.delete("/:storyId/delete",  deleteStory)
router.put("/:storyId/edit", upload, editStory)
module.exports = router