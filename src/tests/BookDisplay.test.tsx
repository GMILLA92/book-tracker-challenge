// src/__tests__/BookDisplay.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import BookDisplay from '../components/BookDisplay';
import { Book } from '../types';

const book: Book = {
    id: '1',
    title: 'Book Title',
    authors: ['Author 1'],
    publish_date: '2021',
    typeTopic: 'Fiction',
    coverImage: '',
    description: 'Description of the book',
    language: '',
    publish_place: '',
    number_of_pages: '',
    isbn: ''
};

test('renders BookDisplay with book details', () => {
  render(<BookDisplay book={book} />);

  expect(screen.getByText('Book Title')).toBeInTheDocument();
  expect(screen.getByText('by Author 1')).toBeInTheDocument();
  expect(screen.getByText('Description of the book')).toBeInTheDocument();
});
