import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCast } from "../../FakeBackEnd/movie-api";

const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCast = async () => {
      try {
        setError(false);
        const data = await fetchCast(movieId);
        setCast(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  if (error) return <p>Something went wrong! Please try again later.</p>;
  if (loading) return <p>Loading cast details...</p>;
  if (!cast.length)
    return <h2>Cast information for this movie is currently unavailable</h2>;

  return (
    <div>
      <ul className={css.actor}>
        {cast.map((person) => (
          <li className={css.person} key={person.cast_id}>
            <img
              className={css.img}
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                  : defaultImg
              }
              alt="actor"
              width={150}
            />
            <div className={css.info}>
              <p>{person.name}</p>
              <p>Character: {person.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
