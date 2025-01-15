import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1em;
  padding: 1em;
  background-color: #f9f9f9;
  border-bottom: 2px solid #ddd;

  h1 {
    margin: 0 0 0.5em;
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
    color: #333;
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

  const handleBlur = () => {
    setIsEditing(false); // Exit edit mode on blur
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false); // Exit edit mode on Enter
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
