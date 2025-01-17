const Story = require("../models/stories")
const { default: mongoose } = require("mongoose");

//Create a new story
const createStory = async (req, res) => {
    try {
        const {title, synopsis, cover, genres, readingTime, rating, gallery} = req.body

        if(!title || !synopsis  || !cover){
            return res.status(400).json({error : "title, synopsis and cover are required"})
        }

        const newStory = new Story({
            title,
            synopsis,
            cover,
            genres: genres  || [],
            readingTime : readingTime  || null,
            rating : rating  || 3,
            gallery : gallery  || []
        })

        const savedStory = await newStory.save()

        res.status(200).json(savedStory)
    } catch(error) {
        console.error("Error creating story", error)
        res.status(500).json({error : "An error occurred while creating story"})
    }
}

const editStory = async (req, res) => {
    try {
        const {storyId} = req.params
        

        if(!mongoose.Types.ObjectId.isValid(storyId)){
            console.log("Invalid story ID format", storyId)
            return res.status(400).json({ message: "Invalid story ID format" });
        }

        const {title, synopsis, cover, genres, readingTime, rating, gallery} = req.body

        const story = await Story.findById(storyId)

        if(!story){
            console.log("Story not found")            
            return res.status(404).json({ message: "Story not found" });
        }

        console.log("Story found", story)

        if(title){
            console.log("Changing title")
            story.title = title
        }

        if(synopsis){
            console.log("Changing synopsis")
            story.synopsis = synopsis
        }

        if(cover){
            console.log("Changing cover")
            story.cover = cover
        }

        if(genres){
            console.log("Changing genres")
            story.genres = genres
        }

        if(readingTime){
            console.log("Changing reading time")
            story.readingTime = readingTime
        }

        if(rating){
            console.log("Changing rating")
            story.rating = rating
        }

        if(gallery){
            console.log("Changing gallery")
            story.gallery = gallery
        }

        const updatedStory = await story.save()

        res.status(200).json(updatedStory)

    } catch(error) {
        console.error("Error editing story", error)
        res.status(500).json({error : "An error occurred while editing the story"})
    }
}

const deleteStory = async (req, res) => {
    try {
        console.log("Recieved request")
        const {storyId} = req.params

        if(!mongoose.Types.ObjectId.isValid(storyId)){
            console.log("Invalid story ID format", storyId)
            return res.status(400).json({ message: "Invalid story ID format" });
        }

        const deletedStory = await Story.findByIdAndDelete(storyId)

        if(!deletedStory){
            return res.status(404).json({message: "Story not found"})
        }

        res.status(200).json({message:"Story deleted successfully", deletedStory})

    } catch(error) {
        console.error("Error deleting story", error)
        res.status(500).json({error : "An error occurred while deleting the story"})
    }
}

module.exports = {createStory, deleteStory, editStory}

