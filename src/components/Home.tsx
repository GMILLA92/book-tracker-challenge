import './Home.css';
import React, { useState } from 'react';
import BookTable from './BookTable';
import ModalBook from './ModalBook';
import AddBookModal from './AddBookModal'; // Import the AddBookModal
import { useBookContext } from '../context/BookContext';
import { Book } from '../types';

const placeholderImage = process.env.PUBLIC_URL + '/no-photo.png';

const Home: React.FC = () => {
  const { books, setBooks, favoriteBooks, toggleFavorite, isLoading } = useBookContext();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false); // State to control AddBookModal

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleAddBook = (newBook: Book) => {
    setBooks(prevBooks => [...prevBooks, newBook]); // Update the books array with the new book
    setIsAddBookModalOpen(false); // Close the add book modal
  };

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
    );
  }

  return (
    <div className='container mx-auto p-4'>
 
      {/* Button to open the add book modal */}
      {books.length > 0 ? (
        <BookTable
          books={books}
          setBooks={setBooks} // Pass setBooks here
          onBookSelect={handleBookSelect}
          toggleFavorite={toggleFavorite}
          favoriteBooks={favoriteBooks}
        />
      ) : (
        <div className='no-results'>No books found.</div>
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
  );
};

export default Home;
