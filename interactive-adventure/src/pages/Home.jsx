import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.h1`
  color: ${(props) => props.theme.primaryColor};
  text-align: center;
`;

const Home = () => {
  return (<div>
    <Title>Welcome!</Title>
    <nav>
    {/* <Link to={'/editor'}>Story Editor</Link>
    <Link to={'/stories'}>Stories</Link>
    <Link to={'/reader/1'}>Reader</Link> */}
    </nav>
  </div>);
};

export default Home;
