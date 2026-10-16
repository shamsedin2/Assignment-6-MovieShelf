const STORAGE_KEY = 'movieshelf-favorites';

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // storage unavailable; ignore
  }
}

export function isFavorite(id) {
  return getFavorites().some((m) => m.id === id);
}

export function addFavorite(movie) {
  const favorites = getFavorites();
  if (!favorites.some((m) => m.id === movie.id)) {
    saveFavorites([...favorites, movie]);
  }
}

export function removeFavorite(id) {
  saveFavorites(getFavorites().filter((m) => m.id !== id));
}
