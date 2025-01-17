import styled from "styled-components";

const Bar = styled.div`
    display: flex;
    width: 100%;
    max-width: 800px; 
    justify-content: space-between;
    align-items: center;
    margin: 0.5em auto; 
    padding: 0.5em; 
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); 

    input {
        width: 75%;
        height: 3em;
        border-radius: 8px;
        // border: 1px solid rebeccapurple;
    }

    button {
        // width: 5em;
    }
`

const SearchFilter = () => {
    return(
    <Bar>
        <input type="text" placeholder="Search for a story" />
        <button><i className="fa-solid fa-search"></i></button>
        {/* <button>New Story</button> */}
    </Bar>
    )
}

export default SearchFilter