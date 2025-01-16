import css from "./MovieDetailsPage.module.css";
import {
  NavLink,
  Link,
  useParams,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useEffect, useState, Suspense, useRef } from "react";
import { fetchMovieById } from "../../../FakeBackEnd/movie-api";
import Loader from "../../Loader/Loader";

import clsx from "clsx";

const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();

  const backLink = useRef(location.state ?? "/");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  const buildNavLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  if (loading) return <Loader />;
  if (error) return <p>Something went wrong! Please try again later.</p>;
  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div className={css.wrapperDetails}>
      <div className={css.wrapperGoBack}>
        <Link className={css.linkGoBack} to={backLink.current}>
          Go back
        </Link>
      </div>

      <div className={css.details}>
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
        <div className={css.info}>
          <h1>{movie.title}</h1>
          <p>
            User Score:
            {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
          </p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <div>
            <h3>Genres</h3>
            <p>
              {movie.genres
                ? movie.genres.map((genre) => genre.name).join(", ")
                : "No genres available"}
            </p>
          </div>
        </div>
      </div>

      <div className={css.navContainer}>
        <nav className={css.nav}>
          <NavLink className={buildNavLinkClass} to="cast">
            Cast
          </NavLink>
          <NavLink className={buildNavLinkClass} to="reviews">
            Reviews
          </NavLink>
        </nav>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
