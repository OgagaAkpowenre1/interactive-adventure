import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
    height: 100%;

  h4 {
    margin: 0; 
    color: white;
    font-size: 1.3em;
    cursor: pointer;
  }

  p {
    flex: 1; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    padding-top: 1em;
  }
`;

const Synopsis = ({story}) => {
  return (
    <Wrapper>
      <h4>{story.title}</h4>
      <p>
        {story.synopsis}
      </p>
    </Wrapper>
  );
};

export default Synopsis;
