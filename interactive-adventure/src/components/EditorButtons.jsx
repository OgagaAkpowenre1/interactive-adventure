import React, { useState } from "react";
import styled from "styled-components";
import { useStoryContext } from "../contexts/storyContext";
import axiosInstance from "../api";

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  margin-top: 1em;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;

  button {
    flex: 1;
    padding: 1em;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    transition: background-color 0.2s ease-in-out;

    &.save {
      background-color: #4caf50;

      &:hover {
        background-color: #45a049;
      }
    }

    &.delete {
      background-color: #f44336;

      &:hover {
        background-color: #d32f2f;
      }
    }
  }
`;

const PreviewButton = styled.button`
  width: 100%;
  padding: 1em;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  background-color: #2196f3;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #1976d2;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2em;
  border-radius: 10px;
  text-align: center;

  h3 {
    margin-bottom: 1em;
  }

  button {
    margin: 0 0.5em;
    padding: 0.5em 1em;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &.confirm {
      background-color: #f44336;
      color: white;

      &:hover {
        background-color: #d32f2f;
      }
    }

    &.cancel {
      background-color: #9e9e9e;
      color: white;

      &:hover {
        background-color: #757575;
      }
    }
  }
`;

const EditorButtons = ({formData}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const {sceneData, selectedStory} = useStoryContext()

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setModalOpen(false);
    console.log("Deleted!");
  };

  // const submitScene =  async (sceneData) => {
  //   try {
  //     const response = await axiosInstance.post(`/scenes/${selectedStory._id}/createScene`, sceneData)
  //     console.log(response.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const submitScene = async () => {
    try {
      const sceneFormData = new FormData();
      sceneFormData.append("sceneTitle", formData.sceneTitle);
      sceneFormData.append("sceneContent", formData.sceneContent);
      sceneFormData.append("options", JSON.stringify(formData.options));

      if (formData.imageFile) {
        sceneFormData.append("image", formData.imageFile);
      }

      const response = await axiosInstance.post(`/scenes/${selectedStory._id}/createScene`, sceneFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Scene created:", response.data);
    } catch (error) {
      console.error("Error submitting scene:", error);
    }
  };


  return (
    <>
      <ButtonWrapper>
        <ActionButtons>
          <button className="save" onClick={() => submitScene(sceneData)}>Save</button>
          <button className="delete" onClick={handleDeleteClick}>
            Delete
          </button>
        </ActionButtons>
        <PreviewButton>Preview</PreviewButton>
      </ButtonWrapper>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Are you sure you want to delete this?</h3>
            <button className="confirm" onClick={handleConfirmDelete}>
              Confirm
            </button>
            <button className="cancel" onClick={handleCancelDelete}>
              Cancel
            </button>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default EditorButtons;
