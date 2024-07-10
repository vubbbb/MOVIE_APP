import { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import MovieList from "./components/MovieList";


function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  // const [MovieSearch, setMovieSearch] = useState([]);

  // handleSearch = async (searchValue) => {
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }



  useEffect(() => {

    // gọi API để lấy dữ liệu phim
    const fetchMovie = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      // URL để gọi API lấy dữ liệu phim phổ biến
      const url1 = 'https://api.themoviedb.org/3/movie/popular?language=vi&page=1';

      // URL để gọi API lấy dữ liệu phim được đánh giá cao nhẩt
      const url2 = 'https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1';

      const [response1, response2] = await Promise.all([
        fetch(url1, options),
        fetch(url2, options)
      ]);
      const data1 = await response1.json();
      const data2 = await response2.json();

      setMovie(data1.results);
      setMovieRate(data2.results);
      console.log(data1.results);
    };
    fetchMovie();
  }, []);

  return (
    <>
      <div className="bg-black pd-10">
        <Header />
        <Banner />
        <MovieList title={"sex gay"} data={movie} />
        <MovieList title={"sex non-gay"} data={movieRate} />
      </div>
    </>
  );
}

export default App;
