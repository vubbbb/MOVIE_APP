import { createContext, useState } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";
import PropType from "prop-types";

const MovieContext = createContext();
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};
const MovieProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const hanleMovieTrailer = async (movie_id) => {
    setTrailerKey(""); // reset trailer key
    try {
      const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos`;
      console.log(url);
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setTrailerKey(data.results[0].key);
      setModalIsOpen(true);
    } catch (error) {
      setModalIsOpen(false);
      console.log(error);
    }
  };
  return (
    <div>
      <MovieContext.Provider value={{ hanleMovieTrailer }}>
        {children}
        <Modal
          // không nên để modal ở trong carousel vì nó sẽ bị render nhiều lần
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <YouTube videoId={trailerKey} opts={opts} />;
        </Modal>
      </MovieContext.Provider>
    </div>
  );
};

MovieProvider.propTypes = {
  children: PropType.node,
};

export {MovieProvider, MovieContext}
