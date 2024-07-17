// src/components/BookTable.tsx
import React, { useState } from 'react';
import { Book } from '../types';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './BookTable.css'; // Import the CSS file

interface BookTableProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
  toggleFavorite: (bookId: string) => void;
  favoriteBooks: Set<string>;
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  onBookSelect,
  toggleFavorite,
  favoriteBooks
}) => {
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    books.sort((a, b) => {
      if (a[field as keyof Book] < b[field as keyof Book]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[field as keyof Book] > b[field as keyof Book]) {
        return order === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead className="bg-primary text-white">
          <tr>
            <th className="text-center" onClick={() => handleSort('coverImage')}>Cover</th>
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('authors')}>Authors</th>
            <th onClick={() => handleSort('publish_date')}>Publish Date</th>
            <th onClick={() => handleSort('typeTopic')}>Type/Topic</th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index} onClick={() => onBookSelect(book)} className="hover:bg-base transition duration-200">
              <td className="text-center">
                <div className="img-container">
                  <img
                    src={book.coverImage}
                    alt={`${book.title} cover`}
                  />
                </div>
              </td>
              <td className="text-base">{book.title}</td>
              <td className="text-base">{book.authors.join(', ')}</td>
              <td className="text-base">{book.publish_date}</td>
              <td className="whitespace-normal break-words text-base">{book.typeTopic}</td>
              <td
                className="text-center"
                onClick={e => {
                  e.stopPropagation();
                  toggleFavorite(book.id);
                }}
              >
                {favoriteBooks.has(book.id) ? (
                  <FaHeart className="favorite text-base" />
                ) : (
                  <FaRegHeart className="favorite text-base" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookTable;
