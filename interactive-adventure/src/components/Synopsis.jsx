import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  
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
