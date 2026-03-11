import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiSearch, FiMenu, FiX, FiUser, FiLogOut, FiBookmark, FiSettings } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setDropdownOpen(false); }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-text">MOV</span>
          <span className="logo-accent">BD</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/movies" className={location.pathname.startsWith('/movies') ? 'active' : ''}>Movies</Link>
          {isAdmin && <Link to="/admin" className={location.pathname.startsWith('/admin') ? 'active' : ''}>Admin</Link>}
        </div>

        <div className="nav-right">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn"><FiSearch /></button>
          </form>

          {user ? (
            <div className="user-menu" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="user-avatar">
                {user.avatar
                  ? <img src={user.avatar} alt={user.name} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'50%'}} />
                  : user.name?.charAt(0).toUpperCase()
                }
              </div>
              {dropdownOpen && (
                <div className="dropdown">
                  <div className="dropdown-header">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <Link to="/watchlist" className="dropdown-item"><FiBookmark /> Watchlist</Link>
                  <Link to="/profile" className="dropdown-item"><FiUser /> Profile</Link>
                  {isAdmin && <Link to="/admin" className="dropdown-item"><FiSettings /> Admin Panel</Link>}
                  <button className="dropdown-item logout" onClick={logout}><FiLogOut /> Logout</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          )}

          <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <form onSubmit={handleSearch} className="mobile-search">
            <input type="text" placeholder="Search movies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <button type="submit"><FiSearch /></button>
          </form>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          {user ? (
            <>
              <Link to="/watchlist">Watchlist</Link>
              <Link to="/profile">Profile</Link>
              {isAdmin && <Link to="/admin">Admin</Link>}
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;