import React from 'react';
import { IMAGE_BASE_URL } from './api';

function MovieCard({ movie, onFavourite, isFavourite }) {
  return (
    <div style={styles.card}>
      <img
        src={movie.poster_path
          ? `${IMAGE_BASE_URL}${movie.poster_path}`
          : 'https://via.placeholder.com/200x300?text=No+Image'}
        alt={movie.title}
        style={styles.poster}
      />
      <div style={styles.info}>
        <h3 style={styles.title}>{movie.title}</h3>
        <p style={styles.rating}>⭐ {movie.vote_average?.toFixed(1)}</p>
        <p style={styles.year}>
          {movie.release_date?.substring(0, 4)}
        </p>
        <button
          onClick={() => onFavourite(movie)}
          style={{
            ...styles.btn,
            background: isFavourite ? '#e74c3c' : '#3498db',
          }}
        >
          {isFavourite ? '❤️ Remove' : '🤍 Favourite'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#1e1e2e',
    borderRadius: '12px',
    overflow: 'hidden',
    width: '200px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
  },
  poster: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
  },
  info: {
    padding: '10px',
  },
  title: {
    color: '#fff',
    fontSize: '14px',
    margin: '0 0 5px',
  },
  rating: {
    color: '#f1c40f',
    fontSize: '13px',
    margin: '0 0 3px',
  },
  year: {
    color: '#aaa',
    fontSize: '12px',
    margin: '0 0 8px',
  },
  btn: {
    width: '100%',
    padding: '6px',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '12px',
  },
};

export default MovieCard;