import { useContext } from "react";
import PropTypes from "prop-types";
import { MovieContext } from "./MovieProvider";




const MovieSearch = ({ title, data }) => {
  const {hanleMovieTrailer} = useContext(MovieContext)
  return (
    <div className="text-white p-10 mb-10 text-xl">
      <h2 className="uppercase text-xl mb-4">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
                  alt={item.title}
                  className="w-[full] h-full object-cover "
                />
                <div className="absolute bottom-1 left-5">
                  <p className="uppercase text-[1rem]">
                    {item.title || item.original_title}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

MovieSearch.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default MovieSearch;
