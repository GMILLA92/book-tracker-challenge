import React from 'react'
import { FaTimes } from 'react-icons/fa'
import './ModalBook.css'
import './Search.css'
import { Book } from '../types'

// In answer to the suggested requirement "show one item from the table and display it in a showcase format."
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  book: Book | null
}

const ModalBook: React.FC<ModalProps> = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null // Ensuring that a book is selected

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}>
          <FaTimes size={20} />
        </button>
        <div className='modal-body'>
          <div className='book-details'>
            <h2>{book.title}</h2>
            <p>
              <strong>Authors:</strong> {book.authors.join(', ')}
            </p>
            <img src={book.coverImage} alt={`${book.title} cover`} />
            <p>
              <strong>Description:</strong> {book.description}
            </p>
            <p>
              <strong>Type/Topic:</strong> {book.typeTopic}
            </p>
            <p>
              <strong>Publish Date:</strong> {book.publish_date}
            </p>
            <p>
              <strong>Publish Place:</strong> {book.publish_place}
            </p>
            <p>
              <strong>Number of Pages:</strong> {book.number_of_pages}
            </p>
            <p>
              <strong>Language:</strong> {book.language}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalBook
