import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../../utils/api';
import { FiEdit, FiTrash2, FiUpload, FiEye, FiEyeOff, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => { fetchMovies(); }, []);

  const fetchMovies = async () => {
    try {
      const res = await adminAPI.getMovies({ limit: 50 });
      setMovies(res.data.movies);
    } catch (err) { toast.error('Failed to load movies'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await adminAPI.deleteMovie(id);
      setMovies(prev => prev.filter(m => m._id !== id));
      toast.success('Movie deleted');
    } catch (err) { toast.error('Delete failed'); }
  };

  const handleTogglePublish = async (movie) => {
    try {
      const formData = new FormData();
      formData.append('isPublished', (!movie.isPublished).toString());
      await adminAPI.updateMovie(movie._id, formData);
      setMovies(prev => prev.map(m => m._id === movie._id ? { ...m, isPublished: !m.isPublished } : m));
      toast.success(movie.isPublished ? 'Movie unpublished' : 'Movie published');
    } catch (err) { toast.error('Failed'); }
  };

  const handleFileUpload = async (movieId, file) => {
    if (!file) return;
    setUploading(prev => ({ ...prev, [movieId]: true }));
    setUploadProgress(prev => ({ ...prev, [movieId]: 0 }));
    try {
      const formData = new FormData();
      formData.append('movieFile', file);
      await adminAPI.uploadFile(movieId, formData, (e) => {
        if (e.total) setUploadProgress(prev => ({ ...prev, [movieId]: Math.round((e.loaded / e.total) * 100) }));
      });
      toast.success('File uploaded!');
      fetchMovies();
    } catch (err) { toast.error('Upload failed'); }
    finally {
      setUploading(prev => ({ ...prev, [movieId]: false }));
      setUploadProgress(prev => ({ ...prev, [movieId]: 0 }));
    }
  };

  if (loading) return <div className="loading-center"><div className="spinner" /></div>;

  return (
    <div className="admin-movies page-enter">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Movie</th>
              <th>Year</th>
              <th>Quality</th>
              <th>Rating</th>
              <th>Downloads</th>
              <th>File</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <td>
                  <div className="table-movie">
                    <img src={movie.poster?.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL || 'https://movbd-backend.onrender.com'}${movie.poster}` : movie.poster} alt={movie.title} />
                    <div>
                      <strong>{movie.title}</strong>
                      <small>{movie.genre?.join(', ')}</small>
                    </div>
                  </div>
                </td>
                <td>{movie.releaseYear}</td>
                <td><span className="badge badge-dark">{movie.quality}</span></td>
                <td><span className="rating-val"><FiStar />{movie.averageRating || 0}</span></td>
                <td>{movie.downloadCount}</td>
                <td>
                  {movie.downloadFile ? (
                    <span className="file-ok">✓ {movie.fileSize}</span>
                  ) : (
                    <label className="upload-label">
                      <FiUpload />
                      {uploading[movie._id] ? `${uploadProgress[movie._id]}%` : 'Upload'}
                      <input type="file" accept=".mp4,.mkv,.avi" onChange={e => handleFileUpload(movie._id, e.target.files[0])} hidden />
                    </label>
                  )}
                </td>
                <td>
                  <button onClick={() => handleTogglePublish(movie)} className={`status-btn ${movie.isPublished ? 'published' : 'draft'}`}>
                    {movie.isPublished ? <><FiEye /> Live</> : <><FiEyeOff /> Draft</>}
                  </button>
                </td>
                <td>
                  <div className="action-btns">
                    <Link to={`/admin/movies/edit/${movie._id}`} className="btn btn-ghost btn-sm"><FiEdit /></Link>
                    <button onClick={() => handleDelete(movie._id, movie.title)} className="btn btn-sm" style={{color:'var(--accent)'}}><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMovies;
