import './Home.css';
import React, { useState, useEffect } from 'react';
import BookTable from '../components/BookTable';
import ModalBook from '../components/ModalBook';
import AddBookModal from '../components/AddBookModal';
import { useBookContext } from '../context/BookContext';
import { Book } from '../types';

const Home: React.FC = () => {
  const { books, setBooks, favoriteBooks, toggleFavorite, isLoading, errorMessage, clearError } =
    useBookContext();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleAddBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setIsAddBookModalOpen(false);
  };

  useEffect(() => {
    if (errorMessage) {
      clearError();
    }
  }, [errorMessage, clearError]);

  if (isLoading) {
    return (
      <div data-testid="loading-spinner" className="lds-default">
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
    <div className="container mx-auto p-4">
      {books.length > 0 ? (
        <BookTable
          books={books}
          setBooks={setBooks}
          onBookSelect={handleBookSelect}
          toggleFavorite={toggleFavorite}
          favoriteBooks={favoriteBooks}
        />
      ) : (
        <div data-testid="no-books-message" className="no-results">No books found.</div>
      )}
      {isModalOpen && (
        <ModalBook
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          book={selectedBook}
        />
      )}
      {isAddBookModalOpen && (
        <AddBookModal
          isOpen={isAddBookModalOpen}
          onClose={() => setIsAddBookModalOpen(false)}
          onAddBook={handleAddBook}
        />
      )}
      {errorMessage && <div data-testid="error-message" className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Home;
