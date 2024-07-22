import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../components/Home';
import { BookContext } from '../context/BookContext';
import { Book } from '../types';

// Mock data
const books: Book[] = [
  {
    id: '1',
    title: 'Test Book 1',
    authors: ['Author 1'],
    publish_date: '2021',
    typeTopic: 'Fiction',
    coverImage: '',
    description: '',
    language: '',
    publish_place: '',
    number_of_pages: '',
    isbn: ''
  }
];

const mockSetBooks = jest.fn();
const mockToggleFavorite = jest.fn();
const mockClearError = jest.fn();

const mockContextValue = {
  books,
  setBooks: mockSetBooks,
  favoriteBooks: new Set(),
  toggleFavorite: mockToggleFavorite,
  isLoading: false,
  errorMessage: '',
  clearError: mockClearError
};

const mockContextValueLoading = {
  ...mockContextValue,
  isLoading: true
};

const mockContextValueError = {
  ...mockContextValue,
  errorMessage: 'An error occurred'
};

const renderWithContext = (ui: React.ReactElement, contextValue: any) => {
  return render(
    <BookContext.Provider value={contextValue}>
      {ui}
    </BookContext.Provider>
  );
};

test('renders loading spinner when loading', () => {
  renderWithContext(<Home />, mockContextValueLoading);
  expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
});

// Check if "no books" message is rendered
test('renders no books message when there are no books', () => {
  renderWithContext(<Home />, { ...mockContextValue, books: [] });
  expect(screen.getByTestId('no-books-message')).toBeInTheDocument();
});

// Check if books table is rendered
test('renders books table when there are books', () => {
  renderWithContext(<Home />, mockContextValue);
  expect(screen.getByText('Test Book 1')).toBeInTheDocument();
});

// Check if AddBookModal opens on button click
test('opens AddBookModal when add book button is clicked', () => {
  renderWithContext(<Home />, mockContextValue);
  fireEvent.click(screen.getByRole('button', { name: /add book/i }));
  expect(screen.getByPlaceholderText(/search by isbn/i)).toBeInTheDocument();
});

// Check if ModalBook opens on book selection
test('handles book selection and opens ModalBook', async () => {
  renderWithContext(<Home />, mockContextValue);
  fireEvent.click(screen.getByText('Test Book 1'));
  expect(await screen.findAllByText('Test Book 1')).toHaveLength(2);
});

// Check if error message is rendered
test('renders error message when there is an error', () => {
  renderWithContext(<Home />, mockContextValueError);
  expect(screen.getByTestId('error-message')).toBeInTheDocument();
});


