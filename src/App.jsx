import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Favorites from './pages/Favorites.jsx';

function App() {
  // Search state lives here so both the Header (setter) and Home (results) can use it
  const [search, setSearch] = useState({
    query: '',
    results: null, // null = no active search
    loading: false,
    error: null,
  });

  return (
    <div className="app">
      <Header setSearch={setSearch} />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home search={search} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
