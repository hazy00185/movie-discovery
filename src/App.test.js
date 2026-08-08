import { render, screen } from '@testing-library/react';
import App from './App';

test('renders MovieDiscover heading', () => {
  render(<App />);
  const heading = screen.getByText(/MovieDiscover/i);
  expect(heading).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search movies/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders favourites button', () => {
  render(<App />);
  const favButton = screen.getByText(/Favourites/i);
  expect(favButton).toBeInTheDocument();
});