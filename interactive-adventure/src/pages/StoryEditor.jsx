import React from "react";
import styled from "styled-components";
import RightHalf from "../components/EditorRightHalf";
import LeftHalf from "../components/EditorLeftHalf";

const Wrapper = styled.div`
  //   display: flex;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
`;

const Editor = styled.div`
  display: flex;
  width: 100%;
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
