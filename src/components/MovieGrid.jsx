import MovieCard from './MovieCard.jsx';

function MovieGrid({ movies, onFavoriteChange }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onFavoriteChange={onFavoriteChange}
        />
      ))}
    </div>
  );
}

export default MovieGrid;
