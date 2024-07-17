import React, { useState } from 'react';
import { Book } from '../types';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

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
  favoriteBooks,
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
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th onClick={() => handleSort('coverImage')}>Cover</th>
          <th onClick={() => handleSort('title')}>Title</th>
          <th onClick={() => handleSort('authors')}>Authors</th>
          <th onClick={() => handleSort('publish_date')}>Publish Date</th>
          <th onClick={() => handleSort('typeTopic')}>Type/Topic</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books.map((book, index) => (
          <tr key={index} onClick={() => onBookSelect(book)}>
            <td>
              <img
                src={book.coverImage}
                alt={`${book.title} cover`}
                className="h-20"
              />
            </td>
            <td>{book.title}</td>
            <td>{book.authors.join(', ')}</td>
            <td>{book.publish_date}</td>
            <td>{book.typeTopic}</td>
            <td
              className="text-center"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(book.id);
              }}
            >
              {favoriteBooks.has(book.id) ? (
                <FaHeart
                  className="cursor-pointer text-black custom-heart-icon"
                  fill="black"
                  stroke="black"
                  strokeWidth="4"
                />
              ) : (
                <FaRegHeart
                  className="cursor-pointer text-gray-400 custom-heart-icon"
                  fill="black"
                  stroke="black"
                  strokeWidth="4"
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookTable;
