import { useState, useEffect, useCallback } from 'react';
import { getPopularMovies, friendlyError } from '../services/movieService.js';
import MovieGrid from '../components/MovieGrid.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

function Home({ search }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPopular = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPopularMovies();
      setMovies(data);
    } catch (err) {
      setError(friendlyError(err, 'Failed to load popular movies. Please try again.'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPopular();
  }, [loadPopular]);

  const searching = search.query !== '';

  let content;
  if (searching) {
    if (search.loading) {
      content = <LoadingSpinner message="Searching..." />;
    } else if (search.error) {
      content = <ErrorMessage message={search.error} />;
    } else if (search.results && search.results.length === 0) {
      content = (
        <p className="empty">No movies found for “{search.query}”.</p>
      );
    } else if (search.results) {
      content = <MovieGrid movies={search.results} />;
    }
  } else if (loading) {
    content = <LoadingSpinner />;
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={loadPopular} />;
  } else {
    content = <MovieGrid movies={movies} />;
  }

  return (
    <section>
      <div className="page-heading">
        <h2>{searching ? 'Search Results' : 'Popular Movies'}</h2>
        <p>
          {searching
            ? `Showing results for “${search.query}”`
            : 'Discover and save your favorite films'}
        </p>
      </div>
      {content}
    </section>
  );
}

export default Home;
