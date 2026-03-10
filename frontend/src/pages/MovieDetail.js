import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { moviesAPI, reviewsAPI, watchlistAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { FiStar, FiDownload, FiBookmark, FiPlay, FiClock, FiCalendar, FiGlobe, FiUser, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 8, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchMovie();
    fetchReviews();
    if (user) checkWatchlist();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const res = await moviesAPI.getById(id);
      setMovie(res.data);
    } catch (err) { navigate('/movies'); }
    finally { setLoading(false); }
  };

  const fetchReviews = async () => {
    try {
      const res = await reviewsAPI.getByMovie(id);
      setReviews(res.data);
    } catch (err) {}
  };

  const checkWatchlist = async () => {
    try {
      const res = await watchlistAPI.get();
      setInWatchlist(res.data.some(m => m._id === id));
    } catch (err) {}
  };

  const handleDownload = async () => {
  if (!user) { toast.error('Please login to download'); navigate('/login'); return; }
  setDownloading(true);
  
  const toastId = toast.loading('Starting download...', { duration: Infinity });
  
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL || 'https://movbd-backend.onrender.com'}/api/movies/${id}/download`,
      { headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('movbd_user'))?.token}` } }
    );

    if (!response.ok) throw new Error('Download failed');

    const contentLength = response.headers.get('content-length');
    const total = parseInt(contentLength, 10);
    let loaded = 0;

    const reader = response.body.getReader();
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      loaded += value.length;

      if (total) {
        const percent = Math.round((loaded / total) * 100);
        toast.loading(`Downloading... ${percent}%`, { id: toastId, duration: Infinity });
      } else {
        const mb = (loaded / 1024 / 1024).toFixed(1);
        toast.loading(`Downloading... ${mb} MB`, { id: toastId, duration: Infinity });
      }
    }

    const blob = new Blob(chunks);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${movie.title}.mp4`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    toast.success('Download complete! ✅', { id: toastId, duration: 4000 });
    setMovie(prev => ({ ...prev, downloadCount: prev.downloadCount + 1 }));

  } catch (err) {
    toast.error('Download failed. File may not be available.', { id: toastId, duration: 4000 });
  } finally {
    setDownloading(false);
  }
};

  const handleWatchlist = async () => {
    if (!user) { toast.error('Please login'); navigate('/login'); return; }
    try {
      const res = await watchlistAPI.toggle(id);
      setInWatchlist(res.data.added);
      toast.success(res.data.message);
    } catch (err) { toast.error('Failed'); }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error('Please login to review'); navigate('/login'); return; }
    setSubmittingReview(true);
    try {
      const res = await reviewsAPI.create(id, reviewForm);
      setReviews(prev => [res.data, ...prev]);
      setReviewForm({ rating: 8, comment: '' });
      toast.success('Review posted!');
      fetchMovie(); // update average rating
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post review');
    } finally { setSubmittingReview(false); }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await reviewsAPI.delete(reviewId);
      setReviews(prev => prev.filter(r => r._id !== reviewId));
      toast.success('Review deleted');
      fetchMovie();
    } catch (err) { toast.error('Failed to delete'); }
  };

  if (loading) return <div className="loading-center" style={{minHeight:'100vh'}}><div className="spinner" /></div>;
  if (!movie) return null;

  const posterUrl = movie.poster?.startsWith('/uploads') 
  ? `${import.meta.env.VITE_API_URL || 'https://movbd-backend.onrender.com'}${movie.poster}` 
  : movie.poster;
  const backdropUrl = movie.backdrop?.startsWith('/uploads') 
  ? `${import.meta.env.VITE_API_URL || 'https://movbd-backend.onrender.com'}${movie.backdrop}` 
  : movie.backdrop;

  return (
    <div className="movie-detail page-enter">
      {/* Backdrop */}
      <div className="detail-backdrop" style={{ backgroundImage: `url(${backdropUrl || posterUrl})` }} />
      <div className="detail-overlay" />

      <div className="container detail-content">
        <div className="detail-grid">
          {/* Poster */}
          <div className="detail-poster">
            <img src={posterUrl} alt={movie.title} />
            <div className="poster-actions">
              {movie.trailerUrl && (
                <button onClick={() => setShowTrailer(true)} className="btn btn-primary btn-lg">
                  <FiPlay /> Watch Trailer
                </button>
              )}
              <button onClick={handleDownload} disabled={downloading} className="btn btn-outline btn-lg">
                <FiDownload /> {downloading ? 'Downloading...' : `Download ${movie.fileSize ? `(${movie.fileSize})` : ''}`}
              </button>
              <button onClick={handleWatchlist} className={`btn btn-lg ${inWatchlist ? 'btn-primary' : 'btn-ghost'}`}>
                <FiBookmark /> {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="detail-info">
            <div className="detail-badges">
              <span className="badge badge-accent">{movie.quality}</span>
              {movie.genre?.map(g => <span key={g} className="badge badge-dark">{g}</span>)}
            </div>
            <h1 className="detail-title">{movie.title}</h1>
            {movie.titleBn && <p className="detail-title-bn">{movie.titleBn}</p>}

            <div className="detail-stats">
              <div className="stat-box">
                <FiStar className="gold" />
                <div>
                  <strong>{movie.averageRating > 0 ? movie.averageRating.toFixed(1) : 'N/A'}</strong>
                  <span>{movie.totalReviews} reviews</span>
                </div>
              </div>
              <div className="stat-box">
                <FiDownload />
                <div><strong>{movie.downloadCount}</strong><span>downloads</span></div>
              </div>
            </div>

            <div className="detail-meta-grid">
              {movie.releaseYear && <div className="meta-item"><FiCalendar /><span>{movie.releaseYear}</span></div>}
              {movie.duration && <div className="meta-item"><FiClock /><span>{Math.floor(movie.duration/60)}h {movie.duration%60}m</span></div>}
              {movie.language && <div className="meta-item"><FiGlobe /><span>{movie.language}</span></div>}
              {movie.country && <div className="meta-item"><FiGlobe /><span>{movie.country}</span></div>}
              {movie.director && <div className="meta-item"><FiUser /><span>Dir: {movie.director}</span></div>}
            </div>

            {movie.cast?.length > 0 && (
              <div className="detail-cast">
                <h4>Cast</h4>
                <div className="cast-list">
                  {movie.cast.map(c => <span key={c} className="cast-tag">{c}</span>)}
                </div>
              </div>
            )}

            <div className="detail-desc">
              <h4>Synopsis</h4>
              <p>{movie.description}</p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="reviews-section">
          <h2 className="section-title">Reviews & Ratings</h2>

          {/* Review Form */}
          {user && (
            <form onSubmit={handleReviewSubmit} className="review-form">
              <h3>Write a Review</h3>
              <div className="rating-input">
                <label>Your Rating: <strong>{reviewForm.rating}/10</strong></label>
                <input
                  type="range" min="1" max="10" step="0.5"
                  value={reviewForm.rating}
                  onChange={e => setReviewForm(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                  className="rating-slider"
                />
              </div>
              <textarea
                className="form-control"
                placeholder="Share your thoughts about this movie..."
                value={reviewForm.comment}
                onChange={e => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
                required
              />
              <button type="submit" disabled={submittingReview} className="btn btn-primary">
                {submittingReview ? 'Posting...' : 'Post Review'}
              </button>
            </form>
          )}

          {/* Reviews List */}
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map(review => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <div className="review-user">
                      <div className="review-avatar">{review.user?.name?.charAt(0).toUpperCase()}</div>
                      <div>
                        <strong>{review.user?.name}</strong>
                        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="review-rating">
                      <FiStar className="gold" />
                      <strong>{review.rating}/10</strong>
                      {(user?._id === review.user?._id || user?.role === 'admin') && (
                        <button onClick={() => handleDeleteReview(review._id)} className="delete-btn">
                          <FiTrash2 />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="review-text">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowTrailer(false)} className="close-trailer">✕</button>
            <iframe
              src={movie.trailerUrl}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
