import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
//   align-items: center;
  width: 100%;
  float: left;
  

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const ImageUpload = styled.div`
  width: 100%;
  min-height: 200px;
  margin-bottom: 1em;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (min-width: 768px) {
    min-width: 500px;
    min-height: 500px;
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
  width: 100%;
  padding: 0.5em;
  margin-bottom: 1em;
`;

const ButtonCreator = styled.button`
  background-color: ${(props) => props.theme.buttonBackgroundColor};
  color: ${(props) => props.theme.buttonColor};
  border: 2px solid ${(props) => props.theme.borderColor};
  padding: 0.8em 2.5em;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: fadeIn 0.5s ease-in forwards;
  animation-delay: ${(props) => props.delay}s;

  width: 100%; /* Full width on mobile */

  @media (min-width: 768px) {
    width: auto; /* Default size for larger screens */
  }

  /* Boxy Shadow Effect */
  box-shadow: 4px 4px 0 ${(props) => props.theme.shadowColor},
              -2px -2px 0 ${(props) => props.theme.highlightColor};
  transition: all 0.2s ease-in-out;

  &:hover {
    /* Slight hover effect */
    background-color: ${(props) => props.theme.hoverBackgroundColor};
  }

  &:active {
    /* Pressed-down effect */
    box-shadow: 2px 2px 0 ${(props) => props.theme.shadowColor},
                -1px -1px 0 ${(props) => props.theme.highlightColor};
    transform: translate(2px, 2px);
  }
`;

const FormWrapper = styled.div`
  margin-top: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%;
  display:flex;
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
`

const LeftHalf = () => {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [formVisible, setFormVisible] = useState(false)
  const [formData, setFormData] = useState({text: "", sceneId: ""})

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
    console.log("Form submitted:", formData);
    setFormData({ text: "", sceneId: "" });
    setFormVisible(false);
  };

    return(<Wrapper>
        <ImageUpload>
          {uploadedImage ? <img src={uploadedImage} alt="previewImage" /> : <p>Click to upload image</p>}
          <input type="file" name="sceneImage" accept="image/*" onChange={handleImageUpload} />
        </ImageUpload>
        <TextInput>

        </TextInput>
        <ButtonCreator onClick={handleFormToggle}>+</ButtonCreator>

        {formVisible && (
        <FormWrapper>
          <label>
            Text:
            <input
              type="text"
              name="text"
              value={formData.text}
              onChange={handleFormChange}
              placeholder="Enter text"
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

    </Wrapper>)
}

export default LeftHalf