// src/__tests__/Search.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';

test('renders Search component', () => {
  render(
    <Search
      searchTerm=""
      searchColumn="all"
      onSearchTermChange={jest.fn()}
      onSearchColumnChange={jest.fn()}
    />
  );

  expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
});

test('calls onSearchTermChange when input changes', () => {
  const onSearchTermChange = jest.fn();
  render(
    <Search
      searchTerm=""
      searchColumn="all"
      onSearchTermChange={onSearchTermChange}
      onSearchColumnChange={jest.fn()}
    />
  );

  const input = screen.getByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Harry Potter' } });

  expect(onSearchTermChange).toHaveBeenCalledWith('Harry Potter');
});

test('calls onSearchColumnChange when select changes', () => {
  const onSearchColumnChange = jest.fn();
  render(
    <Search
      searchTerm=""
      searchColumn="all"
      onSearchTermChange={jest.fn()}
      onSearchColumnChange={onSearchColumnChange}
    />
  );

  const select = screen.getByRole('combobox');
  fireEvent.change(select, { target: { value: 'title' } });

  expect(onSearchColumnChange).toHaveBeenCalledWith('title');
});
