import React from "react";
import styled from "styled-components";
import InfoBar from "../components/StoryPageInfo";
import Carousel from "../components/Carousel";
import MagnifiedImage from "../components/MagnifiedImage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  padding: 1.5em;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 2em;
  }
`;

const Content = styled.div`
  flex: 2;
`;

const ImageContainer = styled.div`
  flex: 1;
  position: relative;

  img {
    width: 100%;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

const GalleryWrapper = styled.div`
  margin-top: 2em;
`;

const StoryDetails = ({ story }) => {
  const [magnifiedImage, setMagnifiedImage] = React.useState(null);

  const handleImageClick = (image) => {
    setMagnifiedImage(image);
  };

  const handleCloseMagnified = () => {
    setMagnifiedImage(null);
  };

  return (
    <>
      {magnifiedImage && (
        <MagnifiedImage
          image={magnifiedImage}
          onClose={handleCloseMagnified}
        />
      )}
      <Wrapper>
        <ImageContainer>
          <img
            src={story.mainImage}
            alt={story.title}
            onClick={() => handleImageClick(story.mainImage)}
          />
        </ImageContainer>
        <Content>
          <h1>{story.title}</h1>
          <p>{story.synopsis}</p>
          <InfoBar
            readingTime={story.readingTime ? story.readingTime : "20 mins"}
            genres={story.genres}
            rating={story.rating}
          />
        </Content>
      </Wrapper>
      <GalleryWrapper>
        <h2>Image Gallery</h2>
        <Carousel images={story.gallery} onImageClick={handleImageClick} />
      </GalleryWrapper>
    </>
  );
};

export default StoryDetails;
 