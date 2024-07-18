// src/components/BookTableContent.tsx
import React from 'react'
import { Book } from '../types'
import {
  FaHeart,
  FaRegHeart,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa'

interface BookTableContentProps {
  books: Book[]
  onBookSelect: (book: Book) => void
  toggleFavorite: (bookId: string) => void
  favoriteBooks: Set<string>
  handleSort: (field: string) => void
  sortField: string | null
  sortOrder: 'asc' | 'desc'
}

const BookTableContent: React.FC<BookTableContentProps> = ({
  books,
  onBookSelect,
  toggleFavorite,
  favoriteBooks,
  handleSort,
  sortField,
  sortOrder
}) => {
  const getSortingIndicator = (field: string) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />
    }
    return <FaSort />
  }

  return (
    <>
    {books.length >0 && <table className='table'>
      <thead className='bg-primary text-white'>
        <tr>
          <th className='text-center'>Cover</th>
          <th onClick={() => handleSort('title')} className='cursor-pointer'>
            <div className='flex items-center justify-between'>
              Title {getSortingIndicator('title')}
            </div>
          </th>
          <th onClick={() => handleSort('authors')} className='cursor-pointer'>
            <div className='flex items-center justify-between'>
              Authors {getSortingIndicator('authors')}
            </div>
          </th>
          <th
            onClick={() => handleSort('publish_date')}
            className='cursor-pointer publish-date-column'
          >
            <div className='flex items-center justify-between'>
              Publish Date {getSortingIndicator('publish_date')}
            </div>
          </th>
          <th
            onClick={() => handleSort('typeTopic')}
            className='cursor-pointer'
          >
            <div className='flex items-center justify-between'>
              Type/Topic {getSortingIndicator('typeTopic')}
            </div>
          </th>
          <th className='text-center'></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr
            key={index}
            onClick={() => onBookSelect(book)}
            className='transition duration-200'
          >
            <td className='text-center'>
              <div className='img-container'>
                <img
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  className='w-full h-full object-contain'
                />
              </div>
            </td>
            <td className='text-base'>{book.title}</td>
            <td className='text-base'>{book.authors.join(', ')}</td>
            <td className='text-base publish-date-column'>
              {book.publish_date}
            </td>
            <td className='whitespace-normal break-words text-base'>
              {book.typeTopic}
            </td>
            <td
              className='text-center'
              onClick={e => {
                e.stopPropagation()
                toggleFavorite(book.id)
              }}
            >
              {favoriteBooks.has(book.id) ? (
                <FaHeart className='favorite text-base' />
              ) : (
                <FaRegHeart className='favorite text-base' />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>}
    {books.length ===0 && <div>No results found. Please try with different filters.</div>}
    </>
  )
}

export default BookTableContent
