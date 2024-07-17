// src/components/Search.tsx
import React from 'react';
import './Search.css'; // Import the CSS file for search

interface SearchProps {
  searchTerm: string;
  searchColumn: string;
  onSearchTermChange: (term: string) => void;
  onSearchColumnChange: (column: string) => void;
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  searchColumn,
  onSearchTermChange,
  onSearchColumnChange
}) => {
  return (
    <div className="search-container flex justify-between mb-4">
      <input
        type="text"
        className="search-input p-px border rounded"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
      <select
        className="search-select p-2 border rounded"
        value={searchColumn}
        onChange={(e) => onSearchColumnChange(e.target.value)}
      >
        <option value="all">All</option>
        <option value="title">Title</option>
        <option value="authors">Authors</option>
        <option value="publish_date">Publish Date</option>
        <option value="typeTopic">Type/Topic</option>
      </select>
    </div>
  );
};

export default Search;
