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

const Synopsis = () => {
  return (
    <Wrapper>
      <h4>Title</h4>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem culpa
        rerum magni voluptatem, molestiae excepturi earum! Sapiente nesciunt ad
        tempore fugit veritatis vero quas eos et quod, iusto minus laudantium
        corporis, beatae expedita laboriosam? Sunt iure sed sit illum
        voluptatibus?
      </p>
    </Wrapper>
  );
};

export default Synopsis;
