import React from "react";
import styled from "styled-components";
import StoryListItem from "../components/StoryListItem";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import testStory from "../testData";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const Wrapper = styled.div`
  margin-bottom: 2em;

    h3 {
      margin: 1rem auto;
      font-weight: bold;
      text-align: center;
    }
`;

const List = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const listVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between child animations
    },
  },
};

const itemVariants = {
  hidden: {
    x: "100%", // Start off-screen to the right
    opacity: 0,
  },
  visible: {
    x: 0, // Move into place
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 50, // Controls the bounce effect
    },
  },
};

const StoryList = () => {
  return (
    <>
    <Wrapper>
      <h3>This is the story list</h3>
      <List
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(9)].map((_, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link to={"/story/:storyId"}><StoryListItem  /></Link>
          </motion.div>
        ))}
      </List>
    </Wrapper>
    </>
  );
};

export default StoryList;
