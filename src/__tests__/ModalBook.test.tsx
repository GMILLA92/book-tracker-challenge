import {act} from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
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

const mockOnClose = jest.fn();

beforeEach(() => {
  mockOnClose.mockClear();
});

test('renders ModalBook component', async () => {
  await act(async () => {
    render(<ModalBook isOpen={true} onClose={mockOnClose} book={book} />);
  });

  expect(screen.getByText('Book Title')).toBeInTheDocument();
  expect(screen.getByText((content, element) => element?.textContent === 'Authors: Author 1')).toBeInTheDocument();
  expect(screen.getByText('Description of the book')).toBeInTheDocument();
});

test('calls onClose when close button is clicked', async () => {
  await act(async () => {
    render(<ModalBook isOpen={true} onClose={mockOnClose} book={book} />);
  });

  const closeButton = screen.getByRole('button');
  fireEvent.click(closeButton);

  expect(mockOnClose).toHaveBeenCalled();
});
