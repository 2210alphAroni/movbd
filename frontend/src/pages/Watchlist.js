import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { watchlistAPI } from '../utils/api';
import MovieCard from '../components/movie/MovieCard';
import { FiBookmark } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Watchlist.css';

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchWatchlist(); }, []);

  const fetchWatchlist = async () => {
    try {
      const res = await watchlistAPI.get();
      setMovies(res.data);
    } catch (err) { toast.error('Failed to load watchlist'); }
    finally { setLoading(false); }
  };

  const handleRemove = async (movieId) => {
    try {
      await watchlistAPI.toggle(movieId);
      setMovies(prev => prev.filter(m => m._id !== movieId));
      toast.success('Removed from watchlist');
    } catch (err) { toast.error('Failed'); }
  };

  return (
    <div className="watchlist-page page-enter">
      <div className="container">
        <div className="watchlist-header">
          <h1 className="section-title"><FiBookmark /> My Watchlist</h1>
          <p>{movies.length} movies saved</p>
        </div>
        {loading ? (
          <div className="loading-center"><div className="spinner" /></div>
        ) : movies.length === 0 ? (
          <div className="empty-state">
            <FiBookmark style={{fontSize:'4rem', color:'var(--text-muted)', marginBottom:'16px'}} />
            <p>Your watchlist is empty</p>
            <Link to="/movies" className="btn btn-primary" style={{marginTop:'16px'}}>Browse Movies</Link>
          </div>
        ) : (
          <div className="watchlist-grid">
            {movies.map(movie => (
              <MovieCard key={movie._id} movie={movie} onWatchlistToggle={handleRemove} inWatchlist={true} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
