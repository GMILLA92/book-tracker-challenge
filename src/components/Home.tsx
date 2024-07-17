// src/components/Home.tsx
import React, { useState } from 'react';
import BookTable from './BookTable';
import BookDisplay from './BookDisplay';
import Modal from './ModalBook';
import { useBookContext } from '../context/BookContext';
import { Book } from '../types';

const Home: React.FC = () => {
  const { books, favoriteBooks, toggleFavorite } = useBookContext();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <BookTable
        books={books}
        onBookSelect={handleBookSelect}
        toggleFavorite={toggleFavorite}
        favoriteBooks={favoriteBooks}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedBook && <BookDisplay book={selectedBook} />}
      </Modal>
    </div>
  );
};

export default Home;
