import { useState } from 'react';
import { getFavorites } from '../utils/favorites.js';
import MovieGrid from '../components/MovieGrid.jsx';

function Favorites() {
  const [favorites, setFavorites] = useState(() => getFavorites());

  // Refresh list from localStorage whenever a favorite is removed
  const handleFavoriteChange = () => {
    setFavorites(getFavorites());
  };

  return (
    <section>
      <div className="page-heading">
        <h2>My Favorites</h2>
        <p>Your saved movies collection</p>
      </div>
      {favorites.length === 0 ? (
        <p className="empty">
          No favorites yet. Add some movies from the Home page!
        </p>
      ) : (
        <MovieGrid movies={favorites} onFavoriteChange={handleFavoriteChange} />
      )}
    </section>
  );
}

export default Favorites;
