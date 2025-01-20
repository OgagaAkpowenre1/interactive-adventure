const Scene = require("../models/scenes")
const Story = require("../models/stories")
const {default: mongoose} = require("mongoose")

const createScene = async (req, res) => {
    try {

        console.log("Request received:", req.body);

        const { storyId }= req.params
        const { sceneTitle, sceneContent, options, image, isEnd = false } = req.body;

        console.log(storyId)
        console.log(sceneTitle, sceneContent, options, image)

        if(!mongoose.Types.ObjectId.isValid(storyId)){
            console.log("Invalid story ID format", storyId)
            return res.status(400).json({ message: "Invalid story ID format" });
        }

        const story = await Story.findById(storyId)
        if (!story) {
            console.log("Story not found", storyId);
            return res.status(404).json({ message: "Story not found" });
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

        const newScene = new Scene ({
            storyId,
            sceneTitle,
            sceneContent,
            options, 
            image,
            isEnd 
        })

        await newScene.save()
        console.log("Scene created")
        return res.status(201).json(newScene)
    } catch (error) {
        console.error("Error creating scene:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

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





module.exports = { createScene, editScene, deleteScene }