import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchBooks } from '../services/bookService';
import { Book } from '../types';

interface BookContextProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  favoriteBooks: Set<string>;
  toggleFavorite: (bookId: string) => void;
  isLoading: boolean;
  loadBooks: (isbnList: string[]) => void;
  errorMessage: string;
  invalidBookMessage: string;
  clearError: () => void;
  clearInvalidBookMessage: () => void;
}

interface BookProviderProps {
  children: ReactNode;
}

const BookContext = createContext<BookContextProps | undefined>(undefined);

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [invalidBookMessage, setInvalidBookMessage] = useState('');

  // I pre-selected some ISBNS of books I liked.
  const predefinedIsbns = [
    '0451526538',
    '067978327X',
    '2253004464',
    '9780743273565',
    '9780192834133',
    '9780061120084',
    '9781400033416',
    '9781451673319',
    '9780385490818',
    '9780679732761',
    '9780439139601',
    '9780743272933',
    '9780345803481',
    '9781943138425',
    '9780261103573',
    '9780618002238',
    '0679406417',
    '9780062315007',
    '9780525559474',
  ];

  const loadBooks = async (isbnList: string[]) => {
    setIsLoading(true);
    setErrorMessage('');
    setInvalidBookMessage('');
    try {
      const booksData = await fetchBooks(isbnList);
      const validBooks = booksData.filter(book => book !== null);
      const invalidBooksCount = booksData.length - validBooks.length;
      if (validBooks.length === 0) {
        setErrorMessage('No valid books found. Please check the ISBNs and try again.');
      }
      if (invalidBooksCount > 0) {
        setInvalidBookMessage(`${invalidBooksCount} invalid book(s) skipped.`);
        clearInvalidBookMessage();
      }
      const uniqueBooks = validBooks.filter(
        (book, index, self) => book && index === self.findIndex(b => b?.isbn === book.isbn)
      );
      const qualityCheckedBooks = uniqueBooks.map(book => ({
        ...book,
        publish_date: book?.publish_date
          ? book.publish_date.replace(/\D/g, '').slice(0, 4)
          : 'Unknown'
      }));
      setBooks(qualityCheckedBooks as Book[]);
    } catch (error) {
      setErrorMessage('Failed to fetch books. Please try again later.');
      console.error('Failed to fetch books:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setTimeout(() => setErrorMessage(''), 5000); // Clear error message after 5 seconds
  };

  const clearInvalidBookMessage = () => {
    setTimeout(() => setInvalidBookMessage(''), 5000); // Clear invalid book message after 5 seconds
  };

  useEffect(() => {
    loadBooks(predefinedIsbns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <BookContext.Provider
      value={{
        books,
        setBooks,
        favoriteBooks,
        toggleFavorite,
        isLoading,
        loadBooks,
        errorMessage,
        invalidBookMessage,
        clearError,
        clearInvalidBookMessage
      }}
    >
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

export { BookContext }; 
