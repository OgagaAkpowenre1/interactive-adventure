import styled from "styled-components";
import SceneList from "./SceneList";
import EditorButtons from "./EditorButtons";
import { useStoryContext } from "../contexts/storyContext";

const Wrapper = styled.div`
//   position: fixed;
//   left: 70%;
//   top: 15%;
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 768px) {
    // display: ;
  }
`;

const RightHalf = ({formData, setFormData}) => {
  const {scenes, setScenes, sceneData} = useStoryContext()
  // console.log(scenes)

  // const safeScenes = Array.isArray(scenes) ? scenes : [];

  // Check if scenes is an empty array
  // if (!scenes || scenes.length === 0) {
  //   return <p>No scenes available.</p>;
  // }

  return (
    <Wrapper>
      <h3>Select Scenes</h3>
      { scenes.length === 0 ? <p>No scenes available.</p> :<SceneList
        scenes={scenes} setFormData={setFormData}
      />}
      <EditorButtons formData={formData} />
    </Wrapper>
  );
};

export default RightHalf;
