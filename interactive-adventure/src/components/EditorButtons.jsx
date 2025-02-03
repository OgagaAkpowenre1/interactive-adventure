import React, { useState } from "react";
import styled from "styled-components";
import { useStoryContext } from "../contexts/storyContext";
import axiosInstance from "../api";
import toast from "react-hot-toast";

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

    &.update {
      background-color: rebeccapurple;

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
  const {scenes, sceneData, selectedStory, selectedScene, setSelectedScene, fetchAllScenes} = useStoryContext()

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleCancelDelete = () => {
    setModalOpen(false);
  };

  const handleConfirmDelete = () => {
    setModalOpen(false);
    deleteScene()
    // console.log("Deleted!");
  };

  const submitScene = async () => {
    try {
      console.log(formData)
      const sceneFormData = new FormData();
      sceneFormData.append("sceneTitle", formData.sceneTitle);
      sceneFormData.append("sceneContent", formData.sceneContent);
      sceneFormData.append("options", JSON.stringify(formData.options));

      if (formData.imageFile) {
        sceneFormData.append("imageFile", formData.imageFile);
      }

      const response = await axiosInstance.post(`/scenes/${selectedStory._id}/createScene`, sceneFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Scene created:", response.data);
      fetchAllScenes()
      toast.success("Scene saved successfully")
    } catch (error) {
      console.error("Error submitting scene:", error);
      toast.error("Failed to create scene!")
    }
  };

  // const updateScene = async () => {
  //   try {
  //     console.log(selectedScene)

  //     const updatedData = {
  //       sceneTitle: formData.sceneTitle,
  //       sceneContent: formData.sceneContent,
  //       options: formData.options,
  //       image: formData.imageFile,
  //     };

  //     const response = await axiosInstance.put(`/scenes/${selectedStory._id}/${selectedScene._id}/edit`, updatedData)
  //     console.log("scene updated", response.data)
  //     setSelectedScene(response.data)
  //     fetchAllScenes()
  //     toast.success("Scene updated successfully")
  //   } catch (error) {
  //     console.error("Error updating scene", error)
  //     toast.error("Failed to update scene")
  //   }
  // }

const updateScene = async () => {
    try {
        console.log("Updating scene:", selectedScene);

        const formDataToSend = new FormData();
        formDataToSend.append("sceneTitle", formData.sceneTitle);
        formDataToSend.append("sceneContent", formData.sceneContent);
        formDataToSend.append("isEnd", formData.isEnd);
        formDataToSend.append("isPlaceholder", formData.isPlaceholder);

        // Append options as a JSON string since FormData doesn't handle objects well
        formDataToSend.append("options", JSON.stringify(formData.options));

        // Only append the image if a new one was uploaded
        if (formData.imageFile instanceof File) {
            formDataToSend.append("imageFile", formData.imageFile);
        }
        console.log(formDataToSend)
        const response = await axiosInstance.put(
            `/scenes/${selectedStory._id}/${selectedScene._id}/edit`, 
            formDataToSend, 
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        
        console.log("Scene updated:", response.data);
        setSelectedScene(response.data);
        fetchAllScenes();
        toast.success("Scene updated successfully");
    } catch (error) {
        console.error("Error updating scene", error);
        toast.error("Failed to update scene");
    }
};

  const forceDeleteScene = async (sceneId) => {
    try {
        await axiosInstance.delete(`/scenes/${selectedStory._id}/${sceneId}/delete?force=true`);
        // setScenes((prev) => prev.filter((scene) => scene._id !== sceneId));
        console.log("Scene deleted forcefully");
        toast.success("Scene deleted forcefully")
        setSelectedScene(scenes[-1])
    } catch (error) {
        console.error("Error force-deleting scene", error);
        toast.error("An error occurred!")
    }
};

  const deleteScene = async () => {
    try {
      console.log(selectedScene)
      const response = await axiosInstance.delete(`/scenes/${selectedStory._id}/${selectedScene._id}/delete`)
      console.log("Deleted scene")
      fetchAllScenes()

      setSelectedScene(scenes[-1])
      toast.success("Deleted scene successfully!")
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.referencedBy) {
          const confirmDelete = window.confirm(
              `This scene is referenced by: ${error.response.data.referencedBy.join(", ")}. Are you sure you want to delete it?`
          );

          if (confirmDelete) {
              forceDeleteScene(selectedScene._id);
          }
      } else {
          console.error("Error deleting scene", error);
          toast.error("Error deleting scene")
      }
  }
  }



  return (
    <>
      <ButtonWrapper>
        <ActionButtons>
          <button className="save" onClick={() => submitScene(sceneData)}>Save</button>
          <button className="delete" onClick={handleDeleteClick}>
            Delete
          </button>
          <button className="update" onClick={()=> updateScene()}>Update</button>
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
