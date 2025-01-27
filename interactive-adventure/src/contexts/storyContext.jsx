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
        setSceneData
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStoryContext = () => useContext(StoryContext);
