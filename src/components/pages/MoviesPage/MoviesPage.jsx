import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieList from "../../MovieList/MovieList";
import SearchForm from "../../SearchForm/SearchForm";
import { fetchSearchMovie } from "../../../FakeBackEnd/movie-api";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const query = searchParams.get("query") ?? "";
    if (!query) {
      return;
    }

    const getMovies = async () => {
      try {
        setError(false);
        const data = await fetchSearchMovie(query);
        setMovies(data);
      } catch {
        setError(true);
      }
    };
    getMovies();
  }, [searchParams]);

  const handleSubmit = (value) => {
    if (!value) {
      return setSearchParams({});
    }
    setSearchParams({ query: value });
  };

  if (error) return <p>Something went wrong! Please try again later.</p>;

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
