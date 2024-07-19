// Home.tsx
import './Home.css'
import React, { useState } from 'react'
import BookTable from './BookTable'
import ModalBook from './ModalBook'
import AddBookModal from './AddBookModal' // Import the AddBookModal
import { useBookContext } from '../context/BookContext'
import { Book } from '../types'
const placeholderImage = process.env.PUBLIC_URL + '/no-photo.png'

const Home: React.FC = () => {
  const { books, setBooks, favoriteBooks, toggleFavorite, isLoading } = useBookContext()
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false) // State to control AddBookModal

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book)
    setIsModalOpen(true)
  }

  const handleAddBook = (newBook: Partial<Book>) => {
    // Provide defaults for missing properties if necessary
    const completeBook: Book = {
      id: newBook.id || `id-${Date.now()}`,  // Generate a unique id if not provided
      title: newBook.title || 'Not specified',
      authors: newBook.authors || ['Unknown author'],
      publish_date: newBook.publish_date || 'Not specified',
      description: newBook.description || 'No description available.',
      coverImage: newBook.coverImage || placeholderImage,
      typeTopic: newBook.typeTopic || 'General',
      publish_place: newBook.publish_place || 'Unknown location',
      number_of_pages: newBook.number_of_pages || 'Not available',
      language: newBook.language || 'Unknown'
    };
  
    setBooks(prevBooks => [...prevBooks, completeBook]); // Update the books array with the new book
    setIsAddBookModalOpen(false); // Close the add book modal
  }
  
  if (isLoading) {
    return (
      <div className='lds-default'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-4'>
      <button onClick={() => setIsAddBookModalOpen(true)}>Add Book</button>{' '}
      {/* Button to open the add book modal */}
      {books.length > 0 ? (
        <BookTable
          books={books}
          onBookSelect={handleBookSelect}
          toggleFavorite={toggleFavorite}
          favoriteBooks={favoriteBooks}
        />
      ) : (
        <div>No books found.</div>
      )}
      {isModalOpen && (
        <ModalBook isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} book={selectedBook} />
      )}
      {isAddBookModalOpen && (
        <AddBookModal // Render the AddBookModal
          isOpen={isAddBookModalOpen}
          onClose={() => setIsAddBookModalOpen(false)}
          onAddBook={handleAddBook}
        />
      )}
    </div>
  )
}

export default Home;
