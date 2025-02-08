import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStoryContext } from "../contexts/storyContext";

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

// const LeftHalf = ({formData}) => {
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [formVisible, setFormVisible] = useState(false);
//   const [formData, setFormData] = useState({ text: "", sceneTitle: "" });
//   const [generatedButtons, setGeneratedButtons] = useState([]);
//   const { addGeneratedScene,  sceneData } = useStoryContext(); // Access context function to add scenes


//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setUploadedImage(imageUrl);
//     }
//     sceneData.image = ""
//   };

//   const handleFormToggle = () => {
//     setFormVisible(!formVisible);
//   };

//   const handleFormChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     // Generate a new button with the input text
//     setGeneratedButtons((prevButtons) => [
//       ...prevButtons,
//       { text: formData.text, sceneTitle: formData.sceneTitle },
//     ]);
//     sceneData.options.push(formData)
//     setFormData({ sceneContent: "", sceneTitle: "" });
    
//     setFormVisible(false);
//   };

//   return (
//     <Wrapper>
//       <ImageUpload onClick={(e) => e.stopPropagation()}>
//         {uploadedImage ? <img src={uploadedImage} alt="Uploaded preview" /> : <p>Click to upload an image</p>}
//         <input type="file" accept="image/*" onChange={handleImageUpload} />
//       </ImageUpload>
//       <TextInput placeholder="Tell your story" value={formData.sceneContent}
//         onChange={handleFormChange} />
      

//       {formVisible && (
//         <FormWrapper>
//           <label>
//             Text:
//             <input
//               type="text"
//               name="text"
//               value={formData.text}
//               onChange={handleFormChange}
//               placeholder="Enter button text"
//             />
//           </label>
//           <label>
//             Scene Title:
//             <input
//               type="text"
//               name="sceneTitle"
//               value={formData.sceneTitle}
//               onChange={handleFormChange}
//               placeholder="Enter scene Title"
//             />
//           </label>
//           <button onClick={handleFormSubmit}>Save</button>
//         </FormWrapper>
//       )}

//       <SceneButtonsWrapper>
//       {generatedButtons.map((button, index) => (
//         <GeneratedButton key={index}>
//           {button.text} - Scene Title: {button.sceneTitle}
//         </GeneratedButton>
        
//       ))}
//       <ButtonCreator onClick={handleFormToggle}>+</ButtonCreator>
//       </SceneButtonsWrapper>
//     </Wrapper>
//   );
// };

// const LeftHalf = ({ formData, setFormData }) => {
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [formVisible, setFormVisible] = useState(false);
//   const [optionData, setOptionData] = useState({ text: "", sceneTitle: "" });
//   const {scenes, setScenes} = useStoryContext()
//   const [availableScenes, setAvailableScenes] = useState([]);

//     // When scene changes, update the displayed image
//     useEffect(() => {
//       if (formData.imageFile instanceof File) {
//         // Show preview if a new image was uploaded
//         setUploadedImage(URL.createObjectURL(formData.imageFile));
//       } else {
//         // Otherwise, show the scene's existing image
//         setUploadedImage(formData.imageFile || null);
//       }
//     }, [formData.imageFile, formData.image]);


// useEffect(() => {
//   // const fetchScenes = async () => {
//   //   try {
//   //     const response = await fetch(`/stories/${formData.storyId}/scenes`);
//   //     const data = await response.json();
//   //     setAvailableScenes(data);
//   //   } catch (error) {
//   //     console.error("Error fetching scenes:", error);
//   //   }
//   // };
//   // fetchScenes();
//   setAvailableScenes(scenes)
// }, []);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setUploadedImage(imageUrl);
//       setFormData((prev) => ({ ...prev, imageFile: file }));
//     }
//   };

//   const handleFormToggle = () => {
//     setFormVisible(!formVisible);
//   };

//   // const handleOptionChange = (event) => {
//   //   const { name, value } = event.target;
//   //   setOptionData((prev) => ({ ...prev, [name]: value }));
//   // };
//   const handleOptionChange = (event) => {
//     const { name, value } = event.target;
    
//     if (name === "sceneTitle") {
//       const selectedScene = availableScenes.find(scene => scene.sceneTitle === value);
//       setOptionData((prev) => ({
//         ...prev,
//         sceneTitle: value,
//         nextScene: selectedScene ? selectedScene._id : null, // Use ID instead of title
//       }));
//     } else {
//       setOptionData((prev) => ({ ...prev, [name]: value }));
//     }
//   };
  

//   const handleDeleteOption = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       options: prev.options.filter((_, i) => i !== index),
//     }));
//   };
  

//   // const handleOptionSubmit = (event) => {
//   //   event.preventDefault();

//   //   if (!optionData.text || !optionData.sceneTitle) return;

//   //   // Add the new option to the scene's options list
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     options: [...prev.options, optionData], // Append new option
//   //   }));

//   //   setOptionData({ text: "", sceneTitle: "" });
//   //   setFormVisible(false);
//   // };
//   const handleOptionSubmit = (event) => {
//     event.preventDefault();
  
//     if (!optionData.text || !optionData.sceneTitle) return;
  
//     const selectedScene = availableScenes.find(scene => scene.sceneTitle === optionData.sceneTitle);
  
//     const newOption = {
//       text: optionData.text,
//       nextScene: selectedScene ? selectedScene._id : null,
//       sceneTitle: optionData.sceneTitle,
//     };
  
//     setFormData((prev) => ({
//       ...prev,
//       options: [...prev.options, newOption],
//     }));
  
//     setOptionData({ text: "", sceneTitle: "" });
//     setFormVisible(false);
//   };
  
  

  

//   return (
//     <Wrapper>
//       <ImageUpload>
//         {uploadedImage ? <img src={uploadedImage} alt="Uploaded preview" /> : <p>Click to upload an image</p>}
//         <input type="file" accept="image/*" onChange={handleImageUpload} />
//       </ImageUpload>

//       <TextInput
//         name="sceneContent"
//         placeholder="Tell your story"
//         value={formData.sceneContent || ""}
//         onChange={(e) => setFormData({ ...formData, sceneContent: e.target.value })}
//       />

//       {formVisible && (
//         <FormWrapper>
//           {/* <label>
//             Text:
//             <input
//               type="text"
//               name="text"
//               value={optionData.text}
//               onChange={handleOptionChange}
//               placeholder="Enter button text"
//             />
//           </label>
//           <label>
//             Scene Title:
//             <input
//               type="text"
//               name="sceneTitle"
//               value={optionData.sceneTitle}
//               onChange={handleOptionChange}
//               placeholder="Enter scene Title"
//             />
//           </label> */}

// <label>
//   Scene Title:
//   <select
//     name="sceneTitle"
//     value={optionData.sceneTitle}
//     onChange={handleOptionChange}
//   >
//     <option value="">Create New Scene</option>
//     <label>
//   Text:
//   <input
//     type="text"
//     name="text"
//     value={optionData.text}
//     onChange={handleOptionChange}
//     placeholder="Enter button text"
//   />
// </label>
//     {availableScenes.map((scene) => (
//       <option key={scene._id} value={scene.sceneTitle}>
//         {scene.sceneTitle}
//       </option>
//     ))}
//   </select>
// </label>

// {/* Show the manual input only when "Create New Scene" is selected */}
// {!optionData.sceneTitle && (
//   <FormWrapper><label>
//   Text:
//   <input
//     type="text"
//     name="text"
//     value={optionData.text}
//     onChange={handleOptionChange}
//     placeholder="Enter button text"
//   />
// </label>
// <label>
//   Scene Title:
//   <input
//     type="text"
//     name="sceneTitle"
//     value={optionData.sceneTitle}
//     onChange={handleOptionChange}
//     placeholder="Enter scene Title"
//   />
//   </label>
//   </FormWrapper>
// )}


//           <button onClick={handleOptionSubmit}>Save</button>
//         </FormWrapper>
//       )}

//       <SceneButtonsWrapper>
//         {formData.options.map((button, index) => (
//           // <GeneratedButton key={index}>
//           //   {button.text} → {button.nextScene?.sceneTitle || "Unknown Scene"}
//           //   <i className="fa-trash"></i>
//           // </GeneratedButton>
//           <GeneratedButton key={index}>
//   {button.text} → {button.nextScene ? availableScenes.find(s => s._id === button.nextScene)?.sceneTitle || "Unknown Scene" : "New Scene"}
//   <i className="fas fa-trash" onClick={() => handleDeleteOption(index)} style={{ cursor: "pointer", marginLeft: "10px" }}></i>
// </GeneratedButton>

//         ))}
//         <ButtonCreator onClick={handleFormToggle}>+</ButtonCreator>
//       </SceneButtonsWrapper>

//       <input 
//   type="checkbox" 
//   name="isPlaceholder" 
//   checked={!!formData.isPlaceholder} // Ensure boolean value
//   onChange={(e) => setFormData(prev => ({ ...prev, isPlaceholder: e.target.checked }))}
// />
// <label htmlFor="isPlaceholder">Placeholder scene</label>

// <input 
//   type="checkbox" 
//   name="isEnd" 
//   checked={!!formData.isEnd} // Ensure boolean value
//   onChange={(e) => setFormData(prev => ({ ...prev, isEnd: e.target.checked }))}
// />
// <label htmlFor="isEnd">Ending scene</label>

//     </Wrapper>
//   );
// };


// export default LeftHalf;
const LeftHalf = ({ formData, setFormData }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const { scenes, setScenes } = useStoryContext();
  const [optionData, setOptionData] = useState({ text: "", sceneTitle: "", nextScene: null });
  const [creatingNewScene, setCreatingNewScene] = useState(false);
  const [isCreatingNewScene, setIsCreatingNewScene] = useState(false);

  // Update the displayed image when scene changes
  useEffect(() => {
    if (formData.imageFile instanceof File) {
      setUploadedImage(URL.createObjectURL(formData.imageFile));
    } else {
      setUploadedImage(formData.imageFile || null);
    }
  }, [formData.imageFile]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, imageFile: file }));
    }
  };

  // Handle form visibility toggle
  const handleFormToggle = () => {
    setFormVisible(!formVisible);
    setCreatingNewScene(false); // Reset selection when reopening
    setOptionData({ text: "", sceneTitle: "", nextScene: null });
  };

  // Handle input changes for option text and scene selection
  const handleOptionChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "sceneTitle") {
      if (value === "NEW_SCENE") {
        setIsCreatingNewScene(true);
        setOptionData((prev) => ({
          ...prev,
          sceneTitle: "", // Keep empty so user can type
          nextScene: null,
        }));
      } else if (!isCreatingNewScene) { 
        // Only update if not creating a new scene
        setIsCreatingNewScene(false);
        const selectedScene = scenes.find(scene => scene.sceneTitle === value);
        setOptionData((prev) => ({
          ...prev,
          sceneTitle: value,
          nextScene: selectedScene ? selectedScene._id : null,
        }));
      }
    } else {
      setOptionData((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  // Handle option submission
  const handleOptionSubmit = (event) => {
    event.preventDefault();
    if (!optionData.text || (!optionData.sceneTitle && !creatingNewScene)) return;

    const newOption = {
      text: optionData.text,
      sceneTitle: optionData.sceneTitle,
      nextScene: creatingNewScene ? null : optionData.nextScene, // If new scene, keep nextScene null for now
    };

    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }));

    setFormVisible(false);
    setCreatingNewScene(false)
    setIsCreatingNewScene(false)
    setOptionData({ text: "", sceneTitle: "", nextScene: null });
  };

  // Handle option deletion
  const handleDeleteOption = (index) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  return (
    <Wrapper>
      {/* Image Upload */}
      <ImageUpload>
        {uploadedImage ? <img src={uploadedImage} alt="Uploaded preview" /> : <p>Click to upload an image</p>}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </ImageUpload>

      {/* Scene Content Input */}
      <TextInput
        name="sceneContent"
        placeholder="Tell your story"
        value={formData.sceneContent || ""}
        onChange={(e) => setFormData({ ...formData, sceneContent: e.target.value })}
      />

      {/* Option Creation Form */}
      {formVisible && (
        <FormWrapper>
          {/* Button Text Input */}
          <label>Option Text:</label>
<input
  type="text"
  name="text"
  value={optionData.text}
  onChange={handleOptionChange}
  placeholder="Enter button text"
/>

         {/* Scene Selection */}
<label>Scene Title:</label>
<select name="sceneTitle" value={isCreatingNewScene ? "NEW_SCENE" : optionData.sceneTitle} onChange={handleOptionChange}>
  <option value="">Select a Scene</option>
  <option value="NEW_SCENE">Create New Scene</option>
  {scenes.map((scene) => (
    <option key={scene._id} value={scene.sceneTitle}>
      {scene.sceneTitle}
    </option>
  ))}
</select>

{/* Show text input only if creating a new scene */}
{isCreatingNewScene && (
  <input
    type="text"
    name="sceneTitle"
    value={optionData.sceneTitle}
    onChange={(e) => setOptionData(prev => ({ ...prev, sceneTitle: e.target.value }))}
    placeholder="Enter new scene title"
  />
)}


          <button onClick={handleOptionSubmit}>Save</button>
        </FormWrapper>
      )}

      {/* Option Buttons */}
      <SceneButtonsWrapper>
        {formData.options.map((button, index) => (
          <GeneratedButton key={index}>
            {button.text} → {button.nextScene ? scenes.find((s) => s._id === button.nextScene)?.sceneTitle || "Unknown Scene" : "New Scene"}
            <i className="fas fa-trash" onClick={() => handleDeleteOption(index)} style={{ cursor: "pointer", marginLeft: "10px" }}></i>
          </GeneratedButton>
        ))}
        <ButtonCreator onClick={handleFormToggle}>+</ButtonCreator>
      </SceneButtonsWrapper>

      {/* Checkbox Inputs */}
      <input
        type="checkbox"
        name="isPlaceholder"
        checked={!!formData.isPlaceholder}
        onChange={(e) => setFormData((prev) => ({ ...prev, isPlaceholder: e.target.checked }))}
      />
      <label htmlFor="isPlaceholder">Placeholder scene</label>

      <input
        type="checkbox"
        name="isEnd"
        checked={!!formData.isEnd}
        onChange={(e) => setFormData((prev) => ({ ...prev, isEnd: e.target.checked }))}
      />
      <label htmlFor="isEnd">Ending scene</label>

      <input 
      type="checkbox"
      name="isStart"
      checked={!!formData.isStartingScene}
      onChange={(e) => setFormData((prev) => ({ ...prev, isStartingScene: e.target.checked }))}
    />
    <label htmlFor="isStart">Starting scene</label>
    </Wrapper>
  );
};

export default LeftHalf;
