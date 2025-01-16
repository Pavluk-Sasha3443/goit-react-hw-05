import css from "./HomePage.module.css";
import MovieList from "../../MovieList/MovieList";
import Loader from "../../Loader/Loader";
import { fetchMovies } from "../../../FakeBackEnd/movie-api";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setError(false);
        const data = await fetchMovies();
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <>
      <h2 className={css.title}>Trending today</h2>
      {error && <p>Oops, something went wrong! Please try again later.</p>}
      {loading && <Loader />}
      {movies && <MovieList movies={movies} />}
    </>
  );
};

export default HomePage;
