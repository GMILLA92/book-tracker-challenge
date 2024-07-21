// src/__tests__/FilterSidebar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterSidebar from '../components/FilterSideBar';

test('renders FilterSidebar component', () => {
  render(<FilterSidebar onFilterChange={jest.fn()} />);

  expect(screen.getByText('Type of Book')).toBeInTheDocument();
  expect(screen.getByText('Year Range')).toBeInTheDocument();
  expect(screen.getByText('Author')).toBeInTheDocument();
});

test('calls onFilterChange when Apply Filters button is clicked', () => {
  const onFilterChange = jest.fn();
  render(<FilterSidebar onFilterChange={onFilterChange} />);

  const applyButton = screen.getByText(/apply filters/i);
  fireEvent.click(applyButton);

  expect(onFilterChange).toHaveBeenCalled();
});
