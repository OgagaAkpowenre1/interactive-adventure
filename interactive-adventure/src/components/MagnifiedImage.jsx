import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Image = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  background: none;
  border: none;
  font-size: 1.5em;
  color: white;
  cursor: pointer;
`;

const MagnifiedImage = ({ image, onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <Image src={image} alt="Magnified" />
    </Overlay>
  );
};

export default MagnifiedImage;
