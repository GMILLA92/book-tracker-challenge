import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookTable from '../components/BookTable';
import { Book } from '../types';

const books: Book[] = [
  {
    id: '1',
    title: 'Book Title 1',
    authors: ['Author 1'],
    publish_date: '2021',
    typeTopic: 'Fiction',
    coverImage: '',
    description: '',
    language: '',
    publish_place: '',
    number_of_pages: '',
    isbn: ''
  },
  {
    id: '2',
    title: 'Book Title 2',
    authors: [],
    publish_date: '2022',
    typeTopic: 'Non-Fiction',
    coverImage: '',
    description: '',
    language: '',
    publish_place: '',
    number_of_pages: '',
    isbn: ''
  }
];

// Creating mock functions for props
const mockOnBookSelect = jest.fn();
const mockToggleFavorite = jest.fn();
const mockSetBooks = jest.fn();

// Clear mock functions
beforeEach(() => {
  mockOnBookSelect.mockClear();
  mockToggleFavorite.mockClear();
  mockSetBooks.mockClear();
});

test('renders BookTable with books', () => {
  render(
    <BookTable
      books={books}
      onBookSelect={mockOnBookSelect}
      toggleFavorite={mockToggleFavorite}
      favoriteBooks={new Set()}
      setBooks={mockSetBooks}
    />
  );

  // Check that 'Book Title 1' is in the document
  expect(screen.getByText('Book Title 1')).toBeInTheDocument();
  // Check that 'Book Title 2' is not in the document (as the authors is an empty array)
  expect(screen.queryByText('Book Title 2')).not.toBeInTheDocument();
  expect(screen.getByText('Author 1')).toBeInTheDocument();
});

test('opens AddBookModal when add button is clicked', () => {
  render(
    <BookTable
      books={books}
      onBookSelect={mockOnBookSelect}
      toggleFavorite={mockToggleFavorite}
      favoriteBooks={new Set()}
      setBooks={mockSetBooks}
    />
  );

  // Find the add book button by its aria-label and simulate to click it
  const button = screen.getByLabelText(/add book/i);
  fireEvent.click(button);


});
