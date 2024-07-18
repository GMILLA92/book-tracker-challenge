// src/components/BookTable.tsx
import React, { useState } from 'react';
import { Book } from '../types';
import { FaHeart, FaRegHeart, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Pagination from './Pagination';
import Search from './Search';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchColumn, setSearchColumn] = useState<string>('all');
  const itemsPerPage = 5;

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

  const getSortingIndicator = (field: string) => {
    if (sortField === field) {
      return sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleSearch = (book: Book) => {
    if (searchColumn === 'all') {
      return Object.values(book).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return book[searchColumn as keyof Book]
      ?.toString()
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  };

  const filteredBooks = books.filter(handleSearch);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const displayedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="table-container">
      <Search
        searchTerm={searchTerm}
        searchColumn={searchColumn}
        onSearchTermChange={setSearchTerm}
        onSearchColumnChange={setSearchColumn}
      />
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
            <th onClick={() => handleSort('publish_date')} className="cursor-pointer publish-date-column">
              <div className="flex items-center justify-between">
                Publish Date {getSortingIndicator('publish_date')}
              </div>
            </th>
            <th onClick={() => handleSort('typeTopic')} className="cursor-pointer">
              <div className="flex items-center justify-between">
                Type/Topic {getSortingIndicator('typeTopic')}
              </div>
            </th>
            <th className="text-center"></th>
          </tr>
        </thead>
        <tbody>
          {displayedBooks.map((book, index) => (
            <tr key={index} onClick={() => onBookSelect(book)} className="transition duration-200">
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
              <td className="text-base publish-date-column">{book.publish_date}</td>
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default BookTable;
