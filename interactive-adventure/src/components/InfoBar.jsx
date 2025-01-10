import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";



// InfoBar contains rating, genre list, reading time

const Frame = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Ratings = styled.div`

`

const GenreList = styled.div`

`

const ReadingTime = styled.div`

`

const InfoBar = () => {
    return(
        <>
        This is the InfoBar
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
                    <li>Horror</li>
                    <li>Fantasy</li>
                    <li>Suspense</li>
                </ul>
            </Frame>
        </>
    )
}

export default InfoBar