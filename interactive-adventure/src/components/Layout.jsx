import React from 'react';
import styled from 'styled-components';
import ThemeSwitcher from './ThemeSwitcher';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
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
