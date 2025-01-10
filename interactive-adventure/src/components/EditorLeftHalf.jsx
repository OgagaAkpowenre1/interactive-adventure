import styled from "styled-components";

const Wrapper = styled.div`

`

const ImageUpload = styled.div`
    min-width: 500px;
    min-height: 500px
`

const TextInput = styled.input``

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

const LeftHalf = () => {
    return(<Wrapper>
        <ImageUpload>

        </ImageUpload>
        <TextInput>

        </TextInput>
        <ButtonCreator>
            +
        </ButtonCreator>
    </Wrapper>)
}

export default LeftHalf