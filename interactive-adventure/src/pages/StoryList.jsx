import React, {useState} from "react";
import styled from "styled-components";
import StoryListItem from "../components/StoryListItem";
import SearchFilter from "../components/SearchFilter";
import NewStoryForm from "../components/NewStoryForm";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const Wrapper = styled.div`
  margin-bottom: 2em;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

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


const FixedNewStoryButton = styled.button`
  position: fixed;
  bottom: 5.5em;
  right: 1.5em;
  display: flex;
  align-items: center;
  gap: 0.5em;
  background-color: #4caf50;
  color: white;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  padding: 0.8em 1.5em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 1000;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }

  i {
    font-size: 1.2em;
  }
`;


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
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <>
      <Wrapper>
        <SearchFilter />
        <NewStoryForm visible={isFormVisible} toggleVisibility={() => setIsFormVisible(false)} />
        <h3>This is the story list</h3>
        <List
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
          initial="hidden"
          animate="visible"
        >
          {[...Array(9)].map((_, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <Link to={`/story/${index + 1}`}>
                <StoryListItem />
              </Link>
            </motion.div>
          ))}
        </List>
      </Wrapper>
      <FixedNewStoryButton onClick={() => setIsFormVisible(true)}>
        New Story
      </FixedNewStoryButton>
    </>
  );
};

export default StoryList;
