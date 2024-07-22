import axios from 'axios';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddBookModal from '../components/AddBookModal';
import { fetchBooks } from '../services/bookService';
import { Book } from '../types';

// Mock the fetchBooks function from the bookService module
jest.mock('../services/bookService', () => ({
  fetchBooks: jest.fn()
}));

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockOnClose = jest.fn();
const mockOnAddBook = jest.fn();

beforeEach(() => {
  mockOnClose.mockClear();
  mockOnAddBook.mockClear();
  mockedAxios.get.mockReset();
  (fetchBooks as jest.Mock).mockReset(); // Reset fetchBooks mock
});

test('calls onAddBook when a book is selected', async () => {
  mockedAxios.get.mockResolvedValueOnce({
    data: {
      docs: [{ key: 'OL2M', title: 'To Kill a Mockingbird', author_name: ['Harper Lee'], isbn: ['9780060935467'] }]
    }
  });

  // Mock fetchBooks to return detailed book info
  (fetchBooks as jest.Mock).mockResolvedValueOnce([
    { key: 'OL2M', title: 'To Kill a Mockingbird', author_name: ['Harper Lee'] }
  ]);

  render(
    <AddBookModal
      isOpen={true}
      onClose={mockOnClose}
      onAddBook={mockOnAddBook}
    />
  );

  // Simulate input from a user
  const input = screen.getByPlaceholderText(/search by isbn/i);
  fireEvent.change(input, { target: { value: '9780060935467' } });

  // Simulate the search button click
  const searchButton = screen.getByTestId('search-button');
  fireEvent.click(searchButton);

  // Wait for the results to appear and check if it’s rendered
  const bookItem = await waitFor(() => screen.getByText(/To Kill a Mockingbird by Harper Lee/i));
  expect(bookItem).toBeInTheDocument();

  // Simulate selecting the book
  fireEvent.click(bookItem);

  // Check if onAddBook is called with correct book details
  await waitFor(() => {
    expect(mockOnAddBook).toHaveBeenCalledWith({
      key: 'OL2M',
      title: 'To Kill a Mockingbird',
      author_name: ['Harper Lee']
    });
  });

  // Ensure the modal closes after the selection
  expect(mockOnClose).toHaveBeenCalled();
});
