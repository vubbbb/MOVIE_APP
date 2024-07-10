import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const MovieList = ({ title, data }) => {
  return (
    <div className="text-white p-10 mb-10 text-xl">
      <h2 className="uppercase text-xl mb-4">{title}</h2>
      <div className="flex items-center space-x-4">
        {data.length > 0 && data.map((item) => (
        <div key={item.id} className="w-[200px] h-[300px] relative group">
          <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`}
              alt="temp"
              className="w-[full] h-full object-cover "
            />
            <div className="absolute bottom-1 left-5">
              <p className="uppercase text-[1rem]">{item.name || item.original_name}</p>
            </div>
          </div>
        </div>

        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired
};

export default MovieList;
