import styled from "styled-components";
import SceneList from "./SceneList";
import EditorButtons from "./EditorButtons";

const Wrapper = styled.div`
//   position: fixed;
//   left: 70%;
//   top: 15%;

    @media (max-width: 768px) {
    display: none;
  }
`;

const RightHalf = () => {
  return (
    <Wrapper>
      <h3>Select Scenes</h3>
      <SceneList
        scenes={[
          { previewImage: "https://wallpapercave.com/wp/wp7135795.jpg" },
          { previewImage: "https://wallpapercave.com/wp/wp7135795.jpg" },
          { previewImage: "https://wallpapercave.com/wp/wp7135795.jpg" },
          { previewImage: "https://wallpapercave.com/wp/wp7135795.jpg" },
        ]}
      />
      <EditorButtons />
    </Wrapper>
  );
};

export default RightHalf;
