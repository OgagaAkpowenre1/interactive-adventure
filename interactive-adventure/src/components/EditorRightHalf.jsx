import styled from "styled-components";
import SceneList from "./SceneList";

const Wrapper = styled.div`
  position: fixed;
  left: 70%;
`;

const ButtonWrapper = styled.div`
    margin-top: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr;
    // flex-direction: column;
    // align-items: center;

    button {
        // width: 50%;
        margin: 0.8em auto;
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
      <ButtonWrapper>
        <button>Save</button>
        <button>Discard</button>
        <button>Preview</button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default RightHalf;
