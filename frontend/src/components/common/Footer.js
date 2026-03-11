import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-content">
      <div className="footer-brand">
        <div className="footer-logo">
          MOV<span>BD</span>
        </div>
        <p>
          Bangladesh's premier platform for watching and reviewing movies. All
          genres, all languages, completely free.
        </p>
      </div>
      <div className="footer-links">
        <div>
          <h4>Browse</h4>
          <Link to="/movies">All Movies</Link>
          <Link to="/movies?genre=Action">Action</Link>
          <Link to="/movies?genre=Drama">Drama</Link>
          <Link to="/movies?genre=Bangla">Bangla Movies</Link>
        </div>
        <div>
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} MovBD • MERN Stack</p>
      <small>
        Developed by
        <a
          href="https://roniportfolio.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Nabinur Islam Roni
        </a>
      </small>
    </div>
  </footer>
);

export default Footer;
