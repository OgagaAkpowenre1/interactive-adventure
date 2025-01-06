import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoImg = styled.img`
  width: 50px;
  height: 50px;
`

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const LinkList = styled.ul`
  display: flex;
`

const Navbar = () => {
  return (
    <NavWrapper>
      <LogoImg />

      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/editor"}>Story Editor</Link>
        </li>
        <li>
          <Link to={"/stories"}>Story List</Link>
        </li>
        <li>
          <Link to={"/reader/:sceneId"}>Scene Reader</Link>
        </li>
      </ul>
    </NavWrapper>
  );
};

export default Navbar;
