import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { moviesAPI, watchlistAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/movie/MovieCard';
import { FiPlay, FiInfo, FiChevronRight, FiTrendingUp, FiStar } from 'react-icons/fi';
import { FiUser } from "react-icons/fi";
import toast from 'react-hot-toast';
import './Home.css';

const GENRES = ['Action', 'Drama', 'Comedy', 'Thriller', 'Romance', 'Horror', 'Sci-Fi', 'Animation'];

const Home = () => {
  const { user } = useAuth();
  const [featured, setFeatured] = useState([]);
  const [movies, setMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});
  const [watchlist, setWatchlist] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    if (user) fetchWatchlist();
  }, [user]);

  useEffect(() => {
    if (featured.length > 1) {
      const timer = setInterval(() => setHeroIndex(i => (i + 1) % featured.length), 6000);
      return () => clearInterval(timer);
    }
  }, [featured]);

  const fetchData = async () => {
    try {
      const [featuredRes, moviesRes] = await Promise.all([
        moviesAPI.getFeatured(),
        moviesAPI.getAll({ limit: 12, sort: 'newest' })
      ]);
      setFeatured(featuredRes.data || []);
      setMovies(moviesRes.data.movies || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const res = await watchlistAPI.get();
      setWatchlist((res.data || []).map(m => m._id));
    } catch (err) {}
  };

  const handleWatchlistToggle = async (movieId) => {
    if (!user) { toast.error('Please login to use watchlist'); return; }
    try {
      const res = await watchlistAPI.toggle(movieId);
      setWatchlist(prev => res.data.added ? [...prev, movieId] : prev.filter(id => id !== movieId));
      toast.success(res.data.message);
    } catch (err) {
      toast.error('Failed to update watchlist');
    }
  };

  const hero = featured[heroIndex];
  const heroPoster = hero?.backdrop || hero?.poster;
  const API_URL = import.meta.env.VITE_API_URL || 'https://movbd-backend.onrender.com';
  const heroPosterUrl = heroPoster?.startsWith('/uploads') ? `${API_URL}${heroPoster}` : heroPoster;

  return (
    <div className="home page-enter">
      {/* Hero Section */}
      {hero && (
        <section
          className="hero"
          style={{ "--hero-bg": `url(${heroPosterUrl})` }}
        >
          <div className="hero-backdrop" />
          <div className="container hero-content">
            <div className="hero-text">
              <div className="hero-badges">
                <span className="badge badge-accent">{hero.quality}</span>
                {hero.genre?.slice(0, 2).map((g) => (
                  <span key={g} className="badge badge-dark">
                    {g}
                  </span>
                ))}
              </div>
              <h1 className="hero-title">{hero.title}</h1>
              {hero.titleBn && <p className="hero-title-bn">{hero.titleBn}</p>}
              <div className="hero-meta">
                <span>
                  <FiStar className="gold" />{" "}
                  {hero.averageRating > 0
                    ? hero.averageRating.toFixed(1)
                    : "New"}
                </span>
                <span>{hero.releaseYear}</span>
                {hero.duration && (
                  <span>
                    {Math.floor(hero.duration / 60)}h {hero.duration % 60}m
                  </span>
                )}
                <span>{hero.language}</span>
              </div>
              <p className="hero-desc">{hero.description?.slice(0, 200)}...</p>
              <div className="hero-actions">
                <Link
                  to={`/movies/${hero._id}`}
                  className="btn btn-primary btn-lg"
                >
                  <FiPlay /> Watch Now
                </Link>
                <Link
                  to={`/movies/${hero._id}`}
                  className="btn btn-ghost btn-lg"
                >
                  <FiInfo /> More Info
                </Link>
              </div>
            </div>
          </div>
          {featured.length > 1 && (
            <div className="hero-dots">
              {featured.map((_, i) => (
                <button
                  key={i}
                  className={`dot-btn ${i === heroIndex ? "active" : ""}`}
                  onClick={() => setHeroIndex(i)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Latest Movies */}
      <section className="movies-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <FiTrendingUp /> Latest Movies
            </h2>
            <Link to="/movies" className="see-all">
              See All <FiChevronRight />
            </Link>
          </div>
          {loading ? (
            <div className="loading-center">
              <div className="spinner" />
            </div>
          ) : (
            <div className="movies-grid">
              {Array.isArray(movies) &&
                movies.map((movie) => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onWatchlistToggle={handleWatchlistToggle}
                    inWatchlist={watchlist.includes(movie._id)}
                  />
                ))}
            </div>
          )}
          <div className="browse-more">
            <Link to="/movies" className="btn btn-outline btn-lg">
              Browse All Movies
            </Link>
          </div>
        </div>
      </section>

      {/* Genre Browse */}
      <section className="genre-section">
        <div className="container">
          <h2 className="section-title">Browse by Genre</h2>
          <div className="genre-grid">
            {GENRES.map((genre, i) => (
              <Link
                key={genre}
                to={`/movies?genre=${genre}`}
                className="genre-card"
                style={{ "--delay": `${i * 0.05}s` }}
              >
                <span className="genre-name">{genre}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="stats-banner">
        <div className="container stats-grid">
          <div className="stat-item">
            <FiUser className="stat-icon" />
            <strong>Login & Registration</strong>
            <span>Secure account access with easy sign up & login</span>
          </div>
          <div className="stat-item">
            <FiStar className="stat-icon" />
            <strong>User Reviews</strong>
            <span>Rate and review any movie</span>
          </div>
          <div className="stat-item">
            <FiPlay className="stat-icon" />
            <strong>Trailer Preview</strong>
            <span>Watch trailers before downloading</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;