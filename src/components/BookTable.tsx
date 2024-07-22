import React, { useState, useEffect } from 'react'
import { Book } from '../types'
import BookTableContent from './BookTableContent'
import Search from './Search'
import FilterSidebar from './FilterSideBar'
import Pagination from './Pagination'
import AddBookModal from './AddBookModal'
import ConfirmationModal from './ConfirmationModal'
import { BiSolidBookAdd } from 'react-icons/bi'
import './BookTable.css'

interface BookTableProps {
  books: Book[]
  onBookSelect: (book: Book) => void
  toggleFavorite: (bookId: string) => void
  favoriteBooks: Set<string>
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  onBookSelect,
  toggleFavorite,
  favoriteBooks,
  setBooks
}) => {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchColumn, setSearchColumn] = useState<string>('all')
  const [filters, setFilters] = useState<any>({
    subjects: [],
    yearRange: [1700, new Date().getFullYear()],
    authorPrefix: ''
  })
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)
  const itemsPerPage = 5

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortOrder(order)
    books.sort((a, b) => {
      const aValue = a[field as keyof Book]
      const bValue = b[field as keyof Book]
      if (aValue && bValue) {
        if (aValue < bValue) {
          return order === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return order === 'asc' ? 1 : -1
        }
      }
      return 0
    })
  }

  const handleSearch = (book: Book) => {
    if (searchTerm === '') return true
    if (searchColumn === 'all') {
      return Object.values(book).some(value =>
        value
          ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          : false
      )
    }
    const bookValue = book[searchColumn as keyof Book]
    return bookValue
      ? bookValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
      : false
  }

  const handleFilter = (book: Book) => {
    const typeTopic = book.typeTopic || ''
    const publishDate = parseInt(book.publish_date || '0')
    const authors = book.authors || []

    const matchesSubjects =
      filters.subjects.length === 0 ||
      filters.subjects.some((subject: string) => typeTopic.includes(subject))

    const matchesYearRange =
      publishDate >= filters.yearRange[0] && publishDate <= filters.yearRange[1]

    const matchesAuthorPrefix = authors.some(author =>
      author.toLowerCase().startsWith(filters.authorPrefix.toLowerCase())
    )

    return matchesSubjects && matchesYearRange && matchesAuthorPrefix
  }

  const filteredBooks = books.filter(
    book => handleSearch(book) && handleFilter(book)
  )

  // Pagination of books
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)

  // Updating the current page if the total pages change
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [totalPages, currentPage])

  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

   // Function to handle adding a new book to the list
  const handleAddBook = (newBook: Book) => {
    setBooks(prevBooks => [...prevBooks, newBook])
    setIsAddBookModalOpen(false)
  }

  const handleDeleteBook = (bookId: string) => {
    setBooks(prevBooks => {
      const updatedBooks = prevBooks.filter(book => book.id !== bookId)
      const totalFilteredBooks = updatedBooks.filter(
        book => handleSearch(book) && handleFilter(book)
      )
      const newTotalPages = Math.ceil(totalFilteredBooks.length / itemsPerPage)
      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages)
      }
      return updatedBooks
    })
  }

   // Function to confirm the deletion of a book
  const confirmDeleteBook = (book: Book) => {
    if (favoriteBooks.has(book.id)) {
      setBookToDelete(book)
      setIsConfirmationModalOpen(true)
    } else {
      handleDeleteBook(book.id)
    }
  }

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      handleDeleteBook(bookToDelete.id)
    }
    setIsConfirmationModalOpen(false)
    setBookToDelete(null)
  }

  const noBooksFoundMessage = (
    <div className='no-results'>
      No books found...
      <button
        className='add-book-button-inline'
        onClick={() => setIsAddBookModalOpen(true)}
      >
        <BiSolidBookAdd className='add-book-icon-inline' />
        <h2>But you can always add a new book!</h2>
      </button>
    </div>
  )

  const noBooksInListMessage = (
    <div className='no-results'>
      No books in the list.
      <button
        className='add-book-button-inline'
        onClick={() => setIsAddBookModalOpen(true)}
      >
        <BiSolidBookAdd className='add-book-icon-inline' />
        Add Book
      </button>
    </div>
  )

  return (
    <div className='book-table-container'>
      <FilterSidebar onFilterChange={setFilters} />

      <div className='table-container'>
        <Search
          searchTerm={searchTerm}
          searchColumn={searchColumn}
          onSearchTermChange={setSearchTerm}
          onSearchColumnChange={setSearchColumn}
        />
        {books.length > 0 && displayedBooks.length > 0 && (
          <button
            className='add-book-button'
            onClick={() => setIsAddBookModalOpen(true)}
            aria-label='Add Book'
          >
            <BiSolidBookAdd className='add-book-icon' />
          </button>
        )}
        {books.length === 0 ? (
          noBooksInListMessage
        ) : displayedBooks.length === 0 ? (
          noBooksFoundMessage
        ) : (
          <>
            <BookTableContent
              books={displayedBooks}
              onBookSelect={onBookSelect}
              toggleFavorite={toggleFavorite}
              deleteBook={confirmDeleteBook}
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
        )}
        {isAddBookModalOpen && (
          <AddBookModal
            isOpen={isAddBookModalOpen}
            onClose={() => setIsAddBookModalOpen(false)}
            onAddBook={handleAddBook}
          />
        )}
        <ConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onConfirm={handleConfirmDelete}
          message='This book is part of your saved books. If you delete it from the table it will also be deleted from there. Are you sure you want to proceed?'
        />
      </div>
    </div>
  )
}

export default BookTable
