// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import BookTable from './BookTable';
import BookDisplay from './BookDisplay';
import Modal from './ModalBook';
import { fetchBooks } from '../services/bookService';
import { Book } from '../types';

const isbnList = ['0451526538', '0140449132', '067978327X', '0201558025'];

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteBooks, setFavoriteBooks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBooks(isbnList);
      const bookArray = Object.keys(data).map(key => ({
        id: key,
        title: data[key].title,
        authors: data[key].authors?.map((author: any) => author.name) || [],
        publish_date: data[key].publish_date,
        description: data[key].notes || 'No description available.',
        coverImage: data[key].cover?.medium || 'https://placehold.co/150',
        typeTopic: 'Fiction', // Example type-topic
      }));
      setBooks(bookArray);
    };

    fetchData();
  }, []);

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const toggleFavorite = (bookId: string) => {
    setFavoriteBooks(prevFavorites => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(bookId)) {
        newFavorites.delete(bookId);
      } else {
        newFavorites.add(bookId);
      }
      return newFavorites;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>
      <BookTable books={books} onBookSelect={handleBookSelect} toggleFavorite={toggleFavorite} favoriteBooks={favoriteBooks} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedBook && <BookDisplay book={selectedBook} />}
      </Modal>
    </div>
  );
};

export default Home;

