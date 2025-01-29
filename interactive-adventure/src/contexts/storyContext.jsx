import { createContext, useContext, useState } from 'react';

const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedScene, setSelectedScene] = useState(null);
  const [scenes, setScenes] = useState([])
  const [generatedScenes, setGeneratedScenes] = useState([]);  // Stores scenes created from form
  const [sceneData, setSceneData] = useState({sceneTitle: "", sceneContent:"", options: [], image: ""})

  // Function to add a generated scene to the list
  const addGeneratedScene = (newScene) => {
    setGeneratedScenes((prevScenes) => [...prevScenes, newScene]);
  };

  const fetchAllScenes = async () => {
    try {
      // navigate(`/editor/${story._id}`)
      // console.log(story._id)
      const response = await axiosInstance.get(`/scenes/edit/${selectedStory._id}`);
      // console.log(response.data)
      setScenes(response.data)
      // console.log(scenes)
      // navigate(`/editor/${story._id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StoryContext.Provider
      value={{
        selectedStory,
        setSelectedStory,
        selectedScene,
        setSelectedScene,
        scenes,
        setScenes,
        generatedScenes,
        setGeneratedScenes,
        addGeneratedScene,
        sceneData,
        setSceneData,
        fetchAllScenes
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStoryContext = () => useContext(StoryContext);
