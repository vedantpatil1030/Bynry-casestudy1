import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="main-header">
      <nav className="nav-container">
        <h1 className="nav-logo">
          <Link to="/">
            <span className="logo-text">Map Integration</span>
          </Link>
        </h1>

        <button 
          className={`mobile-menu-btn ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/profiles" 
              className={location.pathname === '/profiles' ? 'active' : ''}
            >
              Profiles
            </Link>
          </li>
          <li>
            <Link 
              to="/admin" 
              className={location.pathname === '/admin' ? 'active' : ''}
            >
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;