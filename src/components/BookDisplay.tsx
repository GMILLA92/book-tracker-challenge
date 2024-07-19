// src/components/BookDisplay.tsx
import React from 'react';
import { Book } from '../types';

interface BookDisplayProps {
  book: Book;
}

const BookDisplay: React.FC<BookDisplayProps> = ({ book }) => {
  return (
    <div>
      <h2>{book.title}</h2>
      <p>by {book.authors.join(', ')}</p>
      <img src={book.coverImage} alt={`${book.title} cover`} />
      <p>{book.description}</p>
      {/* Add more detailed information here */}
      <p><strong>Type/Topic:</strong> {book.typeTopic}</p>
      <p><strong>Publish Date:</strong> {book.publish_date}</p>
    </div>
  );
};

export default BookDisplay;

