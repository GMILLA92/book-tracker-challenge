import React, { useEffect, useState } from 'react';
import { Book } from '../types';
import {
  FaStar,
  FaRegStar,
  FaSort,
  FaSortUp,
  FaSortDown
} from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

interface BookTableContentProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
  toggleFavorite: (bookId: string) => void;
  deleteBook: (book: Book) => void; // Updated prop for deleting a book
  favoriteBooks: Set<string>;
  handleSort: (field: string) => void;
  sortField: string | null;
  sortOrder: 'asc' | 'desc';
}

const BookTableContent: React.FC<BookTableContentProps> = ({
  books,
  onBookSelect,
  toggleFavorite,
  deleteBook,
  favoriteBooks,
  handleSort,
  sortField,
  sortOrder
}) => {
  const getSortingIndicator = (field: string) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 750);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {books.length > 0 && (
        isMobile ? (
          <div className="cards-container">
            {books.map((book, index) => (
              <div key={index} className="card" onClick={() => onBookSelect(book)}>
                <img src={book.coverImage} alt={`${book.title} cover`} />
                <div className="card-content">
                  <h3>{book.title}</h3>
                  <p>Authors: {book.authors.join(', ')}</p>
                  <p>Publish Date: {book.publish_date}</p>
                  <p>Type/Topic: {book.typeTopic}</p>
                </div>
                <div className="card-actions">
                  <div className="favorite" onClick={e => { e.stopPropagation(); toggleFavorite(book.id); }}>
                    {favoriteBooks.has(book.id) ? <FaStar /> : <FaRegStar />}
                  </div>
                  <div className="delete-icon" onClick={e => { e.stopPropagation(); deleteBook(book); }}>
                    <RiDeleteBin5Line />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <table className="table">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-center">Cover</th>
                <th onClick={() => handleSort('title')} className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    Title {getSortingIndicator('title')}
                  </div>
                </th>
                <th onClick={() => handleSort('authors')} className="cursor-pointer">
                  <div className="flex items-center justify-between">
                    Authors {getSortingIndicator('authors')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('publish_date')}
                  className="cursor-pointer publish-date-column"
                >
                  <div className="flex items-center justify-between">
                    Publish Date {getSortingIndicator('publish_date')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('typeTopic')}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    Type/Topic {getSortingIndicator('typeTopic')}
                  </div>
                </th>
                <th className="text-center">Favorite</th>
                <th className="text-center">Delete</th> {/* New column for delete */}
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
                <tr
                  key={index}
                  onClick={() => onBookSelect(book)}
                >
                  <td className="text-center">
                    <div className="img-container">
                      <img
                        src={book.coverImage}
                        alt={`${book.title} cover`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </td>
                  <td className="text-base">{book.title}</td>
                  <td className="text-base">{book.authors.join(', ')}</td>
                  <td className="text-base publish-date-column">
                    {book.publish_date}
                  </td>
                  <td className="whitespace-normal break-words text-base">
                    {book.typeTopic}
                  </td>
                  <td
                    className="text-center"
                    onClick={e => {
                      e.stopPropagation();
                      toggleFavorite(book.id);
                    }}
                  >
                    {favoriteBooks.has(book.id) ? (
                      <FaStar className="favorite text-base" />
                    ) : (
                      <FaRegStar className="favorite text-base" />
                    )}
                  </td>
                  <td
                    className="text-center"
                    onClick={e => {
                      e.stopPropagation();
                      deleteBook(book); // Pass the whole book object
                    }}
                  >
                    <RiDeleteBin5Line className="delete-icon text-base cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      )}
      {books.length === 0 && <div>No results found. Please try with different filters.</div>}
    </>
  );
};

export default BookTableContent;
