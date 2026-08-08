import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';

export const getTrendingMovies = () =>
  axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);

export const searchMovies = (query) =>
  axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );

export const getMovieDetails = (id) =>
  axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

// Optimized for 200px movie cards
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w342';