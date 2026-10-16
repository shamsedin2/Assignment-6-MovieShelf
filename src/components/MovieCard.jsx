import { useState } from 'react';
import { isFavorite, addFavorite, removeFavorite } from '../utils/favorites.js';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ movie, onFavoriteChange }) {
  const [favorite, setFavorite] = useState(() => isFavorite(movie.id));

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
    setFavorite(!favorite);
    if (onFavoriteChange) onFavoriteChange(movie.id, !favorite);
  };

  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A';

  return (
    <article className="movie-card">
      {movie.poster_path ? (
        <img
          className="movie-poster"
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={`${movie.title} poster`}
        />
      ) : (
        <div className="movie-poster movie-poster--empty">No poster</div>
      )}
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-rating">★ {Number(movie.vote_average || 0).toFixed(1)}</span>
          <span className="movie-year">{year}</span>
        </div>
        <button
          className={`favorite-button ${favorite ? 'favorite-button--active' : ''}`}
          onClick={toggleFavorite}
        >
          {favorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
