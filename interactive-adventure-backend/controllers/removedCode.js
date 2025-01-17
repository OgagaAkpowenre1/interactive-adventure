// //Story controllers v1

// const { default: mongoose } = require("mongoose");
// const Story = require("../models/stories");

// // Create a new story
// const createStory = async (req, res) => {
//   try {
//     console.log("Logging...");
//     const { title, author, genre } = req.body;
//     console.log(title, author, genre);

//     // Validate required fields
//     if (!title || !author) {
//       return res
//         .status(400)
//         .json({ message: "Title and author are required." });
//     }

//     // Create a new story document
//     const newStory = new Story({
//       title,
//       author,
//       genre,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       scenes: [],
//     });

//     // Save to database
//     const savedStory = await newStory.save();
//     console.log("Story created successfully.");
//     res.status(201).json(savedStory);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating story", error: error.message });
//   }
// };


// const deleteStory = async (req, res) => {
//   try {
//     console.log("Request received:", req.body);
//     const {storyId} = req.params

//     // Validate ObjectId format for storyId
//     if (!mongoose.Types.ObjectId.isValid(storyId)) {
//       console.log("Invalid story ID format:", storyId);
//       return res.status(400).json({ message: "Invalid story ID format" });
//     }

//     //Find and delete the story
//     const deletedStory = await Story.findByIdAndDelete(storyId)

//     if(!deletedStory){
//       return res.status(404).json({message: "Story not found"})
//     }

//     res.status(200).json({message:"Story deleted successfully", deletedStory})

//   } catch (error) {
//     console.error('Error deleting story', error)
//     res.status(500).json({message: "Error deleting story", error:error.message})
//   }
// }



// module.exports = { createStory, deleteStory };


//sceneControllers v1

// const { default: mongoose } = require("mongoose");
// const Story = require("../models/stories");

// // Add a scene to an existing story
// const addScene = async (req, res) => {
//     try {
//       console.log("Request received:", req.body);
//       const { storyId } = req.params;
//       console.log("Story ID:", storyId);
//       const { id, text, image, options } = req.body;
  
//       // Validate required fields
//       if (!id || !text) {
//         console.log("Validation failed");
//         return res
//           .status(400)
//           .json({ message: "Scene ID and text are required." });
//       }
  
//       // Validate ObjectId format
//       if (!mongoose.Types.ObjectId.isValid(storyId)) {
//         console.log(storyId, 'Invalid story ID format')
//         return res.status(400).json({ message: 'Invalid story ID format' });
//       }
  
//       // Convert storyId to ObjectId
//       const objectId = new mongoose.Types.ObjectId(storyId);
  
//       // Find the story by ID
//       const story = await Story.findById(objectId);
//       if (!story) {
//         console.log("Story not found.");
//         return res.status(404).json({ message: "Story not found" });
//       }
//       console.log("Story found:", story);
  
//       //Check if story already has that scene
//       if(story.scenes.has(id)){
//         throw new Error('Scene already exists')
//       }
//       // Add the new scene
//       const newScene = { id, text, image, options };
//       story.scenes.set(id, newScene);
//       story.updatedAt = new Date();
  
//       // Save the updated story
//       const updatedStory = await story.save();
//       console.log("Story updated:", updatedStory);
//       res.status(200).json(updatedStory);
//     } catch (error) {
//       console.error("Error occurred:", error.message);
//       res
//         .status(500)
//         .json({ message: "Error adding scene", error: error.message });
//     }
//   };


//   //Modify scenes
// const modifyScene = async (req, res) => {
//     try {
//       console.log("Request received:", req.body);
//       const {storyId, sceneId} = req.params
//       const {text, options, image} = req.body
  
//       // Validate ObjectId format for storyId
//       if (!mongoose.Types.ObjectId.isValid(storyId)) {
//         console.log("Invalid story ID format:", storyId);
//         return res.status(400).json({ message: "Invalid story ID format" });
//       }
  
//       //Check if story exists
//           // Find the story by ID
//           const story = await Story.findById(storyId);
//           if (!story) {
//             console.log("Story not found.");
//             return res.status(404).json({ message: "Story not found" });
//           }
//           console.log("Story found:", story);
  
//       //Check if scene exists
//       const scene = story.scenes.get(sceneId)
//       if(!scene){
//         console.log("Scene not found")
//         return res.status(404).json({message: "Scene not found"})
//       }
  
//       if(text){
//         console.log("Updating text...")
//         scene.text = text
//       }
  
//       if(options){
//         console.log("Updating options...")
//         const updatedOptions = [...scene.options]
  
//         options.forEach(newOption => {
//           const existingIndex = updatedOptions.findIndex(
//             opt => opt.text === newOption.text
//           );
  
//           if (existingIndex >= 0) {
//             // If an option with the same text exists, replace it
//             updatedOptions[existingIndex] = newOption;
//           } else {
//             // Otherwise, add it as a new option
//             updatedOptions.push(newOption);
//           }
//         });
//         scene.options = updatedOptions
//       }
  
//       if(image){
//         console.log("Updating image...")
        
//         scene.image = image
//       }
  
//       //Update scene with changes
//       // Save the updated scene back into the map
//       story.scenes.set(sceneId, scene);
//       story.updatedAt = new Date();
//       console.log(story)
//       res.status(200).json({message: "Scene updated successfully", story})
//     } catch (error) {
//       console.error("Error occurred:", error.message);
//       res.status(500).json({message:"Error modifying scene", error: error.message})
//     }
//   }


//   //Delete scene
// const deleteScene =async (req, res) => {
//     try {
//       console.log("Request received:", req.body);
//       const {storyId, sceneId} = req.params
  
//       // Validate ObjectId format for storyId
//       if (!mongoose.Types.ObjectId.isValid(storyId)) {
//         console.log("Invalid story ID format:", storyId);
//         return res.status(400).json({ message: "Invalid story ID format" });
//       }
  
//       //Check if story exists
//       // Find the story by ID
//       const story = await Story.findById(storyId);
//       if (!story) {
//             console.log("Story not found.");
//             return res.status(404).json({ message: "Story not found" });
//           }
//       console.log("Story found:", story);
  
//       //Check if scene exists
//       if(!story.scenes.has(sceneId)){
//         console.log("Scene not found")
//         return res.status(404).json({message: "Scene not found"})
//       }
  
//       story.scenes.delete(sceneId)
//       story.updatedAt = new Date()
  
//       const updatedStory = await story.save()
//       console.log("Scene deleted", updatedStory)
//       res.status(200).json({message: "Scene deleted successfully", story: updatedStory})
  
  
//     } catch (error) {
//       console.error('Error deleting scene', error)
//       res.status(500).json({message: "Error deleting scene", error:error.message})
//     }
//   }


//   const findScene = async (req, res) => {
//     try {
//       console.log("Request received:", req.body);
//       const {storyId, sceneId} = req.params
  
//       // Validate ObjectId format for storyId
//       if (!mongoose.Types.ObjectId.isValid(storyId)) {
//         console.log("Invalid story ID format:", storyId);
//         return res.status(400).json({ message: "Invalid story ID format" });
//       }
  
//       //Check if story exists
//       // Find the story by ID
//       const story = await Story.findById(storyId);
//       if (!story) {
//             console.log("Story not found.");
//             return res.status(404).json({ message: "Story not found" });
//           }
//       console.log("Story found:", story);
  
//       //Check if scene exists
//       if(!story.scenes.has(sceneId)){
//         console.log("Scene not found")
//         return res.status(404).json({message: "Scene not found"})
//       }
  
//       const scene = story.scenes.get(sceneId)
//       res.status(200).json(scene)
//     } catch (error) {
//       console.error('Error finding story', error)
//       res.status(500).json({message: "Error finding story", error:error.message})
//     }
//   }


//   module.exports = { addScene, modifyScene, deleteScene, findScene };