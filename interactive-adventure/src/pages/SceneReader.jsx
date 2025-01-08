import React from "react";
import styled from "styled-components";
import SceneImageComponent from "../components/SceneImage";
import Button from "../components/Button";
import { delay, motion } from "framer-motion";
import { useInView } from "framer-motion";

const Wrapper = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.sceneBackgroundColor};
  padding: 1rem;
  padding-bottom: 3rem;
`;

const SceneTextWrapper = styled(motion.div)`
  max-width: clamp(300px, 70%, 800px);
  text-align: left;
  margin: 2rem auto;
`;

const SceneText = styled(motion.p)`
  font-size: 1.1rem;
  font-weight: 400;
`;

const SceneButtonsWrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

//Animation variants
const textVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 1.5 } },
};

const buttonVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 2} },
};

const SceneReader = () => {
  //Intersection Refs
  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.1, // 10% of the element needs to be visible
  });

  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: false,
    threshold: 0.00001,
  });

  const { ref: buttonRef, inView: buttonInView } = useInView({
    triggerOnce: false,
    threshold: 0.000001,
  });

  return (
    <Wrapper>
      <SceneImageComponent
        src={"https://wallpapercave.com/wp/wp7135795.jpg"}
        alt={"Image"}
      />
      <SceneTextWrapper
        initial="hidden"
        animate="visible"
        variants={textVariants}
        ref={textRef}
      >
        <SceneText>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos dolor
          fugiat eum sit magni eaque hic eveniet, earum nisi aspernatur
          perferendis eligendi aliquid. Eligendi quo eaque voluptate velit nam,
          minus dolores eveniet odit incidunt laborum, commodi optio voluptatem
          unde voluptates?
        </SceneText>
      </SceneTextWrapper>
      <SceneButtonsWrapper
        initial={"hidden"}
        animate={"visible"}
        variants={buttonVariants}
        ref={buttonRef}
      >
        <Button
          delay={"0.7s"}
          buttonText={
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias officiis eligendi labore, obcaecati ab eveniet vero nihil omnis cumque maiores!"
          }
        />
        <Button delay={"0.9s"} buttonText={"Option 2"} />
        <Button delay={"0.12s"} buttonText={"Option 3"} />
        <Button delay={"0.15"} buttonText={"Option 4"} />
      </SceneButtonsWrapper>
    </Wrapper>
  );
};

export default SceneReader;
