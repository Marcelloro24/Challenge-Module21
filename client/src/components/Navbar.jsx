import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import viteLogo from '../assets/vite.svg';

const Navbar = () => {
  // Set mobile menu state
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Google Books Search
        </Link>

        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Search For Books
          </Link>
          {Auth.loggedIn() ? (
            <>
              <Link to="/saved" className="text-white hover:text-gray-300">
                See Your Books
              </Link>
              <button
                onClick={Auth.logout}
                className="text-white hover:text-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-white hover:text-gray-300"
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