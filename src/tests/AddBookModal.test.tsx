import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddBookModal from '../components/AddBookModal';

test('renders AddBookModal component', () => {
  render(
    <AddBookModal
      isOpen={true}
      onClose={jest.fn()}
      onAddBook={jest.fn()}
    />
  );

  expect(screen.getByPlaceholderText(/search by isbn/i)).toBeInTheDocument();
});

test('calls onClose when close button is clicked', () => {
  const onClose = jest.fn();
  render(
    <AddBookModal
      isOpen={true}
      onClose={onClose}
      onAddBook={jest.fn()}
    />
  );

  const closeButton = screen.getByText(/×/i);
  fireEvent.click(closeButton);

  expect(onClose).toHaveBeenCalled();
});

test('searches for books when search button is clicked', async () => {
  render(
    <AddBookModal
      isOpen={true}
      onClose={jest.fn()}
      onAddBook={jest.fn()}
    />
  );

  const input = screen.getByPlaceholderText(/search by isbn/i);
  fireEvent.change(input, { target: { value: '9780141439518' } });

  const searchButton = screen.getByRole('button', { name: /search/i });
  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
