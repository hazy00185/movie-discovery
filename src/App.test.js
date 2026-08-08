import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders MovieDiscover heading", () => {
  render(<App />);

  const heading = screen.getByText(/MovieDiscover/i);

  expect(heading).toBeInTheDocument();
});

test("renders search button", () => {
  render(<App />);

  const button = screen.getByRole("button", {
    name: /search/i,
  });

  expect(button).toBeInTheDocument();
});

test("renders favourites button", () => {
  render(<App />);

  const button = screen.getByRole("button", {
    name: /favourites/i,
  });

  expect(button).toBeInTheDocument();
});