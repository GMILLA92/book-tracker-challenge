import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { fetchBooks } from '../services/bookService'
import { Book } from '../types'

interface BookContextProps {
  books: Book[]
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>
  favoriteBooks: Set<string>
  toggleFavorite: (bookId: string) => void
  isLoading: boolean
  loadBooks: (isbnList: string[]) => void
}

interface BookProviderProps {
  children: ReactNode
}

const BookContext = createContext<BookContextProps | undefined>(undefined)

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([])
  const [favoriteBooks, setFavoriteBooks] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const predefinedIsbns = [
    '0451526538',
    '0140449132',
    '067978327X',
    '0201558025',
    '9780743273565',
    '9780061120084',
    '9781400033416',
    '9781451673319',
    '9780385490818',
    '9780679732761',
    '9780439139601',
    '9780743272933',
    '9780452284241',
    '9780345803481',
    '9780545010221',
    '9780261103573',
    '9780618002238',
    '9780618002245',
    '9780062315007',
    '9780525559474',
    '9788408156745',
    '9780802123981'
  ]

  const loadBooks = async (isbnList: string[]) => {
    setIsLoading(true)
    try {
      const booksData = await fetchBooks(isbnList)
      const uniqueBooks = booksData.filter(
        (book, index, self) =>
          index === self.findIndex(b => b.isbn === book.isbn)
      )
      const qualityCheckedBooks = uniqueBooks.map(book => ({
        ...book,
        publish_date: book.publish_date
          ? book.publish_date.replace(/\D/g, '').slice(0, 4)
          : 'Unknown'
      }))
      setBooks(qualityCheckedBooks as Book[])
    } catch (error) {
      console.error('Failed to fetch books:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadBooks(predefinedIsbns)
  }, [])

  const toggleFavorite = (bookId: string) => {
    setFavoriteBooks(prev => {
      const updatedFavorites = new Set(prev)
      if (updatedFavorites.has(bookId)) {
        updatedFavorites.delete(bookId)
      } else {
        updatedFavorites.add(bookId)
      }
      return updatedFavorites
    })
  }

  return (
    <BookContext.Provider
      value={{
        books,
        setBooks,
        favoriteBooks,
        toggleFavorite,
        isLoading,
        loadBooks
      }}
    >
      {children}
    </BookContext.Provider>
  )
}

export const useBookContext = () => {
  const context = useContext(BookContext)
  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider')
  }
  return context
}
