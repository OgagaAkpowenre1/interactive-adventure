import React from "react";
import styled from 'styled-components';
import { useTheme } from "styled-components";


const SceneButton = styled.button`
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

const Button = ({buttonText}) => {

    return (
        <SceneButton onClick={() => console.log(buttonText)}>{buttonText}</SceneButton>
    )
}

export default Button