import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoImg = styled.img`
  width: 50px;
  height: 50px;
  // flex: 1;
`

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 100vw;
`

const LinkList = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: space-between;
  // flex: 3;
  align-items: center;
`

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.listColor};
  text-decoration: none; /* Remove underline */
  padding: 0.5rem;

  &:hover {
    color: ${(props) => props.theme.primaryColor}; /* Optional hover effect */
  }
`


const Navbar = () => {
  return (
    <NavWrapper>
      <LogoImg />

      <LinkList>
        <li>
          <StyledLink to={"/"}>Home</StyledLink>
        </li>
        <li>
          <StyledLink to={"/editor"}>Story Editor</StyledLink>
        </li>
        <li>
          <StyledLink to={"/stories"}>Story List</StyledLink>
        </li>
        <li>
          <StyledLink to={"/reader/:sceneId"}>Scene Reader</StyledLink>
        </li>
      </LinkList>
    </NavWrapper>
  );
};

export default Navbar;
