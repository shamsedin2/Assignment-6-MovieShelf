import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { searchMovies, friendlyError } from '../services/movieService.js';

function Header({ setSearch }) {
  const [input, setInput] = useState('');
  const requestId = useRef(0);

  const runSearch = async (query) => {
    const trimmed = query.trim();
    const id = ++requestId.current;

    if (!trimmed) {
      setSearch({ query: '', results: null, loading: false, error: null });
      return;
    }

    setSearch({ query: trimmed, results: null, loading: true, error: null });
    try {
      const results = await searchMovies(trimmed);
      if (id !== requestId.current) return; // stale response
      setSearch({ query: trimmed, results, loading: false, error: null });
    } catch (err) {
      if (id !== requestId.current) return;
      setSearch({
        query: trimmed,
        results: null,
        loading: false,
        error: friendlyError(err, 'Could not search movies. Please try again.'),
      });
    }
  };

  // Search as the user types (debounced)
  useEffect(() => {
    const timer = setTimeout(() => runSearch(input), 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch(input);
  };

  return (
    <header className="header">
      <h1 className="logo">MovieShelf</h1>
      <nav className="nav">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/favorites" className="nav-link">
          Favorites
        </NavLink>
      </nav>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </header>
  );
}

export default Header;
