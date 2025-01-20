const express = require("express");
const {createScene, editScene, deleteScene} = require("../controllers/sceneController")
const router = express.Router();

router.post("/:storyId/createScene", createScene)
router.put("/:storyId/:sceneId/edit", editScene)
router.delete("/:storyId/:sceneId/delete", deleteScene)

module.exports = router;
