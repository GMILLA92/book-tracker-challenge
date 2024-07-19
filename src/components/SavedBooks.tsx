import React from 'react'
import { useBookContext } from '../context/BookContext'

const SavedBooks: React.FC = () => {
  const { books, favoriteBooks, toggleFavorite } = useBookContext()

  const savedBooks = books.filter(book => favoriteBooks.has(book.id))

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {savedBooks.map(book => (
        <div
          key={book.id}
          className='relative group w-full flex justify-center'
        >
          <div className='w-full overflow-hidden rounded-lg shadow-lg'>
            <img
              src={book.coverImage}
              alt={book.title}
              className='w-full h-64 object-cover transition-transform duration-200 group-hover:scale-105 group-hover:shadow-xl'
            />
            <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white text-center p-4 transform scale-100 group-hover:scale-105'>
              <h3 className='text-lg font-bold mb-2'>{book.title}</h3>
              <p className='text-sm'>{book.authors.join(', ')}</p>
              <p className='text-sm'>Published: {book.publish_date}</p>
              <p className='text-sm'>Subjects: {book.typeTopic}</p>
              <button
                onClick={e => {
                  e.stopPropagation()
                  toggleFavorite(book.id)
                }}
                className='mt-4 p-2 bg-red-600 hover:bg-red-700 rounded-full'
              >
                <img
                  src='/bin-favs.png'
                  alt='Remove from favorites'
                  className='w-5 h-5'
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SavedBooks
