// const express = require("express");
// const {
//     createScene, 
//     editScene, 
//     deleteScene, 
//     fetchInitialScenesForReader, 
//     fetchSceneById, 
//     fetchScenesForEditor,
//     getNextScenes,
//     setStartScene,
// } = require("../controllers/sceneController")
// const router = express.Router();

// router.post("/:storyId/createScene", createScene)
// router.put("/:storyId/:sceneId/edit", editScene)
// router.delete("/:storyId/:sceneId/delete", deleteScene)
// router.get("/:storyId/read", fetchInitialScenesForReader)
// router.get("/:storyId/:sceneId", fetchSceneById)
// router.get("/edit/:storyId", fetchScenesForEditor)

// console.log("story controller loaded")

// module.exports = router;


const express = require("express");
const {
    createScene, 
    editScene, 
    deleteScene, 
    fetchInitialScenesForReader, 
    fetchSceneById, 
    fetchScenesForEditor,
    getNextScenes,
    setStartScene,
} = require("../controllers/sceneController");
const multer = require("multer");
// const mongoose = require("mongoose");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }).single("imageFile"); // Apply multer

const validateObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Param middleware for ObjectId validation
router.param("storyId", (req, res, next, storyId) => {
    if (!validateObjectId(storyId)) {
        return res.status(400).json({ message: "Invalid story ID format" });
    }
    next();
});

router.param("sceneId", (req, res, next, sceneId) => {
    if (!validateObjectId(sceneId)) {
        return res.status(400).json({ message: "Invalid scene ID format" });
    }
    next();
});

// Debugging middleware
router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
    next();
});

// Route definitions
router.post("/:storyId/createScene", upload, createScene);
router.put("/:storyId/:sceneId/edit", upload,  editScene);
router.delete("/:storyId/:sceneId/delete", deleteScene);
router.get("/:storyId/read", fetchInitialScenesForReader);
router.get("/edit/:storyId", fetchScenesForEditor); // Specific route comes first
router.get("/:storyId/:sceneId", fetchSceneById);   // Generic route comes after

console.log("Scene routes loaded");

module.exports = router;
