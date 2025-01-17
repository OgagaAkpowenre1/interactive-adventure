const express = require("express");
const Scene = require("../models/sceneSchema");
const router = express.Router();

// Create a new scene
router.post("/scenes", async (req, res) => {
  try {
    const scene = new Scene(req.body);
    await scene.save();
    res.status(201).json(scene);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get scenes by story ID
router.get("/scenes/:storyId", async (req, res) => {
  try {
    const scenes = await Scene.find({ storyId: req.params.storyId });
    res.status(200).json(scenes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a single scene by ID
router.get("/scenes/:id", async (req, res) => {
  try {
    const scene = await Scene.findById(req.params.id);
    if (!scene) {
      return res.status(404).json({ message: "Scene not found" });
    }
    res.status(200).json(scene);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a scene
router.put("/scenes/:id", async (req, res) => {
  try {
    const scene = await Scene.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!scene) {
      return res.status(404).json({ message: "Scene not found" });
    }
    res.status(200).json(scene);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a scene
router.delete("/scenes/:id", async (req, res) => {
  try {
    const scene = await Scene.findByIdAndDelete(req.params.id);
    if (!scene) {
      return res.status(404).json({ message: "Scene not found" });
    }
    res.status(200).json({ message: "Scene deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
