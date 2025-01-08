import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)``;

const StoryListWrapper = styled(motion.ul)``;

const Story = styled(motion.div)`
    display: flex;

`;

const StoryImg = styled(motion.img)`
    width: 400px;
    height: 150px;
`;

const StoryInfo = styled(motion.div)``;

const InfoItem = styled(motion.div)``;

const InfoSection = styled(motion.div)``;

const StoryList = () => {
  return (
    <>
      <Wrapper>
        <StoryList>
          <Story>
            <StoryImg src="" alt="" />
            <StoryInfo>
              <h4>Title</h4>
              <p>
                Synopsis: Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Inventore suscipit harum accusantium quo quis quas, fugiat
                itaque recusandae omnis pariatur, doloremque rerum animi quia
                mollitia? Amet odit, consectetur et animi quia veritatis,
                accusamus deleniti expedita, quis consequatur similique soluta
                itaque!
              </p>
              <InfoSection>
                <InfoItem>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </InfoItem>
                <InfoItem>
                  <i className="fa-solid fa-clock"></i>
                  <p>20 mins</p>
                </InfoItem>
                <InfoItem>
                  <p>Genres</p>
                  <ul>
                    <li>Suspense</li>
                    <li>Horror</li>
                    <li>Thriller</li>
                  </ul>
                </InfoItem>
              </InfoSection>
            </StoryInfo>
          </Story>
        </StoryList>
      </Wrapper>
    </>
  );
};

export default StoryList;
