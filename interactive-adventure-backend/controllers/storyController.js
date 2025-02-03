const Story = require("../models/stories")
const { default: mongoose } = require("mongoose");
const uploadImage = require("./uploadImage")
const multer = require("multer");
   
//Create a new story 
const createStory = async (req, res) => {
    try {
        const {title, synopsis, genres, readingTime, rating, gallery} = req.body
        let coverUrl = ""
        if (req.file) {
            console.log("image cover received", req.file)
            try {
              console.log("Uploading cover...");
              coverUrl = await uploadImage(req.file);
            } catch (uploadError) {
              return res.status(500).json({ error: uploadError.message });
            }
          } else {
            console.log("No file received for cover")
          }

        if(!title || !synopsis){
            return res.status(400).json({error : "title and synopsis are required"})
        }

        const newStory = new Story({
            title,
            synopsis,
            cover : coverUrl,
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

// const editStory = async (req, res) => {
//     try {
//         const {storyId} = req.params
        

//         if(!mongoose.Types.ObjectId.isValid(storyId)){
//             console.log("Invalid story ID format", storyId)
//             return res.status(400).json({ message: "Invalid story ID format" });
//         }

//         const {title, synopsis, genres, readingTime, rating, gallery} = req.body
//         const {cover} = req.file

//         const story = await Story.findById(storyId)

//         if(!story){
//             console.log("Story not found")            
//             return res.status(404).json({ message: "Story not found" });
//         }

//         console.log("Story found", story)

//         if (req.file) {
//             try {
//               console.log("Uploading new cover...");
//               const newCoverUrl = await uploadImage(req.file);
      
//               // Delete old cover if it exists
//               if (story.cover) {
//                 const oldCoverPublicId = story.cover.split('/').pop().split('.')[0];
//                 // Check if the old cover URL points to Cloudinary
//                 try {
//                   const oldCoverPublicId = story.cover.split('/').pop().split('.')[0];
//                   await cloudinary.uploader.destroy(`story_covers/${oldCoverPublicId}`);
//                   console.log("Old cover deleted");
//                 } catch (deleteError) {
//                   console.error("Error deleting old cover:", deleteError);
//                 }
//               }
      
//               story.cover = newCoverUrl;
//             } catch (uploadError) {
//               return res.status(500).json({ error: uploadError.message });
//             }
//           }

//         if(title){
//             console.log("Changing title")
//             story.title = title
//         }

//         if(synopsis){
//             console.log("Changing synopsis")
//             story.synopsis = synopsis
//         }

//         // if(cover){
//         //     console.log("Changing cover")
//         //     story.cover = cover
//         // }

//         if(genres){
//             console.log("Changing genres")
//             story.genres = genres
//         }

//         if(readingTime){
//             console.log("Changing reading time")
//             story.readingTime = readingTime
//         }

//         if(rating){
//             console.log("Changing rating")
//             story.rating = rating
//         }

//         if(gallery){
//             console.log("Changing gallery")
//             story.gallery = gallery
//         }

//         const updatedStory = await story.save()

//         res.status(200).json(updatedStory)

//     } catch(error) {
//         console.error("Error editing story", error)
//         res.status(500).json({error : "An error occurred while editing the story"})
//     }
// }

const editStory = async (req, res) => {
    try {
        const { storyId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(storyId)) {
            console.log("Invalid story ID format", storyId);
            return res.status(400).json({ message: "Invalid story ID format" });
        }

        const { title, synopsis, genres, readingTime, rating, gallery } = req.body;

        console.log("Received file:", req.file);
        

        const story = await Story.findById(storyId);

        if (!story) {
            console.log("Story not found");
            return res.status(404).json({ message: "Story not found" });
        }

        console.log("Story found", story);

        if (req.file) {
            try {
                console.log("Uploading new cover...");
                const newCoverUrl = await uploadImage(req.file);

                // Delete old cover if it exists and was uploaded to Cloudinary
                if (story.cover) {
                    const oldCoverPublicId = story.cover.split('/').pop().split('.')[0];
                    // Check if the old cover URL points to Cloudinary
                    if (story.cover.includes('cloudinary.com')) {
                        try {
                            await cloudinary.uploader.destroy(`story_covers/${oldCoverPublicId}`);
                            console.log("Old cover deleted from Cloudinary");
                        } catch (deleteError) {
                            console.error("Error deleting old cover:", deleteError);
                        }
                    } else {
                        console.log("Old cover not found in Cloudinary, skipping deletion");
                    }
                }

                story.cover = newCoverUrl; // Set the new cover URL
            } catch (uploadError) {
                return res.status(500).json({ error: uploadError.message });
            }
        }

        // Update other fields if provided
        if (title) {
            console.log("Changing title");
            story.title = title;
        }

        if (synopsis) {
            console.log("Changing synopsis");
            story.synopsis = synopsis;
        }

        if (genres) {
            console.log("Changing genres");
            
            story.genres = JSON.parse(genres);
        }

        if (readingTime) {
            console.log("Changing reading time");
            story.readingTime = readingTime;
        }

        if (rating) {
            console.log("Changing rating");
            story.rating = rating;
        }

        if (gallery) {
            console.log("Changing gallery");
            story.gallery = gallery;
        }

        const updatedStory = await story.save();

        res.status(200).json(updatedStory);
    } catch (error) {
        console.error("Error editing story", error);
        res.status(500).json({ error: "An error occurred while editing the story" });
    }
};


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

const fetchStories = async (req, res) => {
    try {
        const stories = await Story.find(); // Fetch all stories
        res.status(200).json(stories); // Send the stories as a JSON response
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ error: 'An error occurred while fetching stories' });
    }
};

module.exports = {createStory, deleteStory, editStory, fetchStories}
 
