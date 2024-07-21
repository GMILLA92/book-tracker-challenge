import axios from 'axios';
import { filterSubjects } from '../utils/filterSubjects';
const BASE_URL = 'https://openlibrary.org/api/books';
const placeholderImage = process.env.PUBLIC_URL + '/no-photo.png';

// Function to fetch basic book data
export const fetchBookData = async (isbnList: string[]) => {
  const query = isbnList.map(isbn => `ISBN:${isbn}`).join(',');
  const url = `${BASE_URL}?bibkeys=${query}&format=json&jscmd=data`;
  return axios.get(url).then(response => {
    return response.data;
  });
};

// Function to fetch detailed book data
export const fetchBookDetails = async (isbnList: string[]) => {
  const query = isbnList.map(isbn => `ISBN:${isbn}`).join(',');
  const url = `${BASE_URL}?bibkeys=${query}&format=json&jscmd=details`;
  return axios.get(url).then(response => {
    return response.data;
  });
};

// Combined function to fetch and merge both data and details
export const fetchBooks = async (isbnList: string[]) => {
  const [dataResponse, detailsResponse] = await Promise.all([
    fetchBookData(isbnList),
    fetchBookDetails(isbnList)
  ]);

  const books = isbnList.map(isbn => {
    const key = `ISBN:${isbn}`;
    const data = dataResponse[key] || {};
    const details = detailsResponse[key]?.details || {};

    const subjects = data.subjects;
    const filteredSubjects = subjects ? filterSubjects(subjects.map((subject: { name: any }) => subject.name)) : ['Unknown'];

    const publishPlaces = details.publish_places || data.publish_places;
    const publishPlace = Array.isArray(publishPlaces)
      ? publishPlaces.map((place: any) => (place.name ? place.name : place)).join(', ')
      : 'Unknown';

    // Quality check for publish_date
    let publish_date = (details.publish_date || data.publish_date || '').replace(/\D/g, '').slice(0, 4);
    publish_date = publish_date || 'Unknown';

    return {
      id: key,
      isbn: isbn,
      title: details.title || data.title || 'Unknown Title',
      authors: details.authors?.map((author: { name: any }) => author.name) || data.authors?.map((author: { name: any }) => author.name) || ['Unknown'],
      publish_date: publish_date,
      description: details.by_statement || data.description || 'No description available.',
      coverImage: data.cover?.medium || placeholderImage,
      typeTopic: filteredSubjects.join(', ') || 'Uncategorized',
      publish_place: publishPlace,
      number_of_pages: details.number_of_pages || data.number_of_pages || 'Not available',
      language: (details.languages || data.languages)?.map((lang: { key: string }) => lang.key.replace('/languages/', '')).join(', ') || 'Unknown'
    };
  });

  // Preload images
  const imagePromises = books.map(book => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = book.coverImage;
      img.onload = resolve;
      img.onerror = resolve; // Resolve even if the image fails to load
    });
  });

  await Promise.all(imagePromises);

  return books;
};
