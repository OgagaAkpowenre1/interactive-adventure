import React, { useState } from 'react';
import styled from 'styled-components';

const SceneImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem auto;
`;

const SceneImage = styled.img`
  width: 640px; /* Adjust to fit your layout */
  height: auto; /* Automatically maintains 16:9 aspect ratio */
  max-width: 100%;
  aspect-ratio: 16 / 9; /* Ensures the aspect ratio */
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 5px solid #121212;

  /* Styling when magnified */
  ${(props) =>
    props.magnified &&
    `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover; /* Ensures it covers the screen without distortion */
    z-index: 1000;
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.05); /* Slight scale for effect */
  `}
`;

const SceneImageComponent = ({ src, alt }) => {
  const [isMagnified, setIsMagnified] = useState(false);

  const toggleMagnify = () => {
    setIsMagnified((prev) => !prev);
  };

  return (
    <SceneImageWrapper>
      <SceneImage
        src={src}
        alt={alt}
        magnified={isMagnified}
        onClick={toggleMagnify}
      />
    </SceneImageWrapper>
  );
};

export default SceneImageComponent;
