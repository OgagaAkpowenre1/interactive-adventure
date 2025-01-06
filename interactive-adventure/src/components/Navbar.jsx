import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <nav>
      
        <Link to={'/'}>Home</Link>
        <Link to={'/editor'}>Story Editor</Link>
        <Link to={'/stories'}>Story List</Link>
      
    </nav>
  );
};

export default Navbar;
