import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const SwitcherButton = styled.button`
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.textColor};
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  margin: 10px;
  z-index: 999;
  position: absolute;
  bottom: 0px;
  right: 0%
`;

const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useTheme();

  return <SwitcherButton onClick={toggleTheme}>
    {mode === "light" ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
  </SwitcherButton>;
};

export default ThemeSwitcher;
