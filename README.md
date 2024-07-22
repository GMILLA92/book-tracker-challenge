# Book Tracker Application

## Overview

Welcome to the Book Tracker application! This project is designed to help you keep track of books you're interested in reading, have read, or want to recommend to others. The application provides a user-friendly interface for managing your book list, allowing you to add, search, filter, and save books conveniently.

## Project Details

### Technologies Used

**React**: For building the user interface.
**TypeScript**: For type safety and better development experience.
**Jest**: For unit testing.
**Tailwind CSS**: For styling the application.
**Babel**: For transpiling the code.
**Axios**: For making HTTP requests to the OpenLibrary API.
**React Icons**: For adding iconography to the application.

### Project Structure

- src/components: Contains all the React components.
- src/context: Contains the BookContext for managing state.
- src/services: Contains bookService.ts for API calls.
- src/types: Contains TypeScript types.
- src/utils: Contains utility functions like filtering subjects.
- public: Contains public assets like the placeholder image.

## Features

- **Book List**: Display a list of books with their details.
- **Search and Filter**: Search by title, author, and filter by subjects, year range, and author prefix.
- **Add Book**: Add new books using ISBN via the OpenLibrary API.
- **Save Favorite Books**: Mark books as favorites and view them in a separate section.
- **Delete Books**: Remove books from the list.
- **Responsive Design**: The application is responsive and works well on tablets and mobile devices.

## Assumptions and Decisions

- API Selection: Chose the OpenLibrary API for its extensive database of books.
- ISBN as Identifier: Used ISBN numbers for API calls as it is a reliable way to identify books.
- Initial Book List: Loaded an initial set of books using predefined ISBNs to showcase the functionality.
- Placeholder Image: Used a placeholder image for books without a cover.
- Book Categories: Defined main subjects to categorize books for better filtering.

## Future Enhancements

- Categorize Saved Books: Add categories like read books, books to read, and books to recommend.
- Notes Feature: Allow users to add notes to each book.
- Extended Filtering: Enhance filtering options with more criteria.
- User Authentication: Add user authentication to save personal book lists.

## Installation and Running the Project

### Prerequisites

Node.js (version 18 or higher)
npm or yarn package manager


## Steps to Run the Project

1. Clone the Repository
```
git clone https://github.com/GMILLA92/digital-hub-challenge
```

```
cd challenge-digital-hub
```

2. Install Dependencies

  ```
yarn install
   ```
or
  ```
npm install
   ```


3. Start the Application

  ```
npm start
   ```
or
  ```
yarn start
   ```


### Testing the Application

```
npm test
```

### Authors
Name: Gemma Milla


