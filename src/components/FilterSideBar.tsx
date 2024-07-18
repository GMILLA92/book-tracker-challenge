// src/components/FilterSidebar.tsx
import React, { useState } from 'react'
import './FilterSidebar.css'

const subjects = [
  'Fiction',
  'Non-Fiction',
  'Science Fiction',
  'Fantasy',
  'Biography',
  'History',
  'Children',
  'Young Adult',
  'Mystery',
  'Romance',
  'Thriller',
  'Adventure',
  'Classic'
];

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([
    1900,
    new Date().getFullYear()
  ]);
  const [authorPrefix, setAuthorPrefix] = useState<string>('');

  const handleSubjectChange = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject) ? prev.filter(s => s !== subject) : [...prev, subject]
    );
  };

  const handleYearRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newRange = [...yearRange] as [number, number];
    newRange[index] = parseInt(event.target.value, 10);
    setYearRange(newRange);
  };

  const handleFilterApply = () => {
    onFilterChange({ subjects: selectedSubjects, yearRange, authorPrefix });
  };

  const handleFilterReset = () => {
    // Reset all filters to their default values
    setSelectedSubjects([]);
    setYearRange([1900, new Date().getFullYear()]);
    setAuthorPrefix('');
    onFilterChange({ subjects: [], yearRange: [1900, new Date().getFullYear()], authorPrefix: '' });
  };

  return (
    <div className='filter-sidebar'>
      <div className='filter-section'>
        <h4>Type of Book</h4>
        {subjects.map(subject => (
          <div key={subject}>
            <input
              type='checkbox'
              id={subject}
              checked={selectedSubjects.includes(subject)}
              onChange={() => handleSubjectChange(subject)}
            />
            <label htmlFor={subject}>{subject}</label>
          </div>
        ))}
      </div>
      <div className='filter-section'>
        <h4>Year Range</h4>
        <div>
          <label htmlFor='start-year'>From:</label>
          <input
            type='number'
            id='start-year'
            value={yearRange[0]}
            onChange={e => handleYearRangeChange(e, 0)}
          />
        </div>
        <div>
          <label htmlFor='end-year'>To:</label>
          <input
            type='number'
            id='end-year'
            value={yearRange[1]}
            onChange={e => handleYearRangeChange(e, 1)}
          />
        </div>
      </div>
      <div className='filter-section'>
        <h4>Author</h4>
        <input
          type='text'
          placeholder='Start with...'
          className='input-author'
          value={authorPrefix}
          onChange={e => setAuthorPrefix(e.target.value)}
        />
      </div>
      <button className='button-filters' onClick={handleFilterApply}>
        Apply Filters
      </button>
      <button className='button-filters' onClick={handleFilterReset} style={{ marginTop: "10px" }}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
