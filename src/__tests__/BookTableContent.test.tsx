import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import BookTableContent from '../components/BookTableContent';
import { Book } from '../types';

const sampleBooks: Book[] = [
  {
    id: '1',
    isbn: '1234567890',
    title: 'Title Book 1',
    authors: ['Author 1'],
    publish_date: '2020',
    description: 'Description of Book 1',
    coverImage: 'sample1.jpg',
    typeTopic: 'Fiction',
    publish_place: '',
    number_of_pages: '100',
    language: ''
  },
  {
    id: '2',
    isbn: '0987654321',
    title: 'Title Book 2',
    authors: ['Author 2'],
    publish_date: '2021',
    description: 'Description of Book 2',
    coverImage: 'sample2.jpg',
    typeTopic: 'Non-Fiction',
    publish_place: '',
    number_of_pages: '200',
    language: ''
  }
];

const mockOnBookSelect = jest.fn();
const mockToggleFavorite = jest.fn();
const mockDeleteBook = jest.fn();
const mockHandleSort = jest.fn();
const favoriteBooks = new Set(['1']);

describe('BookTableContent', () => {
  it('renders books correctly', () => {
    const { getByText } = render(
      <BookTableContent
        books={sampleBooks}
        onBookSelect={mockOnBookSelect}
        toggleFavorite={mockToggleFavorite}
        deleteBook={mockDeleteBook}
        favoriteBooks={favoriteBooks}
        handleSort={mockHandleSort}
        sortField={null}
        sortOrder="asc"
      />
    );

    expect(getByText('Title Book 1')).toBeInTheDocument();
    expect(getByText('Title Book 2')).toBeInTheDocument();
  });

  it('calls onBookSelect when a book row is clicked', () => {
    const { getByText } = render(
      <BookTableContent
        books={sampleBooks}
        onBookSelect={mockOnBookSelect}
        toggleFavorite={mockToggleFavorite}
        deleteBook={mockDeleteBook}
        favoriteBooks={favoriteBooks}
        handleSort={mockHandleSort}
        sortField={null}
        sortOrder="asc"
      />
    );

    fireEvent.click(getByText('Title Book 1'));
    expect(mockOnBookSelect).toHaveBeenCalledWith(sampleBooks[0]);
  });

  it('calls toggleFavorite when the favorite icon is clicked', () => {
    render(
      <BookTableContent
        books={sampleBooks}
        onBookSelect={mockOnBookSelect}
        toggleFavorite={mockToggleFavorite}
        deleteBook={mockDeleteBook}
        favoriteBooks={favoriteBooks}
        handleSort={mockHandleSort}
        sortField={null}
        sortOrder="asc"
      />
    );

    const favoriteButton = screen.getByTestId('favorite-button-1');
    fireEvent.click(favoriteButton);
    expect(mockToggleFavorite).toHaveBeenCalledWith('1');
  });

  it('calls deleteBook when the delete icon is clicked', () => {
    render(
      <BookTableContent
        books={sampleBooks}
        onBookSelect={mockOnBookSelect}
        toggleFavorite={mockToggleFavorite}
        deleteBook={mockDeleteBook}
        favoriteBooks={favoriteBooks}
        handleSort={mockHandleSort}
        sortField={null}
        sortOrder="asc"
      />
    );

    const deleteButton = screen.getByTestId('delete-button-1');
    fireEvent.click(deleteButton);
    expect(mockDeleteBook).toHaveBeenCalledWith(sampleBooks[0]);
  });

  it('displays "No results found" when there are no books', () => {
    render(
      <BookTableContent
        books={[]}
        onBookSelect={mockOnBookSelect}
        toggleFavorite={mockToggleFavorite}
        deleteBook={mockDeleteBook}
        favoriteBooks={favoriteBooks}
        handleSort={mockHandleSort}
        sortField={null}
        sortOrder="asc"
      />
    );

    expect(screen.getByText('No results found. Please try with different filters.')).toBeInTheDocument();
  });
});
