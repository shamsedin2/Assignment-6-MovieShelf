const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

const PLACEHOLDERS = ['', 'your_api_key_here', 'paste_your_key_here'];

export const MISSING_KEY = 'MISSING_API_KEY';

export function friendlyError(err, fallback) {
  if (err && err.message === MISSING_KEY) {
    return 'No TMDB API key found. Open the .env file, set VITE_TMDB_API_KEY to your real key, then restart "npm run dev".';
  }
  if (err && err.status === 401) {
    return 'TMDB rejected the API key. Make sure you used the API Key (not the Read Access Token) and restart "npm run dev".';
  }
  return fallback;
}

async function request(url) {
  if (!API_KEY || PLACEHOLDERS.includes(API_KEY.trim())) {
    throw new Error(MISSING_KEY);
  }
  const response = await fetch(url);
  if (!response.ok) {
    const error = new Error(`TMDB request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  const data = await response.json();
  return data.results;
}

export async function getPopularMovies() {
  return request(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
}

export async function searchMovies(query) {
  return request(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
}
