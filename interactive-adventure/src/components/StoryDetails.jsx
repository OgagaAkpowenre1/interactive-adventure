import React from "react";
import styled from "styled-components";
import InfoBar from "./InfoBar";
import Synopsis from "./Synopsis";

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  margin: 1rem auto;
//   height: 30%;
  justify-content: space-between;
  align-items: center;
  background-color: rebeccapurple;
`;

const TextDetails = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  margin-left: 1rem;
`;

const StoryDetails = () => {
  return (
    <Wrapper>
      <img src="" alt="" style={{ width: "350px", height: "150px" }} />
      <TextDetails>
        <Synopsis />
        <InfoBar />
      </TextDetails>
    </Wrapper>
  );
};

export default StoryDetails;
