import React from "react";
import styled from "styled-components";
import RightHalf from "../components/EditorRightHalf";
import LeftHalf from "../components/EditorLeftHalf";

const Wrapper = styled.div`
    // display: flex;
  flex-direction: column; /* Stack items by default */
  width: 100%;
  margin-bottom: 2em;

  @media (min-width: 768px) {
    flex-direction: row; /* Switch to side-by-side layout for larger screens */
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-bottom: 1em;

  h5,
  h6 {
    margin: 0.5em;
  }
`;

const Editor = styled.div`
  display: flex;
  flex-direction: column; /* Stack LeftHalf and RightHalf on mobile */
  width: 100%;
  justify-content: space-between;
  

  @media (min-width: 768px) {
    flex-direction: row; /* Side-by-side layout for larger screens */
  }
`;

const LeftHalfWrapper = styled.div`
  flex: 1; /* This makes it take all the space left by RightHalf */
  margin-right: 300px; /* Same as RightHalf width */
  padding: 1em;
`;


const StoryEditor = () => {
  return (
    <Wrapper>
      This is the editor
      <Title>
        <h5>Story Title</h5>
        <h6>Scene Id</h6>
      </Title>
      <Editor>
        <LeftHalfWrapper><LeftHalf /></LeftHalfWrapper>
        
        <br />
        <RightHalf />
      </Editor>
    </Wrapper>
  );
};

export default StoryEditor;
