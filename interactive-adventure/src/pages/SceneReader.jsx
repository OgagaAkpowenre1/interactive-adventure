import React from "react";
import styled from "styled-components";
import SceneImageComponent from "../components/SceneImage";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.sceneBackgroundColor};
`;

const SceneTextWrapper = styled.div`
  max-width: 70vw;
  text-align: center;
  margin: 2rem auto;
`;

const SceneButtons = styled.button`
  margin: 1.5em;
  color: ${(props) => props.theme.buttonColor} ;
  // border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.8em 2.5em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.25s;
  background-color: ${(props) => props.theme.buttonBackgroundColor};
  box-shadow: 6px 6px 14px 6px rgba(0,0,0,0.75);
  -webkit-box-shadow: 6px 6px 14px 6px rgba(0,0,0,0.75);
  -moz-box-shadow: 6px 6px 14px 6px rgba(0,0,0,0.75);


  &:hover {
  border-color: red;
  }
`;

const SceneButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const SceneReader = () => {
  return (
    <Wrapper>
      <SceneImageComponent src={"https://wallpapercave.com/wp/wp7135795.jpg"} alt={'Image'} />
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
