import React from "react";
import styled from "styled-components";
import StoryDetails from "../components/StoryDetails";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

    h3 {
      margin: 1rem auto;
      font-weight: bold;
    }
`;

const List = styled.div`
  margin: 1rem auto;
  width: 100%;
`

const StoryList = () => {
  return (
    <Wrapper>
      <h3>This is the story list</h3>
      <List>
        <StoryDetails />
      </List>
    </Wrapper>
  );
};

export default StoryList;
