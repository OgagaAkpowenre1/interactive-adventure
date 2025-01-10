import React from "react";
import styled from "styled-components";
import StoryDetails from "../components/StoryDetails";


const Wrapper = styled.div`
  margin-bottom: 2em;

    h3 {
      margin: 1rem auto;
      font-weight: bold;
      text-align: center;
    }
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StoryList = () => {
  return (
    <Wrapper>
      <h3>This is the story list</h3>
      <List>
        <StoryDetails />
        <StoryDetails />
        <StoryDetails />
        <StoryDetails />
        <StoryDetails />
        <StoryDetails />
        <StoryDetails />
        <StoryDetails />
        <StoryDetails />
      </List>
    </Wrapper>
  );
};

export default StoryList;
