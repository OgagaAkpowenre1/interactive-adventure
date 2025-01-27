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
} = require("../controllers/sceneController")
const router = express.Router();

router.post("/:storyId/createScene", createScene)
router.put("/:storyId/:sceneId/edit", editScene)
router.delete("/:storyId/:sceneId/delete", deleteScene)
router.get("/:storyId/read", fetchInitialScenesForReader)
router.get("/:storyId/:sceneId", fetchSceneById)
router.get("/edit/:storyId", fetchScenesForEditor)

console.log("story controller loaded")

module.exports = router;
