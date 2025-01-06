import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const SwitcherButton = styled.button`
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
`;

const ThemeSwitcher = () => {
  const { toggleTheme } = useTheme();

  return <SwitcherButton onClick={toggleTheme}>Toggle Theme</SwitcherButton>;
};

export default ThemeSwitcher;
