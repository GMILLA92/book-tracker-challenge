import { act } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import FilterSidebar from '../components/FilterSideBar'

const mockOnFilterChange = jest.fn()

beforeEach(() => {
  mockOnFilterChange.mockClear()
})

test('renders FilterSidebar component', () => {
  // Test to check if the FilterSidebar component renders correctly
  render(<FilterSidebar onFilterChange={mockOnFilterChange} />)

  // Check if key elements are in the document
  expect(screen.getByText('Type of Book')).toBeInTheDocument()
  expect(screen.getByText('Year Range')).toBeInTheDocument()
  expect(screen.getByText('Author')).toBeInTheDocument()
})

// Test to check if onFilterChange is called when the Apply Filters button is clicked
test('calls onFilterChange when Apply Filters button is clicked', async () => {
  render(<FilterSidebar onFilterChange={mockOnFilterChange} />)

  const applyButton = screen.getByText(/apply filters/i)
  await act(async () => {
    fireEvent.click(applyButton)
  })

  // Check if mockOnFilterChange is called
  expect(mockOnFilterChange).toHaveBeenCalled()
})

test('resets filters when Reset Filters button is clicked', async () => {
  render(<FilterSidebar onFilterChange={mockOnFilterChange} />)

  // Simulate the input from a user
  await act(async () => {
    fireEvent.change(screen.getByPlaceholderText('Start with...'), {
      target: { value: 'Author' }
    })
    fireEvent.change(screen.getByLabelText('From:'), {
      target: { value: '1800' }
    })
    fireEvent.change(screen.getByLabelText('To:'), {
      target: { value: '1900' }
    })

    const resetButton = screen.getByText(/reset filters/i)
    fireEvent.click(resetButton)
  })

  // Checking if the filters are reset to the default values
  expect(screen.getByPlaceholderText('Start with...')).toHaveValue('')
  expect(screen.getByLabelText('From:')).toHaveValue(1700)
  expect(screen.getByLabelText('To:')).toHaveValue(new Date().getFullYear())
})
