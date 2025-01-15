import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Parkinsans:wght@300..800&display=swap');
  
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%; /* Ensures full height usage */
    width: 100%;  /* Ensures full width usage */
    overflow-x: hidden; /* Prevent horizontal scroll */
  }

  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.textColor};
    font-family: ${(props) => props.theme.fontFamily};
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  button {
    font-family: ${(props) => props.theme.fontFamily};
  }


  import { createGlobalStyle } from "styled-components";


  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
}

`;

export default GlobalStyles;
