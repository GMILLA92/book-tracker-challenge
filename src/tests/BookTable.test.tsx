// src/__tests__/BookTable.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

test('renders BookTable with books', () => {
  render(
    <BookTable
      books={books}
      onBookSelect={jest.fn()}
      toggleFavorite={jest.fn()}
      favoriteBooks={new Set()}
      setBooks={jest.fn()}
    />
  );

  expect(screen.getByText('Book Title 1')).toBeInTheDocument();
  expect(screen.getByText('Book Title 2')).toBeInTheDocument();
});

test('opens AddBookModal when add button is clicked', () => {
  render(
    <BookTable
      books={books}
      onBookSelect={jest.fn()}
      toggleFavorite={jest.fn()}
      favoriteBooks={new Set()}
      setBooks={jest.fn()}
    />
  );

  const button = screen.getByText(/add book/i);
  fireEvent.click(button);

  const modal = screen.getByText(/search by isbn/i);
  expect(modal).toBeInTheDocument();
});
