import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow-y: auto;
  width: 120%;
  border: 3px solid black;
  text-align: center;
  padding: 1em auto;
  max-height: 350px;
  background:rgb(114, 112, 112);

  i {
    font-size: 2em;
  }


  @media (min-width: 768px) {
    max-width: fit-content;
  }
`;

const Scene = styled.button`
  width: 100%;
  height: 150px;
  margin: 1em 0; /* Stack scenes with vertical spacing on mobile */
  background: ${(props) => (props.backgroundImg ? `url(${props.backgroundImg})` : "rgb(150, 145, 145)")};
  background-size: cover;
  background-position: center;
  border: 2px solid #333;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    color: white;
    opacity: ${(props) => (props.backgroundImg ? 0 : 1)};
    font-size: 2em;
  }

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  }

  @media (min-width: 768px) {
    width: 250px;
    margin: 1em; /* Restore horizontal spacing on larger screens */
  }
`;

const SceneList = ({ scenes }) => {
  if (!scenes || scenes.length === 0) {
    return <p>No scenes available.</p>;
  }
  console.log(scenes)

  return (
    <Wrapper>
      <p>Number of scenes: {scenes.length}</p>
      {scenes.map((scene, index) => (
        <Scene key={index} backgroundImg={scene.image || "https://wallpapercave.com/wp/wp7135795.jpg"}>
          {/* You can add an overlay or other content if needed */}
        </Scene>
      ))}
      <Scene>
        <i className="fa-solid fa-plus"></i>
      </Scene>
    </Wrapper>
  );
};

export default SceneList;
