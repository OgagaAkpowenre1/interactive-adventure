import { createContext, useContext, useState } from 'react';

const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedScene, setSelectedScene] = useState(null);

  return (
    <StoryContext.Provider
      value={{
        selectedStory,
        setSelectedStory,
        selectedScene,
        setSelectedScene,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStoryContext = () => useContext(StoryContext);
