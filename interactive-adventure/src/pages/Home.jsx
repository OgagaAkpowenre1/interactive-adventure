import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.primaryColor};
  text-align: center;
`;

const Home = () => {
  return (<>
    <Title>Welcome!</Title>
    <nav>
    {/* <Link to={'/editor'}>Story Editor</Link>
    <Link to={'/stories'}>Stories</Link>
    <Link to={'/reader/1'}>Reader</Link> */}
    </nav>
  </>);
};

export default Home;
