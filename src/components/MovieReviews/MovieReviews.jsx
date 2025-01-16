import css from "./MovieReviews.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchReviews } from "../../FakeBackEnd/movie-api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setError(false);
        const data = await fetchReviews(movieId);
        setReviews(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  if (error) return <p>Something went wrong! Please try again later.</p>;
  if (loading) return <p>Loading reviews details...</p>;
  if (!reviews.length)
    return <h2>Reviews information for this movie is currently unavailable</h2>;

  return (
    <div>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <div className={css.reviewsContainer}>
              <h3>
                {" "}
                <span className={css.author}>Author: </span> {review.author}
              </h3>
              <p>{review.created_at}</p>
              <p>{review.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
