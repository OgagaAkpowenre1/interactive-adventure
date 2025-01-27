import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useStoryContext } from "../contexts/storyContext";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1em;
  padding: 1em;
  background-color: ${(props) => props.theme.backgroundColor};
//   border-bottom: 2px solid #ddd;

  h1 {
    margin: 0 0 0.5em;
    // color: ${(props) => props.theme.textColor}
  }

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SceneIdWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;


  span {
    font-size: 1.2em;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  input {
    font-size: 1.2em;
    padding: 0.2em 0.5em;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const EditorHeader = ({ storyTitle, storyId }) => {
  const [sceneId, setSceneId] = useState(""); // Store the scene ID
  const [isEditing, setIsEditing] = useState(false); // Toggle between display and edit mode
  const {sceneData} = useStoryContext()

  const handleBlur = () => {
    setIsEditing(false); // Exit edit mode on blur
    sceneData.sceneTitle = sceneId
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false); // Exit edit mode on Enter
      sceneData.sceneTitle = sceneId
    }
  };

  return (
    <HeaderWrapper>
      
      <Link to={`/story/${storyId}`}><h1>{storyTitle}</h1></Link>
      <SceneIdWrapper>
        {isEditing ? (
          <input
            type="text"
            value={sceneId}
            onChange={(e) => setSceneId(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span onClick={() => setIsEditing(true)}>
            {sceneId || "Click to enter Scene ID"}
          </span>
        )}
      </SceneIdWrapper>
    </HeaderWrapper>
  );
};

export default EditorHeader;
