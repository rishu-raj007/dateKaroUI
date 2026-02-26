import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'; // We will create this or use inline/global

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check for auth token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Always dark background on pages other than home
    if (location.pathname !== '/') {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Check initial scroll
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Connect<span className="dot">.</span>
          </Link>
        </div>
        <nav className="nav-menu">
          <Link to="/tour">Tour</Link>
          <Link to="/advice">Dating Advice</Link>
          <Link to="/stories">Success Stories</Link>
          {isLoggedIn ? (
            <>
              <Link to="/timeline" className="highlight-link">Discover</Link>
              <Link to="/liked-profiles" className="nav-item">Likes</Link>
              <Link to="/chat" className="nav-item">Messages</Link>
              <Link to="/dashboard" className="signin-btn">My Profile</Link>
            </>
          ) : (
            <Link to="/signin" className="signin-btn">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
