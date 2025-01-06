import React from 'react';
import styled from 'styled-components';
import ThemeSwitcher from './ThemeSwitcher';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  align-items: center;
  // padding: 20px;
  min-height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
  // justify-content: center;
`;

const Layout = ({ children }) => {
  return (
    <Wrapper>
      <ThemeSwitcher />
      {children}
    </Wrapper>
  );
};

export default Layout;
