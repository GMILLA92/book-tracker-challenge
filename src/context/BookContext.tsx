import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchBooks } from '../services/bookService';
import { Book } from '../types';

interface BookContextProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  favoriteBooks: Set<string>;
  toggleFavorite: (bookId: string) => void;
  isLoading: boolean;
}

interface BookProviderProps {
  children: ReactNode;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<Set<string>>(new Set()); // Initialization for favoriteBooks
  const [isLoading, setIsLoading] = useState(true);

  // Define toggleFavorite function
  const toggleFavorite = (bookId: string) => {
    setFavoriteBooks(prev => {
      const updatedFavorites = new Set(prev);
      if (updatedFavorites.has(bookId)) {
        updatedFavorites.delete(bookId);
      } else {
        updatedFavorites.add(bookId);
      }
      return updatedFavorites;
    });
  };

  useEffect(() => {
    const isbnList = ['0451526538', '0140449132', '067978327X', '0201558025'];
    const fetchData = async () => {
      try {
        const booksData = await fetchBooks(isbnList);
        setBooks(booksData);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Context provider value setup
  return (
    <BookContext.Provider value={{ books, setBooks, favoriteBooks, toggleFavorite, isLoading }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }
  return context;
};
