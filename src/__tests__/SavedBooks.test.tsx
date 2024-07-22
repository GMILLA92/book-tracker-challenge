import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SavedBooks from '../components/SavedBooks';
import { BookContext } from '../context/BookContext';
import { Book } from '../types';

// Mock data
const savedBooks: Book[] = [
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
    authors: ['Author 2'],
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

const mockContextValue = {
  books: savedBooks,
  favoriteBooks: new Set(savedBooks.map(book => book.id)),
  toggleFavorite: jest.fn(),
  setBooks: jest.fn(),
  isLoading: false,
  loadBooks: jest.fn(),
  errorMessage: '',
  invalidBookMessage: '',
  clearError: jest.fn(),
  clearInvalidBookMessage: jest.fn()
};

const renderWithContext = (ui: React.ReactElement, contextValue: any) => {
  return render(
    <BookContext.Provider value={contextValue}>
      {ui}
    </BookContext.Provider>
  );
};

test('renders SavedBooks component with saved books', () => {
  renderWithContext(<SavedBooks />, mockContextValue);

  // Simulate hover event on the first book and then see details
  const bookElement = screen.getByAltText('Book Title 1');
  fireEvent.mouseOver(bookElement);

  // Check if the book title is displayed
  expect(screen.getByText('Book Title 1')).toBeInTheDocument();
  expect(screen.getByText('Author 1')).toBeInTheDocument();
  expect(screen.getByText('Published: 2021')).toBeInTheDocument();
  expect(screen.getByText('Subjects: Fiction')).toBeInTheDocument();
});
