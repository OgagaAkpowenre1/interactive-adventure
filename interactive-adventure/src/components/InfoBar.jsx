import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";



// InfoBar contains rating, genre list, reading time

const Wrapper = styled.div`
    display: flex;
    justify-content: space-betwee
`

const Frame = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    ul {
        list-style-type: none;
        display: flex;
        // justify-content: space-between;
        align-items: left;

        button {
            background-color: transparent;
            border-radius: 12px;
            border: 1px solid pink;
            padding: 0.4em 0.8em;
            font-size: 0.5em;

            a {
                text-decoration: none;
                color: black;
            }    
        }

    }
`

const Ratings = styled.div`

`

const GenreList = styled.div`

`

const ReadingTime = styled.div`

`

const InfoBar = () => {
    return(
        <Frame>
        
            <Frame>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
            </Frame>
            <Frame>
                <i className="fa-solid fa-clock"></i>
                <p>20 minutes</p>
            </Frame>
            <Frame>
                <ul>
                    <li><button><a href="#">Horror</a></button></li>
                    <li><button><a href="#">Fantasy</a></button></li>
                    <li><button><a href="#">Suspense</a></button></li>
                </ul>
            </Frame>
        </Frame>
    )
}

export default InfoBar