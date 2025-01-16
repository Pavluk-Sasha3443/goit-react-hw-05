import css from "./MovieList.module.css";
import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();
  const defaultImg =
    "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg";
  return (
    <>
      <ul className={css.movie}>
        {movies.map((movie) => (
          <li className={css.movieCard} key={movie.id}>
            <Link to={`/movies/${movie.id.toString()}`} state={location}>
              <img
                className={css.poster}
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : defaultImg
                }
                width={250}
                alt={movie.title}
              />
              <p className={css.title}> {movie.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
