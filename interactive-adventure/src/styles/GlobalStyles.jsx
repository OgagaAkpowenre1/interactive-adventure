import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    font-family: ${(props) => props.theme.fontFamily};
    margin: 0;
    padding: 0;
  }

  button {
    font-family: ${(props) => props.theme.fontFamily};
  }
`;

export default GlobalStyles;
