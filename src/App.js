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

  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    setLoading(true);
    try {
      const res = await getTrendingMovies();
      setMovies(res.data.results);
    } catch (err) {
      console.error('Error loading movies:', err);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return loadTrending();
    setLoading(true);
    try {
      const res = await searchMovies(search);
      setMovies(res.data.results);
    } catch (err) {
      console.error('Search error:', err);
    }
    setLoading(false);
  };

  const toggleFavourite = (movie) => {
    const exists = favourites.find(f => f.id === movie.id);
    const updated = exists
      ? favourites.filter(f => f.id !== movie.id)
      : [...favourites, movie];
    setFavourites(updated);
    localStorage.setItem('favourites', JSON.stringify(updated));
  };

  const isFavourite = (movie) => favourites.some(f => f.id === movie.id);

  const displayMovies = showFavourites ? favourites : movies;

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>🎬 MovieDiscover</h1>
        <form onSubmit={handleSearch} style={styles.searchForm}>
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={styles.searchInput}
          />
          <button type="submit" style={styles.searchBtn}>Search</button>
        </form>
        <button
          onClick={() => setShowFavourites(!showFavourites)}
          style={{
            ...styles.favBtn,
            background: showFavourites ? '#e74c3c' : '#8e44ad',
          }}
        >
          ❤️ Favourites ({favourites.length})
        </button>
      </header>

      {/* Main */}
      <main style={styles.main}>
        <h2 style={styles.sectionTitle}>
          {showFavourites ? 'My Favourites' : 'Trending This Week'}
        </h2>

        {loading ? (
          <p style={styles.loading}>Loading movies...</p>
        ) : displayMovies.length === 0 ? (
          <p style={styles.loading}>No movies found.</p>
        ) : (
          <div style={styles.grid}>
            {displayMovies.map(movie => (
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
  app: {
    minHeight: '100vh',
    background: '#0d0d1a',
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    background: '#16213e',
    padding: '15px 30px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
  },
  logo: {
    color: '#fff',
    margin: 0,
    fontSize: '24px',
  },
  searchForm: {
    display: 'flex',
    gap: '8px',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none',
    background: '#0f3460',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
  },
  searchBtn: {
    padding: '10px 20px',
    background: '#e94560',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  favBtn: {
    padding: '10px 20px',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  main: {
    padding: '30px',
  },
  sectionTitle: {
    color: '#fff',
    marginBottom: '20px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  loading: {
    color: '#aaa',
    fontSize: '18px',
    textAlign: 'center',
    marginTop: '50px',
  },
};

export default App;