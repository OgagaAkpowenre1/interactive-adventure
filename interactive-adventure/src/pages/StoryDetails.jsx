import React, {useState, useEffect} from "react";
import styled from "styled-components";
import InfoBar from "../components/StoryPageInfo";
import Carousel from "../components/Carousel";
import MagnifiedImage from "../components/MagnifiedImage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStoryContext } from "../contexts/storyContext";
import axiosInstance from "../api";
import NewStoryForm from "../components/NewStoryForm";
import toast from "react-hot-toast";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 1.5em;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 2em;
  }
`;

const Content = styled.div`
  flex: 2;

  button {
    border-radius: 5px;
    margin-top: 1em;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;

  img {
    width: 100%;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const GalleryWrapper = styled.div`
  margin-top: 2em;
`;

const StoryDetails = () => {
  const location = useLocation()
  const {selectedStory, setSelectedStory, scenes, setScenes, selectedScene} = useStoryContext()
  const navigate = useNavigate()
  const story = location.state || selectedStory  
  const [magnifiedImage, setMagnifiedImage] = React.useState(null);
  const [loading, setLoading] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // const fetchScenes = async () => {
  //   try {
  //     setLoading(true)
  //     const response = await axiosInstance.get(`/scenes/${story._id}/read`);
  //     setScenes(response.data)
  //     navigate(`/reader/${selectedStory._id}/${scenes[0]._id}`)
  //   } catch (error) {
  //     console.log(error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const fetchScenes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/scenes/${story._id}/read`);
      setScenes(response.data);
      console.log(scenes)
      // Store scenes in localStorage
      localStorage.setItem(`scenes_${story._id}`, JSON.stringify(response.data));
  
      // Navigate to the reader with the first scene in state
      if (response.data.length > 0) {
        navigate(`/reader/${selectedStory._id}/${response.data[0]._id}`, {
          state: { scene: response.data[0] } // Pass first scene
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch scenes. Please try again.")
    } finally {
      setLoading(false);
    }
  };  

  const goToEditor = async () => {
    try {
      // navigate(`/editor/${story._id}`)
      console.log(story._id)
      
      const response = await axiosInstance.get(`/scenes/edit/${story._id}`);
      
      // console.log(response.data)
      setScenes(response.data)
      // console.log(scenes)
      navigate(`/editor/${story._id}`)
      toast.success("Editor opened successfully")
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch scenes for editor")
    }
  }

  useEffect(() => {
    // Check if scenes is loaded, then navigate
    // if (scenes.length > 0) {
    //   // navigate(`/editor/${story._id}`);
    // }
  }, [scenes, navigate]); 
  

  if (!story) {
    return <p>No story details available.</p>;
  }

  if(loading) {
    return <p>Loading...</p>
  }

  const handleImageClick = (image) => {
    setMagnifiedImage(image);
  };

  const handleCloseMagnified = () => {
    setMagnifiedImage(null);
  };

  const deleteStory = async (story) => {
    try {
      console.log(story._id)
      const response = await axiosInstance.delete(`/stories/${story._id}/delete`, story._id)
      console.log(response)
      toast.success("Story deleted successfully!")
      navigate('/stories')
    } catch (error) {
      console.log(error)
      toast.error("Failed to delete story")
    }
  }

  return (
    <>
      {magnifiedImage && (
        <MagnifiedImage
          image={magnifiedImage}
          onClose={handleCloseMagnified}
        />
      )}
      <Wrapper>
      <NewStoryForm visible={showEditForm} toggleVisibility={() => setShowEditForm(false)} existingStory={story} />
        <ImageContainer>
          <img
            src={story.cover}
            alt={story.title}
            onClick={() => handleImageClick(story.cover)}
          />
        </ImageContainer>
        <Content>
          <h1>{story.title}</h1>
          <p>{story.synopsis}</p>
          <InfoBar
            readingTime={story.readingTime ? story.readingTime : "20 mins"}
            genres={story.genres}
            rating={story.rating}
          />
          <Link to={"/editor"}><button onClick={() => goToEditor()}>Edit Scenes</button></Link>
          <button onClick={() => {deleteStory(story)}}>Delete Story</button>
          {/* <button onClick={() => editStory()}>Edit</button> */}
          <button onClick={() => setShowEditForm(true)}>Edit</button>
          <button onClick={() => fetchScenes()}>Read</button>

        </Content>
      </Wrapper>
      <GalleryWrapper>
        <h2>Image Gallery</h2>
        <Carousel images={story.gallery} onImageClick={handleImageClick} />
      </GalleryWrapper>
    </>
  );
};

export default StoryDetails;
 