import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../components/Home';
import { BookProvider } from '../context/BookContext';

test('renders Home component with loading spinner', () => {
  render(
    <BookProvider>
      <Home />
    </BookProvider>
  );

  const loadingSpinner = screen.getByText(/loading/i);
  expect(loadingSpinner).toBeInTheDocument();
});

test('opens AddBookModal when button is clicked', () => {
  render(
    <BookProvider>
      <Home />
    </BookProvider>
  );

  const button = screen.getByText(/add book/i);
  fireEvent.click(button);

  const modal = screen.getByText(/search by isbn/i);
  expect(modal).toBeInTheDocument();
});
