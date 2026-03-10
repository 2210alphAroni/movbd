import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiDownload, FiBookmark, FiPlay } from 'react-icons/fi';
import './MovieCard.css';

const MovieCard = ({ movie, onWatchlistToggle, inWatchlist }) => {
  const posterUrl = movie.poster?.startsWith('/uploads')
    ? `${import.meta.env.VITE_API_URL || 'https://movbd-backend.onrender.com'}${movie.poster}`
    : movie.poster || 'https://via.placeholder.com/300x450/16161f/666?text=No+Poster';

  return (
    <div className="movie-card">
      <div className="card-poster">
        <img src={posterUrl} alt={movie.title} loading="lazy" />
        <div className="card-overlay">
          <Link to={`/movies/${movie._id}`} className="play-btn">
            <FiPlay />
          </Link>
          {onWatchlistToggle && (
            <button
              className={`watchlist-btn ${inWatchlist ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); onWatchlistToggle(movie._id); }}
              title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <FiBookmark />
            </button>
          )}
        </div>
        <div className="card-badges">
          <span className="badge badge-accent">{movie.quality || 'HD'}</span>
          {movie.isFeatured && <span className="badge badge-gold">Featured</span>}
        </div>
      </div>
      <div className="card-info">
        <Link to={`/movies/${movie._id}`} className="card-title">{movie.title}</Link>
        <div className="card-meta">
          <span>{movie.releaseYear}</span>
          <span className="dot">•</span>
          <span>{movie.genre?.[0]}</span>
        </div>
        <div className="card-footer">
          <div className="card-rating">
            <FiStar className="star" />
            <span>{movie.averageRating > 0 ? movie.averageRating.toFixed(1) : 'N/A'}</span>
          </div>
          {movie.downloadCount > 0 && (
            <div className="card-downloads">
              <FiDownload />
              <span>{movie.downloadCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
