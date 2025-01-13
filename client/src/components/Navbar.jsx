import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar = () => {
  // Set mobile menu state
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-primary-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Google Books Search
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setShowMenu(!showMenu)}
        >
          <span>☰</span>
        </button>

        {/* Navigation links */}
        <div className={`md:flex ${showMenu ? 'block' : 'hidden'}`}>
          <Link to="/" className="text-white px-4 py-2 hover:text-gray-300">
            Search For Books
          </Link>
          {/* Conditional rendering based on authentication */}
          {Auth.loggedIn() ? (
            <>
              <Link to="/saved" className="text-white px-4 py-2 hover:text-gray-300">
                See Your Books
              </Link>
              <button
                onClick={Auth.logout}
                className="text-white px-4 py-2 hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowMenu(false)}
              className="text-white px-4 py-2 hover:text-gray-300"
            >
              Login/Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 