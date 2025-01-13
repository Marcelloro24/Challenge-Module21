import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook] = useMutation(REMOVE_BOOK);

  const userData = data?.me || {};

  // Handle book deletion
  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
        update: cache => {
          const { me } = cache.readQuery({ query: GET_ME });
          cache.writeQuery({
            query: GET_ME,
            data: {
              me: {
                ...me,
                savedBooks: me.savedBooks.filter(book => book.bookId !== bookId)
              }
            }
          });
        }
      });

      // Remove book's id from localStorage
      const savedBookIds = localStorage.getItem('saved_books')
        ? JSON.parse(localStorage.getItem('saved_books'))
        : null;

      if (savedBookIds) {
        const updatedSavedBookIds = savedBookIds.filter((savedBookId) => savedBookId !== bookId);
        localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {userData.savedBooks?.length
          ? `Viewing ${userData.savedBooks.length} saved ${
              userData.savedBooks.length === 1 ? 'book' : 'books'
            }:`
          : 'You have no saved books!'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userData.savedBooks?.map((book) => (
          <div key={book.bookId} className="border p-4 rounded">
            <img
              src={book.image}
              alt={`The cover for ${book.title}`}
              className="w-full h-64 object-cover"
            />
            <h3 className="text-xl font-bold mt-2">{book.title}</h3>
            <p className="text-gray-600">Authors: {book.authors.join(', ')}</p>
            <p className="mt-2">{book.description}</p>
            <button
              onClick={() => handleDeleteBook(book.bookId)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete this Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedBooks; 