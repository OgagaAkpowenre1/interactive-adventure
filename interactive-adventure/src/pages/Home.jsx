import React from 'react';
import styled from 'styled-components';

const Title = styled.h1`
  color: ${(props) => props.theme.primaryColor};
  text-align: center;
`;

const Home = () => {
  return <Title>Welcome to the IA!</Title>;
};

export default Home;
