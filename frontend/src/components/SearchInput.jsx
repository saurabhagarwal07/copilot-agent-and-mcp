import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSearchTerm } from '../store/booksSlice';
import styles from '../styles/BookList.module.css';

// generated-by-copilot: SearchInput component dispatches search term to Redux store
const SearchInput = () => {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(state => state.books.searchTerm);

  const handleChange = e => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClear = () => {
    dispatch(setSearchTerm(''));
  };

  return (
    <div className={styles.searchWrapper} data-testid="search-wrapper">
      <span className={styles.searchIcon} aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search by title or author…"
        value={searchTerm}
        onChange={handleChange}
        aria-label="Search books"
        data-testid="search-input"
      />
      {searchTerm && (
        <button
          className={styles.searchClear}
          onClick={handleClear}
          aria-label="Clear search"
          data-testid="search-clear"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchInput;
