import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apolloClient';

// Import pages
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Routes>
            <Route path='/' element={<SearchBooks />} />
            <Route path='/saved' element={<SavedBooks />} />
            <Route path='*' element={<h1>Wrong page!</h1>} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App; 