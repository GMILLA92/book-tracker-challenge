// src/components/Home.tsx
import React, { useState } from 'react';
import BookTable from './BookTable';
import BookDisplay from './BookDisplay';
import Modal from './ModalBook';
import { useBookContext } from '../context/BookContext';
import { Book } from '../types';
import './Home.css'

const Home: React.FC = () => {
  const { books, favoriteBooks, toggleFavorite, isLoading } = useBookContext();  // Assuming isLoading is part of the context
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;  
  }

  return (
    <div className="container mx-auto p-4">
      {books.length > 0 ? (
        <BookTable
          books={books}
          onBookSelect={handleBookSelect}
          toggleFavorite={toggleFavorite}
          favoriteBooks={favoriteBooks}
        />
      ) : (
        <div>No books found.</div>  // Optional: Display a message if no books are available
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedBook && <BookDisplay book={selectedBook} />}
      </Modal>
    </div>
  );
};

export default Home;
