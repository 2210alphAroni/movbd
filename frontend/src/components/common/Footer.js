import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

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
        <div className="footer-social">
          <a
            href="https://www.facebook.com/ronystorys"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/ronystorys?igsi=eGw2bDNqNnJjMGQ2"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2c2.7 0 3.1 0 4.1.1 1.1 0 1.8.2 2.2.4a4.4 4.4 0 0 1 1.6 1c.5.5.8 1 1 1.6.2.4.4 1.1.4 2.2.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1.1-.2 1.8-.4 2.2a4.4 4.4 0 0 1-1 1.6c-.5.5-1 .8-1.6 1-.4.2-1.1.4-2.2.4-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1.1 0-1.8-.2-2.2-.4a4.4 4.4 0 0 1-1.6-1c-.5-.5-.8-1-1-1.6-.2-.4-.4-1.1-.4-2.2C2 15.1 2 14.7 2 12s0-3.1.1-4.1c0-1.1.2-1.8.4-2.2a4.4 4.4 0 0 1 1-1.6c.5-.5 1-.8 1.6-1 .4-.2 1.1-.4 2.2-.4C8.9 2 9.3 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-8.4a1.2 1.2 0 1 1-2.3 0 1.2 1.2 0 0 1 2.3 0z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@nabinurislamrony5819"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M23 12s0-3.6-.5-5.3c-.2-1-1-1.7-2-1.9C18.8 4.3 12 4.3 12 4.3s-6.8 0-8.5.5c-1 .2-1.8.9-2 1.9C1 8.4 1 12 1 12s0 3.6.5 5.3c.2 1 1 1.7 2 1.9 1.7.5 8.5.5 8.5.5s6.8 0 8.5-.5c1-.2 1.8-.9 2-1.9.5-1.7.5-5.3.5-5.3zM9.8 15.5V8.5l6.2 3.5-6.2 3.5z" />
            </svg>
          </a>
        </div>
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
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/watchlist">Watchlist</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <div>
          <h4>Support</h4>
          <Link to="/faq">FAQ</Link>
          <Link to="/help">Help Center</Link>
          <Link to="/report">Report an Issue</Link>
          <a href="mailto:pstaru8@gmail.com">pstaru8@gmail.com</a>
        </div>
        <div>
          <h4>Legal</h4>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© {new Date().getFullYear()} MovBD</p>
      <small>
        Developed by
        <a
          href="https://nabinurislamroni.me"
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
