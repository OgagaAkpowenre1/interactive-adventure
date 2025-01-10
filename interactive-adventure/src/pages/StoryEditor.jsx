import React from "react";
import styled from "styled-components";
import RightHalf from "../components/EditorRightHalf";
import LeftHalf from "../components/EditorLeftHalf";

// const Wrapper = styled.div`
//     display: flex;
//   width: 100%;
// `;

// const Title = styled.div`
//   display: flex;
// `;

// const Editor = styled.div`
//   display: flex;
//   width: 100%;
// `;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column; /* Stack items by default */
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row; /* Switch to side-by-side layout for larger screens */
  }
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 1em;

  h5, h6 {
    margin: 0.5em;
  }
`;

const Editor = styled.div`
  display: flex;
  flex-direction: column; /* Stack LeftHalf and RightHalf on mobile */
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row; /* Side-by-side layout for larger screens */
  }
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
        <LeftHalf />
        <br />
        <RightHalf />
      </Editor>
    </Wrapper>
  );
};

export default StoryEditor;
