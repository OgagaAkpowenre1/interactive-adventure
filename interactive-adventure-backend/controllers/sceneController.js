const Scene = require("../models/scenes")
const Story = require("../models/stories")
const {default: mongoose} = require("mongoose")
const multer = require("multer");
// const upload = multer({ storage: multer.memoryStorage() });
const cloudinary = require("../cloudinary");
const { v4: uuidv4 } = require("uuid");


// Configure multer storage (for temporary file handling)
const storage = multer.memoryStorage(); // Store in memory for easy upload to Cloudinary
const upload = multer({ storage }).single("imageFile"); // Handle single file upload, field name "image"

const uploadImage = require("./uploadImage")

const createScene = async (req, res) => {
  try {
      console.log("Incoming request:", req.body);
      console.log("Incoming file:", req.file);

      const { storyId }= req.params;
      const { sceneTitle, sceneContent, options, isEnd = false } = req.body;
      
      if (!sceneTitle || !sceneContent) {
          return res.status(400).json({ message: "Scene title and content are required" });
      }

      if (!mongoose.Types.ObjectId.isValid(storyId)) {
          return res.status(400).json({ message: "Invalid story ID format" });
      }

      const story = await Story.findById(storyId);
      if (!story) {
          return res.status(404).json({ message: "Story not found" });
      }

      let parsedOptions = [];
      if (options) {
          try {
              parsedOptions = JSON.parse(options); // ✅ Prevents crashing if options is undefined
          } catch (error) {
              return res.status(400).json({ message: "Invalid options format" });
          }
      }

      if(options && options.length > 0){
                    for(let i = 0; i < options.length; i++){
                        const option = options[i]
                        console.log(option)
                        if(option.text && !mongoose.Types.ObjectId.isValid(option.nextScene)){
                            console.log("Passed the condition")
                            const placeholderScene = new Scene ({
                                storyId, 
                                sceneTitle : option.text,
                                sceneContent: "",
                                options : [],
                                image : "",
                                isPlaceholder: true
                            })
        
                            await placeholderScene.save()
                            console.log("Placeholder scene created", placeholderScene._id)
                            option.nextScene = placeholderScene._id
                            
                        }
                    }
                }

      // Upload image if present
      let imageUrl = null;
      if (req.file) {
          try {
              imageUrl = await uploadImage(req.file);
              console.log("Image uploaded successfully:", imageUrl);
          } catch (uploadError) {
              return res.status(500).json({ message: "Error uploading image" });
          }
      }

      // Create new scene
      const newScene = new Scene({
          storyId,
          sceneTitle,
          sceneContent,
          options: parsedOptions,
          image: imageUrl,
          isEnd 
      });

      await newScene.save();
      console.log("Scene created:", newScene._id);
      return res.status(201).json(newScene);

  } catch (error) {
      console.error("Error creating scene:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};

const editScene = async (req, res) => {
    try {
        console.log("Request recieved", req.body)
        const { storyId, sceneId } = req.params;
        console.log(sceneId)
        const { sceneTitle, sceneContent, options, image, isEnd = false } = req.body; // Default for isEnd

        if (!mongoose.Types.ObjectId.isValid(storyId)) {
            console.log("Invalid story ID format", storyId);
            return res.status(400).json({ message: "Invalid story ID format" });
        }

        console.log(req.body)

        const story = await Story.findById(storyId);
        if (!story) {
            console.log("Story not found", storyId);
            return res.status(404).json({ message: "Story not found" });
        }

        console.log("Story found!")

        if (!mongoose.Types.ObjectId.isValid(sceneId)) {
            console.log("Invalid scene ID format", sceneId);
            return res.status(400).json({ message: "Invalid scene ID format" });
        }

        let scene = await Scene.findById(sceneId);
        if (!scene) {
            console.log("Scene not found", sceneId);
            return res.status(404).json({ message: "Scene not found" });
        }

         // Check if another scene in the same story already has the new sceneTitle
         const duplicateScene = await Scene.findOne({
          storyId,
          sceneTitle,
          _id: { $ne: sceneId }, // Exclude the current scene being updated
      });

      if (duplicateScene) {
          // Duplicate title found, prevent the update
          return res.status(400).json({ message: `A scene with the title "${sceneTitle}" already exists in this story.` });
      }

      console.log("Duplicate scene check:", duplicateScene); // Add this log to debug


        // Create placeholder scenes if needed
        if (!isEnd && options && options.length > 0) {
          for (let i = 0; i < options.length; i++) {
              const option = options[i];
              if (option.text) {
                  const nextSceneTitle = option.nextSceneTitle;
                  
                  if (!nextSceneTitle) {
                      // If no nextSceneTitle is provided, create a placeholder
                      const placeholderScene = await Scene.findOne({
                          storyId,
                          sceneTitle: option.text,
                          isPlaceholder: true
                      });
                      
                      if (!placeholderScene) {
                          const newPlaceholder = new Scene({
                              storyId,
                              sceneTitle: option.text,
                              sceneContent: "",
                              options: [],
                              image: "",
                              isPlaceholder: true
                          });
                          await newPlaceholder.save();
                          option.nextSceneTitle = newPlaceholder.sceneTitle; // Update the option with the new placeholder title
                          option.nextScene = newPlaceholder._id; // Optionally, store the ObjectId
                      } else {
                          option.nextSceneTitle = placeholderScene.sceneTitle;
                          option.nextScene = placeholderScene._id;
                      }
                  } else {
                      // Check if a scene with the nextSceneTitle exists in this story
                      const existingScene = await Scene.findOne({
                          storyId,
                          sceneTitle: nextSceneTitle
                      });
                      
                      if (!existingScene) {
                          const placeholderScene = new Scene({
                              storyId,
                              sceneTitle: nextSceneTitle,
                              sceneContent: "",
                              options: [],
                              image: "",
                              isPlaceholder: true
                          });
      
                          await placeholderScene.save();
                          option.nextSceneTitle = placeholderScene.sceneTitle;
                          option.nextScene = placeholderScene._id;
                      }
                  }
              }
          }
          scene.options = options; // Ensure options are updated
      }
      
      let imageUrl = null;
      if (req.file) {
          try {
              imageUrl = await uploadImage(req.file);
              console.log("Image uploaded successfully:", imageUrl);
          } catch (uploadError) {
              return res.status(500).json({ message: "Error uploading image" });
          }
      }


        // Update the scene
        const updatedScene = await Scene.findByIdAndUpdate(
            sceneId,
            { sceneTitle, sceneContent, options, image:imageUrl, isPlaceholder: false, isEnd },
            { new: true }
        );

        return res.status(200).json(updatedScene);
        
    } catch (error) {
        console.error("Error editing scene:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// const deleteScene = async (req, res) => {
//     try {
//         console.log("Request received:", req.body);

//         const { storyId, sceneId } = req.params;

//         // Validate storyId format
//         if (!mongoose.Types.ObjectId.isValid(storyId)) {
//             console.log("Invalid story ID format", storyId);
//             return res.status(400).json({ message: "Invalid story ID format" });
//         }

//         // Find the story in the database
//         const story = await Story.findById(storyId);
//         if (!story) {
//             console.log("Story not found", storyId);
//             return res.status(404).json({ message: "Story not found" });
//         }

//         // Validate sceneId format
//         if (!mongoose.Types.ObjectId.isValid(sceneId)) {
//             console.log("Invalid scene ID format", sceneId);
//             return res.status(400).json({ message: "Invalid scene ID format" });
//         }

//         // Find the scene in the database
//         const scene = await Scene.findById(sceneId);
//         if (!scene) {
//             console.log("Scene not found", sceneId);
//             return res.status(404).json({ message: "Scene not found" });
//         }

//         // Check if this scene is referenced by any other scenes
//         const referencingScenes = await Scene.find({
//             "options.nextScene": sceneId
//         });

//         if (referencingScenes.length > 0) {
//             console.log("Scene is being referenced by other scenes");
//             return res.status(400).json({
//                 message: "Cannot delete scene because it's referenced by other scenes.",
//                 referencedBy: referencingScenes.map((scene) => scene.sceneTitle)
//             });
//         }

//                 // If forced, remove references before deleting
//                 if (forceDelete) {
//                   await Scene.updateMany(
//                       { "options.nextScene": sceneId },
//                       { $set: { "options.$[].nextScene": null, "options.$[].nextSceneTitle": null } }
//                   );
//               }

//         // Delete the scene if no references are found
//         await Scene.findByIdAndDelete(sceneId);
//         console.log("Scene deleted successfully", sceneId);

//         // Return success message
//         return res.status(200).json({ message: "Scene deleted successfully" });

//     } catch (error) {
//         console.error("Error deleting scene:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

const deleteScene = async (req, res) => {
  try {
      console.log("Request received:", req.body);

      const { storyId, sceneId } = req.params;
      const forceDelete = req.query.force === "true"; // Extract force parameter

      // Validate storyId format
      if (!mongoose.Types.ObjectId.isValid(storyId)) {
          console.log("Invalid story ID format", storyId);
          return res.status(400).json({ message: "Invalid story ID format" });
      }

      // Find the story in the database
      const story = await Story.findById(storyId);
      if (!story) {
          console.log("Story not found", storyId);
          return res.status(404).json({ message: "Story not found" });
      }

      // Validate sceneId format
      if (!mongoose.Types.ObjectId.isValid(sceneId)) {
          console.log("Invalid scene ID format", sceneId);
          return res.status(400).json({ message: "Invalid scene ID format" });
      }

      // Find the scene in the database
      const scene = await Scene.findById(sceneId);
      if (!scene) {
          console.log("Scene not found", sceneId);
          return res.status(404).json({ message: "Scene not found" });
      }

      // Check if this scene is referenced by any other scenes
      const referencingScenes = await Scene.find({
          "options.nextScene": sceneId
      });

      if (referencingScenes.length > 0 && !forceDelete) {
          console.log("Scene is being referenced by other scenes");
          return res.status(400).json({
              message: "Cannot delete scene because it's referenced by other scenes.",
              referencedBy: referencingScenes.map((scene) => scene.sceneTitle)
          });
      }

      // If forced, remove references before deleting
      if (forceDelete) {
          await Scene.updateMany(
              { "options.nextScene": sceneId },
              { $set: { "options.$[].nextScene": null, "options.$[].nextSceneTitle": null } }
          );
      }

      // Delete the scene
      await Scene.findByIdAndDelete(sceneId);
      console.log("Scene deleted successfully", sceneId);

      // Return success message
      return res.status(200).json({ message: "Scene deleted successfully" });

  } catch (error) {
      console.error("Error deleting scene:", error);
      return res.status(500).json({ message: "Internal server error" });
  }
};


const fetchInitialScenesForReader = async (req, res) => {
    const { storyId } = req.params;
    console.log("Fetching scenes for storyId:", storyId);


    if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return res.status(400).json({ message: "Invalid story ID format" });
    }

    try {
      console.log("looking for scenes")
      const scenes = await Scene.find(
        { storyId },
        { sceneTitle: 1, _id: 1, options: 1 }
      )
        .limit(3) // Fetch the first 3 scenes
        .sort({ createdAt: 1 })
        // .limit(3)

        // const scenes = await Scene.find(
        //   { storyId },
        //   { sceneTitle: 1, _id: 1, options: 1 }
        // );
        // console.log("Filtering scenes")
        // scenes.find({storyId, isPlaceholder: false})
        // scenes.sort({createdAt: 1})
  
        console.log("Fetched scenes:", scenes);
      res.status(200).json(scenes);
    } catch (error) {
      console.error("Error fetching scenes for reader:", error);
      res.status(500).json({ message: "Failed to fetch scenes for reader." });
    }
  };

  
// const fetchScenesForEditor = async (req, res) => {
//     console.log("hi")
//     const { storyId } = req.params;
//     console.log(storyId, 'what was fetched')
//     // Validate storyId format
//     if (!mongoose.Types.ObjectId.isValid(storyId)) {
//         return res.status(400).json({ message: "Invalid story ID format" });
//     }
//     console.log("Story ID from params:", storyId);
//     try {
//         const scenes = await Scene.find(
//             { storyId },
//             { sceneTitle: 1, _id: 1, options: 1, image: 1, isPlaceholder: 1, isEnd: 1 } // Include minimal fields
//         ).sort({ createdAt: 1 });

//         res.status(200).json(scenes);
//     } catch (error) {
//         console.error("Error fetching scenes for editor:", error);
//         res.status(500).json({ message: "Failed to fetch scenes for editor." });
//     }
// };

const fetchScenesForEditor = async (req, res) => {
  const { storyId } = req.params;

  // Validate storyId format
  if (!mongoose.Types.ObjectId.isValid(storyId)) {
      return res.status(400).json({ message: "Invalid story ID format" });
  }

  try {
      // Find all scenes for the specific story
      const scenes = await Scene.find({ storyId })
          .select("sceneTitle _id options image isPlaceholder isEnd createdAt sceneContent") // Select fields you need
          .sort({ createdAt: 1 }) // Sort by creation date
          .populate({
              path: "options.nextScene", // Populate `nextScene` field in `options`
              select: "sceneTitle _id" // Include only necessary fields for `nextScene`
          });

      // Send the scenes data as a response
      res.status(200).json(scenes);
  } catch (error) {
      console.error("Error fetching scenes for editor:", error);
      res.status(500).json({ message: "Failed to fetch scenes for editor." });
  }
};


  
  const fetchSceneById = async (req, res) => {
    const { storyId, sceneId } = req.params;
  
    try {
      const scene = await Scene.findOne(
        { _id: sceneId, storyId },
        { sceneTitle: 1, sceneContent: 1, options: 1 }
      );
  
      if (!scene) {
        return res.status(404).json({ message: "Scene not found" });
      }
  
      res.status(200).json(scene);
    } catch (error) {
      console.error("Error fetching scene:", error);
      res.status(500).json({ message: "Failed to fetch scene" });
    }
  };

  const getStartScene = async (storyId) => {
    try {
      const startScene = await Scene.findOne({ storyId, isStart: true });
      return startScene;
    } catch (error) {
      console.error("Error fetching start scene:", error);
      return null;
    }
  };

  const getNextScenes = async (req, res) => {
    try {
      // Find the current scene and its options
      const {storyId, currentSceneId} = req.params
      const currentScene = await Scene.findById(currentSceneId).populate("options.nextScene");
  
      // Fetch the next 3 scenes for each option (path)
      let nextScenes = [];
      for (const option of currentScene.options) {
        const nextSceneId = option.nextScene;
        const nextScene = await Scene.findById(nextSceneId).populate("options.nextScene").limit(3);
        nextScenes.push(nextScene);
      }
  
      return nextScenes;
    } catch (error) {
      console.error("Error fetching next scenes:", error);
      return null;
    }
  };

  const getSceneById = async (req, res) => {
    try {
      const {sceneId} = req.params;
      const scene = await Scene.findById(sceneId).populate("options.nextScene");
      return scene;
    } catch (error) {
      console.error("Error fetching scene:", error);
      return null;
    }
  };
  
  
  const setStartScene = async (req, res) => {
    try {
      // Ensure that only one scene can be marked as start
    const {storyId, sceneId} = req.params
    await Scene.updateMany({ storyId }, { $set: { isStart: false } });
    await Scene.findByIdAndUpdate(sceneId, { isStart: true });
    } catch (error) {
      res.status(500).json({ message: "Failed to set start scene" });
    }
  };
  
  
const startReader = async (req, res) => {
    const {storyId} = req.params
    
}


module.exports = { createScene, editScene, deleteScene, fetchInitialScenesForReader, fetchScenesForEditor, fetchSceneById, setStartScene, getNextScenes }