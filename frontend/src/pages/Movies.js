import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { moviesAPI, watchlistAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/movie/MovieCard';
import { FiFilter, FiSearch, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './Movies.css';

const QUALITIES = ['CAM', 'HD', 'FHD', '4K', 'BluRay'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'rating', label: 'Top Rated' },
  // { value: 'popular', label: 'Most Downloaded' },
  { value: 'year', label: 'Release Year' },
];

const Movies = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    genre: searchParams.get('genre') || '',
    quality: '',
    sort: 'newest',
    page: 1
  });

  useEffect(() => {
    moviesAPI.getGenres().then(res => setGenres(res.data));
    if (user) watchlistAPI.get().then(res => setWatchlist(res.data.map(m => m._id))).catch(() => {});
  }, [user]);

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await moviesAPI.getAll({ ...filters, limit: 16 });
      setMovies(res.data.movies);
      setTotal(res.data.total);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.pages);
    } catch (err) {
      toast.error('Failed to load movies');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchMovies(); }, [fetchMovies]);

  const handleFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleWatchlistToggle = async (movieId) => {
    if (!user) { toast.error('Please login to use watchlist'); return; }
    try {
      const res = await watchlistAPI.toggle(movieId);
      setWatchlist(prev => res.data.added ? [...prev, movieId] : prev.filter(id => id !== movieId));
      toast.success(res.data.message);
    } catch (err) { toast.error('Failed to update watchlist'); }
  };

  const clearFilters = () => {
    setFilters({ search: '', genre: '', quality: '', sort: 'newest', page: 1 });
    setSearchParams({});
  };

  const hasActiveFilters = filters.search || filters.genre || filters.quality;

  return (
    <div className="movies-page page-enter">
      <div className="movies-header">
        <div className="container">
          <h1 className="section-title">All Movies</h1>
          <p className="movies-count">{total} movies found</p>
        </div>
      </div>

      <div className="container movies-layout">
        {/* Filters Sidebar */}
        <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
          <div className="filters-header">
            <h3>Filters</h3>
            {hasActiveFilters && <button onClick={clearFilters} className="clear-filters"><FiX /> Clear</button>}
          </div>

          <div className="filter-group">
            <label>Search</label>
            <div className="filter-search">
              <FiSearch />
              <input
                type="text"
                placeholder="Movie title..."
                value={filters.search}
                onChange={e => handleFilter('search', e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select value={filters.sort} onChange={e => handleFilter('sort', e.target.value)} className="form-control">
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          <div className="filter-group">
            <label>Genre</label>
            <div className="filter-tags">
              <button className={`tag ${!filters.genre ? 'active' : ''}`} onClick={() => handleFilter('genre', '')}>All</button>
              {genres.map(g => (
                <button key={g} className={`tag ${filters.genre === g ? 'active' : ''}`} onClick={() => handleFilter('genre', g)}>{g}</button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Quality</label>
            <div className="filter-tags">
              <button className={`tag ${!filters.quality ? 'active' : ''}`} onClick={() => handleFilter('quality', '')}>All</button>
              {QUALITIES.map(q => (
                <button key={q} className={`tag ${filters.quality === q ? 'active' : ''}`} onClick={() => handleFilter('quality', q)}>{q}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* Movies Grid */}
        <main className="movies-main">
          <div className="movies-toolbar">
            <button className="btn btn-ghost btn-sm filter-toggle" onClick={() => setShowFilters(!showFilters)}>
              <FiFilter /> Filters {hasActiveFilters && <span className="filter-badge">!</span>}
            </button>
            <span className="showing-text">Showing {movies.length} of {total}</span>
          </div>

          {loading ? (
            <div className="loading-center"><div className="spinner" /></div>
          ) : movies.length === 0 ? (
            <div className="empty-state">
              <p>No movies found</p>
              <button onClick={clearFilters} className="btn btn-outline">Clear Filters</button>
            </div>
          ) : (
            <>
              <div className="movies-grid-main">
                {movies.map(movie => (
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onWatchlistToggle={handleWatchlistToggle}
                    inWatchlist={watchlist.includes(movie._id)}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button disabled={currentPage === 1} onClick={() => handleFilter('page', currentPage - 1)} className="btn btn-ghost">← Prev</button>
                  {[...Array(Math.min(totalPages, 7))].map((_, i) => {
                    const p = i + 1;
                    return <button key={p} className={`page-btn ${p === currentPage ? 'active' : ''}`} onClick={() => handleFilter('page', p)}>{p}</button>;
                  })}
                  <button disabled={currentPage === totalPages} onClick={() => handleFilter('page', currentPage + 1)} className="btn btn-ghost">Next →</button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Movies;
