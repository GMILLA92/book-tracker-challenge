// src/services/bookService.ts
import axios from 'axios';

const BASE_URL = 'https://openlibrary.org/api/books';

export const fetchBooks = async (isbnList: string[]) => {
  const query = isbnList.map(isbn => `ISBN:${isbn}`).join(',');
  const response = await axios.get(`${BASE_URL}?bibkeys=${query}&format=json&jscmd=data`);
  return response.data;
};
