import React from "react";
import styled from "styled-components";

// InfoBar contains rating, genre list, reading time

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between
    align-items: center;
    margin: 1rem 0rem;
`;
const Ratings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GenreList = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 1em;

     ul {
        list-style-type: none;
        display: flex;
        align-items: left;

        button {
            background-color: transparent;
            border-radius: 12px;
            border: 1px solid pink;
            padding: 0.4em 0.8em;
            margin-right: 1em;

            a {
                text-decoration: none;
                color: ${(props) => props.theme.textColor};
                font-size: 0.5em
                font-weight: bold;
            }    
        }
    }   
`;

const ReadingTime = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto 1em;

  i {
    padding-right: 0.5em;
  }
`;

const InfoBar = () => {
  return (
    <Wrapper>
      <Ratings>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
        <i className="fa-solid fa-star"></i>
      </Ratings>
      <ReadingTime>
        <i className="fa-solid fa-clock"></i>
        <p>20 minutes</p>
      </ReadingTime>
      <GenreList>
        <ul>
          <li>
            <button>
              <a href="#">Horror</a>
            </button>
          </li>
          <li>
            <button>
              <a href="#">Fantasy</a>
            </button>
          </li>
          <li>
            <button>
              <a href="#">Suspense</a>
            </button>
          </li>
        </ul>
      </GenreList>
    </Wrapper>
  );
};

export default InfoBar;
