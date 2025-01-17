import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 1em;
  padding: 1em;
  background-color: #f9f9f9;
  border-radius: 8px;

  img {
    flex: 0 0 auto;
    width: 150px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
 
const Carousel = ({ images, onImageClick }) => {
  return (
    <Wrapper>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gallery image ${index + 1}`}
          onClick={() => onImageClick(image)}
        />
      ))}
    </Wrapper>
  );
};

export default Carousel;

