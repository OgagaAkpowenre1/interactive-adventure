import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api";


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

const NewStoryForm = ({ visible, toggleVisibility, existingStory }) => {
  const [title, setTitle] = useState(existingStory?.title || "")
  const [synopsis, setSynopsis] = useState(existingStory?.synopsis || "")
  const [cover, setCover] = useState(existingStory?.cover || "")
  const [genres, setGenres] = useState(existingStory?.genres || []);
  const [genreInput, setGenreInput] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if(existingStory){
      setTitle(existingStory.title)
      setSynopsis(existingStory.synopsis)
      setCover(existingStory.cover)
      setGenres(existingStory.genres || [])
    }
  }, [existingStory])

  const addGenre = () => {
    if (genreInput && !genres.includes(genreInput)) {
      setGenres([...genres, genreInput]);
    }
    setGenreInput("");
  };

  const removeGenre = (genreToRemove) => {
    setGenres(genres.filter((genre) => genre !== genreToRemove));
  };

  const handleCoverChange = (e) => {
    setCover(e.target.files[0]); // Store the file object
  };

  const createStory = async (storyData) => {
    setLoading(true)
    try {
      const response = await axiosInstance.post('/stories/create', storyData)
      console.log(response.data)
      setLoading(false)

      const createdStory = response.data
      navigate(`/story/${createdStory._id}`, {state : createdStory})
    } catch (error) {
      console.log(error.response)
      setLoading(false)
    }
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const formData = {
  //       cover: e.target.cover.files[0]?.name || "",
  //       title: e.target.title.value,
  //       synopsis: e.target.synopsis.value,
  //       genres: genres,
  //       readingTime: "30 mins", // Example, calculate dynamically if needed
  //       rating: 3, // Default value
  //       gallery: [], // Extend as needed
  //   };

  //   // console.log("Form Data:", formData);
  //   console.log("creating story")
  //   createStory(formData)
  //   // toggleVisibility()
  //   navigate('/story/:id', {state: formData})

  //   e.target.reset();
  //   setGenres([]);
  //   toggleVisibility();
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // const storyData = {
    //   title,
    //   synopsis,
    //   genres,
    //   cover, // You might need to handle image upload separately if using Cloudinary
    //   readingTime: existingStory?.readingTime || "30 mins",
    //   rating: existingStory?.rating || 3,
    //   gallery: existingStory?.gallery || [],
    // };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('synopsis', synopsis);
    formData.append('genres', JSON.stringify(genres)); // Convert genres array to string
    formData.append('cover', cover); // Append the cover file
    formData.append('readingTime', existingStory?.readingTime || "30 mins");
    formData.append('rating', existingStory?.rating || 3);
    formData.append('gallery', JSON.stringify(existingStory?.gallery || []));

    setLoading(true);

    try {
      if (existingStory) {
        // Update existing story
        const response = await axiosInstance.put(`/stories/${existingStory._id}/edit`, storyData);
        console.log("Story updated:", response.data);
      } else {
        // Create new story
        const response = await axiosInstance.post("/stories/create", formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure correct headers for file upload
          }
        });
        console.log("Story created:", response.data);
        navigate(`/story/${response.data._id}`, { state: response.data });
      }
    } catch (error) {
      console.error("Error saving story", error);
    } finally {
      setLoading(false);
      toggleVisibility();
    }
  };

  if(loading){
    return (<>
      <Overlay visible={true} />
      <p>Loading....</p>
      </>
    )
  }

  return (
    <>
      <Overlay visible={visible} onClick={toggleVisibility} />
      <Wrapper visible={visible}>
        <CloseButton onClick={toggleVisibility}>&times;</CloseButton>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Story Title</label>
          <input type="text" id="title" name="title" placeholder="Story Title" onChange={(e) => setTitle(e.target.value)} required />

          <label htmlFor="synopsis">Synopsis</label>
          <textarea id="synopsis" name="synopsis" rows="6" placeholder="Synopsis" onChange={(e) => setSynopsis(e.target.value)} required></textarea>

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
          <input type="file" accept="image/*" id="cover" name="cover" onChange={handleCoverChange} required />

          <button type="submit">{existingStory ? "Save changes" :"Create Story"}</button>
        </form>
      </Wrapper>
    </>
  );
};

export default NewStoryForm;
