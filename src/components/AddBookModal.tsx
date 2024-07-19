import './ModalBook.css'
import './AddBookModal.css'
import React, { useState } from 'react'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'

interface Book {
  key: string
  title: string
  author_name: string[]
  isbn?: string[]
}

interface Props {
  onClose: () => void
  onAddBook: (book: Book) => void
  isOpen: boolean
}

const AddBookModal: React.FC<Props> = ({ isOpen, onClose, onAddBook }) => {
  const [input, setInput] = useState<string>('')
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchType, setSearchType] = useState<string>('isbn')
  const [showExamples, setShowExamples] = useState<boolean>(true)

  const fetchBooks = async (query: string) => {
    if (!query) return
    setIsLoading(true)
    try {
      console.log('sadasdsd')
      const isbns = query.split(',').map(isbn => isbn.trim())
      console.log(
        `https://openlibrary.org/search.json?${searchType}=${isbns.join('&')}`
      )
      const response = await axios.get(
        `https://openlibrary.org/search.json?${searchType}=${isbns.join('&')}`
      )
      console.log(response)
      let filteredBooks: Book[] = []
      response.data.docs.forEach((element: Book) => {
        filteredBooks.push(element)
      })
      setBooks(filteredBooks)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch books:', error)
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    fetchBooks(input)
    setShowExamples(false)
  }

  const handleSelectBook = (book: Book) => {
    onAddBook(book)
    onClose()
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const isChecked = e.target.checked
    let updatedInput = input.split(',').map(isbn => isbn.trim())

    if (isChecked) {
      if (input === '') {
        updatedInput = [value]
      } else {
        updatedInput.push(value)
      }
    } else {
      updatedInput = updatedInput.filter(isbn => isbn !== value)
    }

    setInput(updatedInput.join(', '))
  }

  // Handle input changes to uncheck checkboxes if ISBN is removed from input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInput(newValue)

    // Uncheck checkboxes if the ISBN is removed from the input
    const isbnsInInput = newValue.split(',').map(isbn => isbn.trim())
    document
      .querySelectorAll<HTMLInputElement>(
        '.query-examples input[type="checkbox"]'
      )
      .forEach(checkbox => {
        checkbox.checked = isbnsInInput.includes(checkbox.value)
      })
  }

  if (!isOpen) return null

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}>
          ×
        </button>
        <div className='modal-body'>
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSearchType(e.target.value)
            }
          >
            <option value='isbn'>ISBN</option>
          </select>
          <div className='search-container'>
            <input
              type='text'
              placeholder={`Search by ${searchType}...`}
              value={input}
              onChange={handleInputChange}
              className='modal-input'
            />
            <button onClick={handleSearch} className='search-button'>
              <FaSearch />
            </button>
          </div>
          {showExamples && (
            <div className='query-examples'>
              <h4>EXAMPLES</h4>
              <div className='example-queries'>
                <div>
                  <h1>Pride and Prejudice" by Jane Austen</h1>
                  <label>
                    <input
                      type='checkbox'
                      value='0141439513'
                      onChange={handleCheckboxChange}
                    />
                    0141439513
                  </label>
                </div>
                <div>
                  <h1>
                    Harry Potter and the Sorcerer's Stone" by J.K. Rowling
                  </h1>
                  <label>
                    <input
                      type='checkbox'
                      value='9780545582889'
                      onChange={handleCheckboxChange}
                    />
                    9780545582889
                  </label>
                </div>
                <div>
                  <h1>"1984" by George Orwell</h1>
                  <label>
                    <input
                      type='checkbox'
                      value='9780451524935'
                      onChange={handleCheckboxChange}
                    />
                    9780451524935
                  </label>
                </div>
                <div>
                  <h1>The Lord of the Rings" by J.R.R. Tolkien</h1>
                  <label>
                    <input
                      type='checkbox'
                      value='9780544003415'
                      onChange={handleCheckboxChange}
                    />
                    9780544003415
                  </label>
                </div>
              </div>
            </div>
          )}
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            !showExamples && (
              <>
                <ul>
                  {books.map(book => (
                    <li key={book.key} onClick={() => handleSelectBook(book)}>
                      {book.title} by {book.author_name?.join(', ')}
                    </li>
                  ))}
                </ul>
              </>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default AddBookModal
