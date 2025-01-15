import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
`;

const ImageUpload = styled.div`
  width: 100%;
  min-height: 200px;
  margin-bottom: 1em;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  position: relative;
  cursor: pointer;

  @media (min-width: 768px) {
    max-width: 500px;
    min-height: 300px;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  input[type="file"] {
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const TextInput = styled.input`
  margin-bottom: 1em;
  padding: 0.5em;
  width: 80%;
`;

const ButtonCreator = styled.button`
  background-color: ${(props) => props.theme.buttonBackgroundColor || "blue"};
  color: ${(props) => props.theme.buttonColor || "white"};
  border: none;
  padding: 0.8em 1.5em;
  font-weight: bold;
  cursor: pointer;
  // margin-bottom: 1em;
  border-radius: 5px;
  // margin-top: 0.5em;
  font-size: 1em;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackgroundColor || "darkblue"};
  }
`;

const FormWrapper = styled.div`
  margin-top: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5em;
  }

  input {
    margin-bottom: 1em;
    padding: 0.5em;
    width: 100%;
  }

  button {
    align-self: flex-end;
  }
`;

const GeneratedButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.8em 1.5em;
  border-radius: 5px;
  font-weight: bold;
  // margin-top: 0.5em;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const SceneButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1em;
`  

const LeftHalf = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({ text: "", sceneId: "" });
  const [generatedButtons, setGeneratedButtons] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleFormToggle = () => {
    setFormVisible(!formVisible);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Generate a new button with the input text
    setGeneratedButtons((prevButtons) => [
      ...prevButtons,
      { text: formData.text, sceneId: formData.sceneId },
    ]);

    setFormData({ text: "", sceneId: "" });
    setFormVisible(false);
  };

  return (
    <Wrapper>
      <ImageUpload onClick={(e) => e.stopPropagation()}>
        {uploadedImage ? <img src={uploadedImage} alt="Uploaded preview" /> : <p>Click to upload an image</p>}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </ImageUpload>
      <TextInput placeholder="Tell your story" />
      

      {formVisible && (
        <FormWrapper>
          <label>
            Text:
            <input
              type="text"
              name="text"
              value={formData.text}
              onChange={handleFormChange}
              placeholder="Enter button text"
            />
          </label>
          <label>
            Scene ID:
            <input
              type="text"
              name="sceneId"
              value={formData.sceneId}
              onChange={handleFormChange}
              placeholder="Enter scene ID"
            />
          </label>
          <button onClick={handleFormSubmit}>Save</button>
        </FormWrapper>
      )}

      <SceneButtonsWrapper>
      {generatedButtons.map((button, index) => (
        <GeneratedButton key={index}>
          {button.text} - Scene ID: {button.sceneId}
        </GeneratedButton>
        
      ))}
      <ButtonCreator onClick={handleFormToggle}>+</ButtonCreator>
      </SceneButtonsWrapper>
    </Wrapper>
  );
};

export default LeftHalf;
