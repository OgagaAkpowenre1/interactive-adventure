import React, { useState } from "react";
import styled from "styled-components";
import RightHalf from "../components/EditorRightHalf";
import LeftHalf from "../components/EditorLeftHalf";
import EditorHeader from "../components/EditorHeader";
import { useNavigate } from "react-router-dom";
import { useStoryContext } from "../contexts/storyContext";


const Wrapper = styled.div`
  // display: flex;
  flex-direction: column; /* Stack items by default */
  width: 100%;
  margin-bottom: 3em;
  min-width: 90vw;
  min-height: 100vh;
  

  @media (min-width: 768px) {
    flex-direction: row; /* Switch to side-by-side layout for larger screens */
  }
`;

const Editor = styled.div`
  display: flex;
  flex-direction: column; /* Stack LeftHalf and RightHalf on mobile */
  width: 100%;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row; /* Side-by-side layout for larger screens */
  }
`;

const LeftHalfWrapper = styled.div`
  flex: 1; /* This makes it take all the space left by RightHalf */
  margin-right: 300px; /* Same as RightHalf width */
  padding-left: 2em;
`;
 
const RightHalfWrapper = styled.div`
  flex: 1; /* Takes up the remaining 25% of the screen */
  max-width: 25%; /* Prevents RightHalf from exceeding 25% */
  overflow-y: auto;
  padding-right: 2em;
`;

const StoryEditor = () => {
  const [sceneID, setSceneID] = useState("")
  const {selectedStory, setSelectedStory, scenes, setScenes} = useStoryContext()
  const story = selectedStory
  const [formData, setFormData] = useState({
    sceneTitle: "",
    sceneContent: "",
    options: [],
    imageFile: null,
  });

  return (
    <>
    <Wrapper>
      <EditorHeader storyTitle={story.title} storyId={story._id} formData={formData} setFormData={setFormData} />
      <Editor>
        <LeftHalfWrapper >
          <LeftHalf formData={formData} setFormData={setFormData} />
        </LeftHalfWrapper>

        {/* <br /> */}
        <RightHalfWrapper>
          <RightHalf formData={formData} />
        </RightHalfWrapper>
      </Editor>
    </Wrapper>
    </>
  );
};

export default StoryEditor;
