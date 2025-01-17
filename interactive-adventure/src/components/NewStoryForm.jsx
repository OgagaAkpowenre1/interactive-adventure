import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Overlay = styled.div`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px); // Blurs the background
  z-index: 999; // Ensures it appears above everything else
`;

const Wrapper = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  max-height: 90%;
  overflow-y: auto;

  form {
    display: flex;
    flex-direction: column;
    gap: 1em;
    max-height: 90%;
    overflow-y: auto;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  input[type="text"],
  textarea,
  input[type="file"] {
    width: 100%;
    padding: 0.8em;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1em;
  }

  textarea {
    resize: none;
  }

  input[type="file"] {
    border: none;
  }

  .genres {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;

    span {
      display: inline-flex;
      align-items: center;
      background-color: #e0e0e0;
      padding: 0.4em 0.8em;
      border-radius: 16px;
      font-size: 0.9em;

      button {
        margin-left: 0.5em;
        background: none;
        border: none;
        color: red;
        cursor: pointer;
      }
    }
  }

  button {
    padding: 0.8em;
    border: none;
    background-color: #4caf50;
    color: white;
    font-weight: bold;
    font-size: 1em;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1em;
  right: 1em;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  font-size: 1.5em;
  cursor: pointer;
`;

const NewStoryForm = ({ visible, toggleVisibility }) => {
  const [genres, setGenres] = useState([]);
  const [genreInput, setGenreInput] = useState("");
  const navigate = useNavigate()

  const addGenre = () => {
    if (genreInput && !genres.includes(genreInput)) {
      setGenres([...genres, genreInput]);
    }
    setGenreInput("");
  };

  const removeGenre = (genreToRemove) => {
    setGenres(genres.filter((genre) => genre !== genreToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
        mainImage: e.target.cover.files[0]?.name || "",
        title: e.target.title.value,
        synopsis: e.target.synopsis.value,
        genres: genres,
        readingTime: "30 mins", // Example, calculate dynamically if needed
        rating: 3, // Default value
        gallery: [], // Extend as needed
    };

    console.log("Form Data:", formData);
    toggleVisibility()
    navigate('/story/:id', {state: formData})

    e.target.reset();
    setGenres([]);
    toggleVisibility();
  };

  return (
    <>
      <Overlay visible={visible} onClick={toggleVisibility} />
      <Wrapper visible={visible}>
        <CloseButton onClick={toggleVisibility}>&times;</CloseButton>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Story Title</label>
          <input type="text" id="title" name="title" placeholder="Story Title" required />

          <label htmlFor="synopsis">Synopsis</label>
          <textarea id="synopsis" name="synopsis" rows="6" placeholder="Synopsis" required></textarea>

          <label htmlFor="genres">Genres</label>
          <div className="genres">
            {genres.map((genre, index) => (
              <span key={index}>
                {genre}
                <button type="button" onClick={() => removeGenre(genre)}>
                  &times;
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a genre and press Enter"
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGenre())}
          />

          <label htmlFor="cover">Story Cover</label>
          <input type="file" accept="image/*" id="cover" name="cover" required />

          <button type="submit">Create Story</button>
        </form>
      </Wrapper>
    </>
  );
};

export default NewStoryForm;
