import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SceneImage = styled.img``;

const SceneTextWrapper = styled.div``;

const SceneButtons = styled.button``;

const SceneButtonsWrapper = styled.div``;

const SceneReader = () => {
  return (
    <Wrapper>
      <SceneImage src="https://wallpapercave.com/wp/wp7135795.jpg" />
      <SceneTextWrapper>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos dolor
          fugiat eum sit magni eaque hic eveniet, earum nisi aspernatur
          perferendis eligendi aliquid. Eligendi quo eaque voluptate velit nam,
          minus dolores eveniet odit incidunt laborum, commodi optio voluptatem
          unde voluptates?
        </p>
      </SceneTextWrapper>
      <SceneButtonsWrapper>
        <SceneButtons>Option 1</SceneButtons>
        <SceneButtons>Option 2</SceneButtons>
        <SceneButtons>Option 3</SceneButtons>
        <SceneButtons>Option 4</SceneButtons>
      </SceneButtonsWrapper>
    </Wrapper>
  );
};

export default SceneReader;
