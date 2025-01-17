import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  margin-top: 1em;
  font-size: 0.9em;
  color: #555;

  span {
    background: #f0f0f0;
    border-radius: 4px;
    padding: 0.2em 0.5em;
    background-color: transparent;
    border-radius: 12px;
    border: 1px solid pink;
    padding: 0.4em 0.8em;
    margin-right: 1em;
    text-transform: capitalize;
  }
`;

const InfoBar = ({ readingTime, genres, rating }) => {
  return (
    <Wrapper>
      <span>Reading Time: {readingTime} mins</span>
      <span>Rating: {rating}/5</span>
      {genres.map((genre, index) => (
        <span key={index}><a href="#">{genre}</a></span>
      ))}
    </Wrapper>
  );
};

export default InfoBar;
