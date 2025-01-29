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




// const createScene = async (req, res) => {
//     try {

//         console.log("Request received:", req.body);

//         const { storyId }= req.params
//         console.log('Request body:', req.body)
//         console.log('Request file:', req.file)
//         const { sceneTitle, sceneContent, options, isEnd = false } = req.body;
        

//         console.log(storyId)
//         console.log(sceneTitle, sceneContent, options)

//         if(!mongoose.Types.ObjectId.isValid(storyId)){
//             console.log("Invalid story ID format", storyId)
//             return res.status(400).json({ message: "Invalid story ID format" });
//         }

//         const story = await Story.findById(storyId)
//         if (!story) {
//             console.log("Story not found", storyId);
//             return res.status(404).json({ message: "Story not found" });
//         }

//         if(options && options.length > 0){
            
//             for(let i = 0; i < options.length; i++){
//                 const option = options[i]
//                 console.log(option)
//                 if(option.text && !mongoose.Types.ObjectId.isValid(option.nextScene)){
//                     console.log("Passed the condition")
//                     const placeholderScene = new Scene ({
//                         storyId, 
//                         sceneTitle : option.text,
//                         sceneContent: "",
//                         options : [],
//                         image : "",
//                         isPlaceholder: true
//                     })

//                     await placeholderScene.save()
//                     console.log("Placeholder scene created", placeholderScene._id)
//                     option.nextScene = placeholderScene._id
                    
//                 }
//             }
//         }

//         // upload(req, res, async (err) => {
//         //     if(err){
//         //         return res.status(400).json({message: "Error uploading image"})
//         //     }
//         //   })
//             let imageUrl = null

//             if(req.file){
//                 try {
//                     imageUrl = await upload(req.file)
//                     console.log("Image uploaded successfully", imageUrl)
//                 } catch (error) {
//                     return res.status(500).json({ message: uploadError });
//                 }
//             }
        


//         const newScene = new Scene ({
//             storyId,
//             sceneTitle,
//             sceneContent,
//             options: JSON.parse(options), 
//             image : imageUrl,
//             isEnd 
//         })

//         await newScene.save()
//         console.log("Scene created")
//         return res.status(201).json(newScene)
//     } catch (error) {
//         console.error("Error creating scene:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// }

const editScene = async (req, res) => {
    try {
        const { storyId, sceneId } = req.params;
        const { sceneTitle, sceneContent, options, image, isEnd = false } = req.body; // Default for isEnd

        if (!mongoose.Types.ObjectId.isValid(storyId)) {
            console.log("Invalid story ID format", storyId);
            return res.status(400).json({ message: "Invalid story ID format" });
        }

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

        // Create placeholder scenes if needed
        if (!isEnd && options && options.length > 0) {
            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                if (option.text) {
                    const nextSceneTitle = option.nextSceneTitle;
                
                    if (!nextSceneTitle) {
                        // If no nextSceneTitle is provided, create a placeholder
                        const placeholderScene = new Scene({
                            storyId,
                            sceneTitle: option.text, // Use the option text as the title
                            sceneContent: "",
                            options: [],
                            image: "",
                            isPlaceholder: true // Mark as placeholder
                        });
                
                        await placeholderScene.save();
                        console.log("Placeholder scene created:", placeholderScene._id);
                
                        option.nextSceneTitle = placeholderScene.sceneTitle; // Update the option to link to the placeholder scene title
                        option.nextScene = placeholderScene._id; // Optionally, also store the ObjectId
                    } else {
                        // Check if the scene with the title exists in this story
                        const existingScene = await Scene.findOne({ storyId, sceneTitle: nextSceneTitle });
                        
                        if (!existingScene) {
                            // If no scene exists with the given title, create a placeholder
                            const placeholderScene = new Scene({
                                storyId,
                                sceneTitle: nextSceneTitle,
                                sceneContent: "",
                                options: [],
                                image: "",
                                isPlaceholder: true
                            });
                
                            await placeholderScene.save();
                            console.log("Placeholder scene created:", placeholderScene._id);
                            option.nextSceneTitle = placeholderScene.sceneTitle; // Update option
                            option.nextScene = placeholderScene._id; // Optionally, update with the ObjectId
                        }
                    }
                }
                 
                // Save the updated scene with the new options
                scene.options = options;
                 // Make sure to update the scene's options with modified nextScene
                  
            }  
            scene.options = options; // Ensure options are updated
        }

        // Update the scene
        const updatedScene = await Scene.findByIdAndUpdate(
            sceneId,
            { sceneTitle, sceneContent, options, image, isPlaceholder: false, isEnd },
            { new: true }
        );

        return res.status(200).json(updatedScene);
        
    } catch (error) {
        console.error("Error editing scene:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const deleteScene = async (req, res) => {
    try {
        console.log("Request received:", req.body);

        const { storyId, sceneId } = req.params;

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

        if (referencingScenes.length > 0) {
            console.log("Scene is being referenced by other scenes");
            return res.status(400).json({
                message: "Cannot delete scene because it's referenced by other scenes.",
                referencedBy: referencingScenes.map((scene) => scene.sceneTitle)
            });
        }

        // Delete the scene if no references are found
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

  
const fetchScenesForEditor = async (req, res) => {
    console.log("hi")
    const { storyId } = req.params;
    console.log(storyId, 'what was fetched')
    // Validate storyId format
    if (!mongoose.Types.ObjectId.isValid(storyId)) {
        return res.status(400).json({ message: "Invalid story ID format" });
    }
    console.log("Story ID from params:", storyId);
    try {
        const scenes = await Scene.find(
            { storyId },
            { sceneTitle: 1, _id: 1, options: 1 } // Include minimal fields
        ).sort({ createdAt: 1 });

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