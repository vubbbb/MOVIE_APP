import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "react-modal";
import React from "react";
import YouTube from "react-youtube";

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

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const MovieList = ({ title, data }) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [trailerKey, setTrailerKey] = React.useState("");

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
    <div className="text-white p-10 mb-10 text-xl">
      <h2 className="uppercase text-xl mb-4">{title}</h2>
      <Carousel responsive={responsive} className="flex items-center ">
        {data.length > 0 &&
          data.map((item) => (
            <div
              key={item.id}
              className="w-[200px] h-[300px] pr-4 relative group"
              onClick={() => hanleMovieTrailer(item.id)}
            >
              <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`}
                  alt="temp"
                  className="w-[full] h-full object-cover "
                />
                <div className="absolute bottom-1 left-5">
                  <p className="uppercase text-[1rem]">
                    {item.name || item.original_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </Carousel>

      <Modal
        // không nên để modal ở trong carousel vì nó sẽ bị render nhiều lần
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <YouTube videoId={trailerKey} opts={opts}/>;
      </Modal>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default MovieList;
