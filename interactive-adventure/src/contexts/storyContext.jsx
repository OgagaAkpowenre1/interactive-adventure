import { createContext, useContext, useState } from 'react';
import axiosInstance from '../api';
const StoryContext = createContext();
import { useEffect } from 'react';

export const StoryProvider = ({ children }) => {
  // const [selectedStory, setSelectedStory] = useState(null);
  // const [selectedScene, setSelectedScene] = useState(null);
  const [selectedStory, setSelectedStory] = useState(() => {
    // Load saved story from localStorage when the component mounts
    const savedStory = localStorage.getItem("selectedStory");
    return savedStory ? JSON.parse(savedStory) : null;
  });

  const [selectedScene, setSelectedScene] = useState(() => {
    // Load saved scene from localStorage when the component mounts
    const savedScene = localStorage.getItem("selectedScene");
    return savedScene ? JSON.parse(savedScene) : null;
  });
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

  // Save selected story & scene to localStorage when they change
  useEffect(() => {
    if (selectedStory) {
      localStorage.setItem("selectedStory", JSON.stringify(selectedStory));
    } else {
      localStorage.removeItem("selectedStory");
    }
  }, [selectedStory]);

  useEffect(() => {
    if (selectedScene) {
      localStorage.setItem("selectedScene", JSON.stringify(selectedScene));
    } else {
      localStorage.removeItem("selectedScene");
    }
  }, [selectedScene]);
  

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
