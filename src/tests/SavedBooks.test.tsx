// src/__tests__/SavedBooks.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import SavedBooks from '../components/SavedBooks';
import { BookProvider } from '../context/BookContext';
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
  }
];

test('renders SavedBooks component with saved books', () => {
  render(
    <BookProvider>
      <SavedBooks />
    </BookProvider>
  );

  expect(screen.getByText('Book Title 1')).toBeInTheDocument();
});
