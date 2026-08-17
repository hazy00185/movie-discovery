import React, { useState, useEffect } from 'react';
import { getTrendingMovies, searchMovies } from './api';
import MovieCard from './MovieCard';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('favourites');
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavourites, setShowFavourites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTrendingMovies();
      setMovies(res.data.results);
    } catch (err) {
      setError('Failed to load movies. Check your connection and try again.');
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return loadTrending();
    setLoading(true);
    setError(null);
    try {
      const res = await searchMovies(search);
      setMovies(res.data.results);
    } catch (err) {
      setError('Search failed. Please try again.');
    }
    setLoading(false);
  };

  const toggleFavourite = (movie) => {
    const exists = favourites.find((f) => f.id === movie.id);
    const updated = exists
      ? favourites.filter((f) => f.id !== movie.id)
      : [...favourites, movie];
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  const isFavourite = (movie) => favourites.some((f) => f.id === movie.id);
  const displayMovies = showFavourites ? favourites : movies;

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1 style={styles.logo}>🎬 MovieDiscover</h1>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search movies..."
            aria-label="Search movies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>Search</button>
        </form>
        <button
          type="button"
          onClick={() => setShowFavourites(!showFavourites)}
          style={{
            ...styles.favBtn,
            background: showFavourites ? '#e74c3c' : '#8e44ad',
          }}
        >
          ❤️ Favourites ({favourites.length})
        </button>
      </header>

      <main style={styles.main}>
        <h2 style={styles.sectionTitle}>
          {showFavourites ? 'My Favourites' : 'Trending This Week'}
        </h2>

        {loading ? (
          <div style={styles.skeletonGrid}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={styles.skeleton} />
            ))}
          </div>
        ) : error ? (
          <div style={styles.errorBox}>
            <p style={styles.errorText}>⚠️ {error}</p>
            <button onClick={loadTrending} style={styles.retryBtn}>
              🔄 Retry
            </button>
          </div>
        ) : displayMovies.length === 0 ? (
          <div style={styles.emptyBox}>
            {showFavourites ? (
              <>
                <p style={styles.emptyText}>💔 No favourites yet.</p>
                <p style={styles.emptyHint}>
                  Browse trending movies and click "Favourite" to save them here.
                </p>
                <button
                  onClick={() => setShowFavourites(false)}
                  style={styles.retryBtn}
                >
                  Browse Movies
                </button>
              </>
            ) : (
              <>
                <p style={styles.emptyText}>🎬 No movies found.</p>
                <p style={styles.emptyHint}>
                  Try a different search term, or browse trending movies.
                </p>
                <button onClick={loadTrending} style={styles.retryBtn}>
                  Show Trending
                </button>
              </>
            )}
          </div>
        ) : (
          <div style={styles.grid}>
            {displayMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavourite={toggleFavourite}
                isFavourite={isFavourite(movie)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  app: { minHeight: '100vh', background: '#0d0d1a', fontFamily: "'Segoe UI', sans-serif" },
  header: { background: '#16213e', padding: '15px 30px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', boxShadow: '0 2px 10px rgba(0,0,0,0.5)' },
  logo: { color: '#fff', margin: 0, fontSize: '24px' },
  searchForm: { display: 'flex', gap: '8px', flex: 1 },
  searchInput: { flex: 1, padding: '10px 15px', borderRadius: '8px', border: 'none', background: '#0f3460', color: '#fff', fontSize: '14px', outline: 'none' },
  searchBtn: { padding: '10px 20px', background: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
  favBtn: { padding: '10px 20px', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
  main: { padding: '30px' },
  sectionTitle: { color: '#fff', marginBottom: '20px' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '20px' },
  skeletonGrid: { display: 'flex', flexWrap: 'wrap', gap: '20px' },
  skeleton: { width: '200px', height: '420px', background: 'linear-gradient(90deg, #1e1e2e 25%, #2d2d44 50%, #1e1e2e 75%)', borderRadius: '12px', animation: 'pulse 1.5s infinite' },
  errorBox: { textAlign: 'center', marginTop: '60px' },
  errorText: { color: '#e74c3c', fontSize: '18px', marginBottom: '16px' },
  retryBtn: { padding: '10px 24px', background: '#e94560', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
  emptyBox: { textAlign: 'center', marginTop: '60px' },
  emptyText: { color: '#fff', fontSize: '22px', marginBottom: '10px' },
  emptyHint: { color: '#aaa', fontSize: '15px', marginBottom: '20px' },
};

export default App;