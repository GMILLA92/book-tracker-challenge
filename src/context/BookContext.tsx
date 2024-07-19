// src/context/BookContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { fetchBooks } from '../services/bookService'
import { Book } from '../types'
import { filterSubjects } from '../utils/filterSubjects'

interface BookContextProps {
  books: Book[]
  favoriteBooks: Set<string>
  toggleFavorite: (bookId: string) => void
  isLoading: boolean
}

const BookContext = createContext<BookContextProps | undefined>(undefined)

interface BookProviderProps {
  children: ReactNode
}

// Path to the placeholder image in the public folder
const placeholderImage = process.env.PUBLIC_URL + '/no-photo.png'

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([])
  const [favoriteBooks, setFavoriteBooks] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState<boolean>(true) // Initialize isLoading

  const toggleFavorite = (bookId: string) => {
    setFavoriteBooks(prevFavorites => {
      const newFavorites = new Set(prevFavorites)
      if (newFavorites.has(bookId)) {
        newFavorites.delete(bookId)
      } else {
        newFavorites.add(bookId)
      }
      return newFavorites
    })
  }

  useEffect(() => {
    const isbnList = ['0451526538', '0140449132', '067978327X', '0201558025']
    const fetchData = async () => {
      try {
        setIsLoading(true) // Set loading to true before fetching data
        const data = await fetchBooks(isbnList)
        const bookArray = Object.keys(data).map(key => {
          const subjects = data[key].subjects?.map(
            (subject: any) => subject.name
          ) || ['Unknown']
          const filteredSubjects = filterSubjects(subjects)
          return {
            id: key,
            title: data[key].title,
            authors: data[key].authors?.map((author: any) => author.name) || [],
            publish_date: data[key].publish_date,
            description: data[key].notes || 'No description available.',
            coverImage: data[key].cover?.medium || placeholderImage,
            typeTopic: filteredSubjects.join(', ') || 'Uncategorized'
          }
        })
        setBooks(bookArray)
      } catch (error) {
        console.error('Failed to fetch books:', error)
      } finally {
        setIsLoading(false) // Set loading to false after fetching data
      }
    }

    fetchData()
  }, [])

  return (
    <BookContext.Provider
      value={{ books, favoriteBooks, toggleFavorite, isLoading }}
    >
      {children}
    </BookContext.Provider>
  )
}

export const useBookContext = () => {
  const context = useContext(BookContext)
  if (context === undefined) {
    throw new Error('useBookContext must be used within a BookProvider')
  }
  return context
}
