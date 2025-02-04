import React from "react";
import styled from "styled-components";
import SceneImageComponent from "../components/SceneImage";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStoryContext } from "../contexts/storyContext";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

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
// const textVariants = {
//   hidden: { y: "100%", opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 1.5 } },
// };

// const buttonVariants = {
//   hidden: { y: 50, opacity: 0 },
//   visible: { y: 0, opacity: 1, transition: { duration: 1, delay: 2} },
// };

// const SceneReader = ({scene}) => {
  // const navigate = useNavigate()
//   const {selectedStory} = useStoryContext()

//   const handleOptionClick = (nextScene) => {
//     if (nextScene) {
//       navigate(`/reader/${selectedStory._id}/${encodeURIComponent(nextScene)}`); // Encode title to handle special characters
//     }
//   };

//   return (
//     <>
//     <Wrapper>
//       <SceneImageComponent
//         src={scene.image || "https://wallpapercave.com/wp/wp7135795.jpg"}
//         alt={"Image"}
//       />
//       <SceneTextWrapper
//         // initial="hidden"
//         // animate="visible"
//         // variants={textVariants}
//       >
//         <SceneText>
//           {scene.sceneContent || "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos dolor"}
//         </SceneText>
//       </SceneTextWrapper>
//       <SceneButtonsWrapper
//         // initial={"hidden"}
//         // animate={"visible"}
//         // variants={buttonVariants}
//       >{scene.options.map((option, index) => (
//         <Button buttonText={option.text} onClick={() => handleOptionClick()} />
//       ))}
//         {/* <Button
//           buttonText={
//             "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias officiis eligendi labore, obcaecati ab eveniet vero nihil omnis cumque maiores!"
//           }
//         />
//         <Button buttonText={"Option 2"} />
//         <Button buttonText={"Option 3"} />
//         <Button buttonText={"Option 4"} /> */}
//       </SceneButtonsWrapper>
//     </Wrapper>
//     </>
//   );
// };



const SceneReader = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { sceneId, storyId } = useParams(); // Get scene ID from URL
  const [scene, setScene] = useState(location.state?.scene || null);

  console.log(scene)

  // useEffect(() => {
  //   if (!scene) {
  //     // Try to get scenes from localStorage if state is missing
  //     const storedScenes = JSON.parse(localStorage.getItem(`scenes_${storyId}`)) || [];
  //     const foundScene = storedScenes.find(s => s._id === sceneId);

  //     if (foundScene) {
  //       setScene(foundScene);
  //     }
  //   }
  // }, [scene, sceneId, storyId]);

  // useEffect(() => {
  //   if (!scene) {
  //     // Try to get scenes from localStorage if state is missing
  //     const storedScenes = JSON.parse(localStorage.getItem(`scenes_${storyId}`)) || [];
  //     const firstScene = storedScenes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];

  //     if (firstScene && sceneId === firstScene._id) {
  //       setScene(firstScene);
  //     } else {
  //       const foundScene = storedScenes.find(s => s._id === sceneId);
  //       if (foundScene) {
  //         setScene(foundScene);
  //       }
  //     }
  //   }
  // }, [scene, sceneId, storyId]);

  useEffect(() => {
    const storedScenes = JSON.parse(localStorage.getItem(`scenes_${storyId}`)) || [];
    
    if (!scene || scene._id !== sceneId) {
      const foundScene = storedScenes.find(s => s._id === sceneId);
      if (foundScene) {
        setScene(foundScene);
      } else {
        // Fallback to the first scene if sceneId is invalid or missing
        const firstScene = storedScenes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))[0];
        if (firstScene) setScene(firstScene);
      }
    }
  }, [sceneId, storyId]);
  


  if (!scene) return <p>Loading...</p>;

  return (
    <Wrapper>
      <SceneImageComponent src={scene.image || "https://wallpapercave.com/wp/wp7135795.jpg"} alt="Scene Image" />
      <SceneTextWrapper>
        <SceneText>{scene.sceneContent}</SceneText>
      </SceneTextWrapper>
      <SceneButtonsWrapper>
        {scene.options.map((option, index) => (
          <Button key={index} buttonText={option.text} onClick={() => {
            console.log(`Navigating to scene: ${option._id}`);
            navigate(`/reader/${storyId}/${option._id}`, {
              state: { scene: option }
            });
          }} />
        ))}
      </SceneButtonsWrapper>
    </Wrapper>
  );
};

export default SceneReader;
