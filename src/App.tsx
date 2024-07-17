// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/NavBar';
import SavedBooks from './components/SavedBooks';
import { BookProvider } from './context/BookContext';
import './App.css';

const App: React.FC = () => {
  return (
    <BookProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<SavedBooks />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
};

export default App;
