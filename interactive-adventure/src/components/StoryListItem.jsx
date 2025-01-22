import React from "react";
import styled from "styled-components";
import InfoBar from "./InfoBar";
import Synopsis from "./Synopsis";

const Wrapper = styled.div`
  display: flex;
  max-width: 80%;
  margin: 1rem auto 2rem auto;
  justify-content: space-between;
//   align-items: center;
  background-color: rebeccapurple;
//   padding:auto 0.8em;
  border-radius: 10px;
  gap: 1rem;
  border: 2px solid ${(props) => props.theme.textColor};

  img {
    flex:1;
    max-width: 25%;
    height: auto;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    height: auto;
}
      @media (max-width: 768px) {
    /* Mobile styles */
    flex-direction: column; 
    align-items: flex-start;

    img {
      max-width: 100%;
      height: 50%; 
    }
  }
`;

const TextDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr;
//   grid-template-rows: 1fr 1fr;
//   gap: 0;
  margin-left: 1rem;
  flex: 3;
  height: 100%;
  margin-top: 1.5em;
//   padding: 0.8em;

  @media (max-width: 768px) {
    margin-left: 0; 
    flex: none; 
    width: 100%; 
    height: auto;
  }
`;

const StoryListItem = ({story}) => {
  return (
    <Wrapper>
      <img src={story.cover} alt="" />
      <TextDetails>
        <Synopsis story={story} />
        <InfoBar story={story} />
      </TextDetails>
    </Wrapper>
  );
};

export default StoryListItem;
