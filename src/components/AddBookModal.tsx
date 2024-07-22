import axios from 'axios'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { fetchBooks } from '../services/bookService'
import { Book } from '../types'

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
  const [filteredBooks, setFilteredBooks] = useState<any[]>([])

  const fetchBooksData = async (query: string) => {
    if (!query) return // Doing nothing if the query is empty-null
    setIsLoading(true) // Trigger loading div
    try {
      const isbns = query.split(',').map(isbn => isbn.trim())
      const response = await axios.get(
        `https://openlibrary.org/search.json?${searchType}=${isbns.join(',')}`
      )

      const fetchedBooks = response.data.docs
      setFilteredBooks(fetchedBooks)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to fetch books:', error)
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    fetchBooksData(input)
    setShowExamples(false)
  }

  const handleSelectBook = async (selectedBook: any) => {
    try {
      const detailedBooks = await fetchBooks([selectedBook.isbn[0]])
      if (detailedBooks.length > 0 && detailedBooks[0]) {
        onAddBook(detailedBooks[0])
      }
    } catch (error) {
      console.error('Failed to fetch detailed book information:', error)
    }
    onClose()
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const isChecked = e.target.checked

    // Uncheck the rest of checkboxes
    document
      .querySelectorAll<HTMLInputElement>(
        '.query-examples input[type="checkbox"]'
      )
      .forEach(checkbox => {
        if (checkbox !== e.target) {
          checkbox.checked = false
        }
      })

    if (isChecked) {
      setInput(value)
    } else {
      setInput('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInput(newValue)

    const isbnsInInput = newValue.split(',').map(isbn => isbn.trim())
    document
      .querySelectorAll<HTMLInputElement>(
        '.query-examples input[type="checkbox"]'
      )
      .forEach(checkbox => {
        checkbox.checked = isbnsInInput.includes(checkbox.value)
      })
  }

  if (!isOpen) return null // Don't render if the modal is not open

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
            <button
              onClick={handleSearch}
              className='search-button'
              aria-label='search'
              data-testid='search-button'
            >
              <FaSearch />
            </button>
          </div>

          {/* Some examples I decided to put in the user interface so that users can test how to add a book easily */}
          {showExamples && (
            <div className='query-examples'>
              <h4>EXAMPLES</h4>
              <div className='example-queries'>
                <div>
                  <h1>'On the road' by Jack Kerouac</h1>
                  <label>
                    <input
                      type='checkbox'
                      value='9780140042597'
                      onChange={handleCheckboxChange}
                    />
                    9780140042597
                  </label>
                </div>
                <div>
                  <h1>'The color purple' by Alice Walker</h1>
                  <label>
                    <input
                      type='checkbox'
                      value='9780547555638'
                      onChange={handleCheckboxChange}
                    />
                    9780547555638
                  </label>
                </div>
                <div>
                  <h1>'Lolita' by Vladímir Nabókov</h1>
                  <label>
                    <input
                      type='checkbox'
                      value='9780141193670'
                      onChange={handleCheckboxChange}
                    />
                    9780141193670
                  </label>
                </div>
              </div>
            </div>
          )}
          {isLoading ? (
            <div className='lds-default'>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          ) : (
            !showExamples && (
              <>
                <ul className='results-dropdown'>
                  {filteredBooks.map(book => (
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
