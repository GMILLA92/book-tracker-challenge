// src/__tests__/ModalBook.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalBook from '../components/ModalBook';
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

test('renders ModalBook component', () => {
  render(<ModalBook isOpen={true} onClose={jest.fn()} book={book} />);

  expect(screen.getByText('Book Title')).toBeInTheDocument();
  expect(screen.getByText('by Author 1')).toBeInTheDocument();
  expect(screen.getByText('Description of the book')).toBeInTheDocument();
});

test('calls onClose when close button is clicked', () => {
  const onClose = jest.fn();
  render(<ModalBook isOpen={true} onClose={onClose} book={book} />);

  const closeButton = screen.getByRole('button');
  fireEvent.click(closeButton);

  expect(onClose).toHaveBeenCalled();
});
