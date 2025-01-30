import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { SAVE_BOOK } from '../utils/mutations';
import { searchGoogleBooks } from '../utils/API';

const SearchBooks = () => {
  // Create state for holding search field data
  const [searchInput, setSearchInput] = useState('');
  // Create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // Create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState([]);
  // Create state for loading
  const [isLoading, setIsLoading] = useState(false);
  // Create state for error handling
  const [error, setError] = useState('');

  // Set up mutation
  const [saveBook] = useMutation(SAVE_BOOK);

  // Load saved book ids from localStorage
  useEffect(() => {
    const savedIds = localStorage.getItem('saved_books')
      ? JSON.parse(localStorage.getItem('saved_books'))
      : [];
    setSavedBookIds(savedIds);
  }, []);

  // Handle search submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description || 'No description available',
        image: book.volumeInfo.imageLinks?.thumbnail || '',
        link: book.volumeInfo.infoLink
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      setError('Failed to search books. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle saving a book
  const handleSaveBook = async (bookId) => {
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    if (!Auth.loggedIn()) {
      return false;
    }

    try {
      await saveBook({
        variables: { bookData: bookToSave }
      });

      // Save book id to localStorage
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
      localStorage.setItem('saved_books', JSON.stringify([...savedBookIds, bookToSave.bookId]));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Search for Books!</h2>
      <form onSubmit={handleFormSubmit} className="mb-8">
        <input
          type="text"
          placeholder="Search for a book"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
          Submit Search
        </button>
      </form>

      {isLoading && <div className="loading-spinner">Searching...</div>}

      {error && <div className="error-message">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchedBooks.map((book) => (
          <div key={book.bookId} className="border p-4 rounded">
            <img
              src={book.image}
              alt={`The cover for ${book.title}`}
              className="w-full h-64 object-cover"
            />
            <h3 className="text-xl font-bold mt-2">{book.title}</h3>
            <p className="text-gray-600">Authors: {book.authors.join(', ')}</p>
            <p className="mt-2">{book.description}</p>
            {Auth.loggedIn() && (
              <button
                disabled={savedBookIds.includes(book.bookId)}
                onClick={() => handleSaveBook(book.bookId)}
                className={`mt-2 px-4 py-2 rounded ${
                  savedBookIds.includes(book.bookId)
                    ? 'bg-gray-300'
                    : 'bg-green-500 text-white'
                }`}
              >
                {savedBookIds.includes(book.bookId)
                  ? 'Book Already Saved!'
                  : 'Save This Book!'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks; 