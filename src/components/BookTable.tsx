// src/components/BookTable.tsx
import React, { useState } from 'react'
import { Book } from '../types'
import BookTableContent from './BookTableContent'
import Search from './Search'
import FilterSidebar from './FilterSideBar'
import Pagination from './Pagination'
import './BookTable.css'

interface BookTableProps {
  books: Book[]
  onBookSelect: (book: Book) => void
  toggleFavorite: (bookId: string) => void
  favoriteBooks: Set<string>
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  onBookSelect,
  toggleFavorite,
  favoriteBooks
}) => {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchColumn, setSearchColumn] = useState<string>('all')
  const [filters, setFilters] = useState<any>({
    subjects: [],
    yearRange: [1900, new Date().getFullYear()],
    authorPrefix: ''
  })
  const itemsPerPage = 5

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortOrder(order)
    books.sort((a, b) => {
      if (a[field as keyof Book] < b[field as keyof Book]) {
        return order === 'asc' ? -1 : 1
      }
      if (a[field as keyof Book] > b[field as keyof Book]) {
        return order === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  const handleSearch = (book: Book) => {
    if (searchColumn === 'all') {
      return Object.values(book).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return book[searchColumn as keyof Book]
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  }

  const handleFilter = (book: Book) => {
    const matchesSubjects =
      filters.subjects.length === 0 ||
      filters.subjects.some((subject: string) =>
        book.typeTopic.includes(subject)
      )
    const matchesYearRange =
      parseInt(book.publish_date) >= filters.yearRange[0] &&
      parseInt(book.publish_date) <= filters.yearRange[1]
    const matchesAuthorPrefix = book.authors.some(author =>
      author.toLowerCase().startsWith(filters.authorPrefix.toLowerCase())
    )
    return matchesSubjects && matchesYearRange && matchesAuthorPrefix
  }

  const filteredBooks = books.filter(
    book => handleSearch(book) && handleFilter(book)
  )

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)

  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className='flex'>
      <FilterSidebar onFilterChange={setFilters} />
      <div className='table-container'>
    <Search
      searchTerm={searchTerm}
      searchColumn={searchColumn}
      onSearchTermChange={setSearchTerm}
      onSearchColumnChange={setSearchColumn}
    />
    {displayedBooks.length > 0 ? (
      <>
        <BookTableContent
          books={displayedBooks}
          onBookSelect={onBookSelect}
          toggleFavorite={toggleFavorite}
          favoriteBooks={favoriteBooks}
          handleSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </>
    ) : (
      <div className="no-results">No results found. Please try with different filters.</div>
    )}
</div>
    </div>
  )
}

export default BookTable
