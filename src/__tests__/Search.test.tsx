import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Search from '../components/Search';

const mockOnSearchTermChange = jest.fn();
const mockOnSearchColumnChange = jest.fn();

beforeEach(() => {
  mockOnSearchTermChange.mockClear();
  mockOnSearchColumnChange.mockClear();
});

test('renders Search component', () => {
  render(
    <Search
      searchTerm=""
      searchColumn="all"
      onSearchTermChange={mockOnSearchTermChange}
      onSearchColumnChange={mockOnSearchColumnChange}
    />
  );

  expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
});

test('calls onSearchTermChange when input changes', () => {
  render(
    <Search
      searchTerm=""
      searchColumn="all"
      onSearchTermChange={mockOnSearchTermChange}
      onSearchColumnChange={mockOnSearchColumnChange}
    />
  );

  const input = screen.getByPlaceholderText(/search/i);
  fireEvent.change(input, { target: { value: 'Harry Potter' } });

  expect(mockOnSearchTermChange).toHaveBeenCalledWith('Harry Potter');
});

test('calls onSearchColumnChange when select changes', () => {
  render(
    <Search
      searchTerm=""
      searchColumn="all"
      onSearchTermChange={mockOnSearchTermChange}
      onSearchColumnChange={mockOnSearchColumnChange}
    />
  );

  const select = screen.getByRole('combobox');
  fireEvent.change(select, { target: { value: 'title' } });

  expect(mockOnSearchColumnChange).toHaveBeenCalledWith('title');
});
