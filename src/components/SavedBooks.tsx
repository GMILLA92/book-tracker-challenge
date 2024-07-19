import React from 'react'
import { useBookContext } from '../context/BookContext'

const SavedBooks: React.FC = () => {
  const { books, favoriteBooks, toggleFavorite } = useBookContext()

  const savedBooks = books.filter(book => favoriteBooks.has(book.id))

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4'>
      {savedBooks.map(book => (
        <div
          key={book.id}
          className='relative group w-full flex justify-center'
        >
          <div
            className='w-full overflow-hidden rounded-lg shadow-lg'
            style={{
              background:
                'linear-gradient(to right, var(--color-grey-blue-dark), var(--color-grey-blue))'
            }}
          >
            <div className='relative' style={{ paddingTop: '130%' }}>
              <img
                src={book.coverImage}
                alt={book.title}
                className='absolute top-0 left-0 right-0 bottom-0 m-auto object-contain w-full h-full transition-transform duration-200 group-hover:scale-105 group-hover:shadow-xl'
              />
            </div>
            <div className='absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white text-center p-2 transform scale-100 group-hover:scale-105'>
              <h3 className='text-md font-bold mb-2'>{book.title}</h3>
              <p className='text-sm'>{book.authors.join(', ')}</p>
              <p className='text-sm'>Published: {book.publish_date}</p>
              <p className='text-sm'>Subjects: {book.typeTopic}</p>
              <button
                onClick={e => {
                  e.stopPropagation()
                  toggleFavorite(book.id)
                }}
                className='mt-2 p-2 bg-red-600 hover:bg-red-700 rounded-full'
              >
                <img
                  src='/bin-favs.png'
                  alt='Remove from favorites'
                  className='w-4 h-4'
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
