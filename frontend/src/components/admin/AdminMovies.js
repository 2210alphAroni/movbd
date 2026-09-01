import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { adminAPI } from "../../utils/api";
import { FiEdit, FiTrash2, FiEye, FiEyeOff, FiStar, FiX, FiAlertTriangle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import toast from "react-hot-toast";

const LIMIT = 20;

const AdminMovies = () => {
  const location = useLocation();
  const isShortfilms = location.pathname.includes("/shortfilms");
  const contentName = isShortfilms ? "Short Film" : "Movie";
  const contentNameLower = isShortfilms ? "short film" : "movie";
  const contentPluralLower = isShortfilms ? "short films" : "movies";
  const editBasePath = isShortfilms ? "/admin/shortfilms/edit" : "/admin/movies/edit";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null); // { id, title }
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    fetchMovies(page);
  }, [page, isShortfilms]);

  const fetchMovies = async (pageNum) => {
    setLoading(true);
    try {
      const getItems = isShortfilms ? adminAPI.getShortfilms : adminAPI.getMovies;
      const res = await getItems({ limit: LIMIT, page: pageNum });
      setMovies(res.data.movies);
      // backend shape guess: adjust field names if your API returns differently
      const total = res.data.total ?? res.data.totalMovies ?? res.data.movies?.length ?? 0;
      setTotalMovies(total);
      setTotalPages(res.data.totalPages ?? Math.max(1, Math.ceil(total / LIMIT)));
    } catch (err) {
      toast.error(`Failed to load ${contentPluralLower}`);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const deleteItem = isShortfilms ? adminAPI.deleteShortfilm : adminAPI.deleteMovie;
      await deleteItem(deleteTarget.id);
      toast.success(`${contentName} deleted`);
      setDeleteTarget(null);
      // current page e jodi last item delete hoy ebong ei page e r kichu na thake, previous page e jao
      if (movies.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        fetchMovies(page);
      }
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const handleTogglePublish = async (movie) => {
    try {
      const formData = new FormData();
      formData.append("isPublished", (!movie.isPublished).toString());
      const updateItem = isShortfilms ? adminAPI.updateShortfilm : adminAPI.updateMovie;
      await updateItem(movie._id, formData);
      setMovies((prev) =>
        prev.map((m) =>
          m._id === movie._id ? { ...m, isPublished: !m.isPublished } : m,
        ),
      );
      toast.success(
        movie.isPublished ? `${contentName} unpublished` : `${contentName} published`,
      );
    } catch (err) {
      toast.error("Failed");
    }
  };

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
  };

  // page number list বানানো (max 5টা number দেখাবে, বাকি গুলা ... দিয়ে)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  if (loading)
    return (
      <div className="loading-center">
        <div className="spinner" />
      </div>
    );

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
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>
                  <div className="table-movie">
                    <img
                      src={
                        movie.poster?.startsWith("/uploads")
                          ? `${import.meta.env.VITE_API_URL || "https://movbd-backend.vercel.app"}${movie.poster}`
                          : movie.poster
                      }
                      alt={movie.title}
                    />
                    <div>
                      <strong>{movie.title}</strong>
                      <small>{movie.genre?.join(", ")}</small>
                    </div>
                  </div>
                </td>
                <td>{movie.releaseYear}</td>
                <td>
                  <span className="badge badge-dark">{movie.quality}</span>
                </td>
                <td>
                  <span className="rating-val">
                    <FiStar />
                    {movie.averageRating || 0}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleTogglePublish(movie)}
                    className={`status-btn ${movie.isPublished ? "published" : "draft"}`}
                  >
                    {movie.isPublished ? (
                      <>
                        <FiEye /> Live
                      </>
                    ) : (
                      <>
                        <FiEyeOff /> Draft
                      </>
                    )}
                  </button>
                </td>
                <td>
                  <div className="action-btns">
                    <Link
                      to={`${editBasePath}/${movie._id}`}
                      className="btn btn-ghost btn-sm"
                    >
                      <FiEdit />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget({ id: movie._id, title: movie.title })}
                      className="btn btn-sm"
                      style={{ color: "var(--accent)" }}
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <span className="pagination-info">
            For {totalMovies} {contentPluralLower}, showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, totalMovies)}
          </span>
          <div className="pagination-controls">
            <button
              className="page-btn"
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
            >
              <FiChevronLeft />
            </button>

            {getPageNumbers()[0] > 1 && (
              <>
                <button className="page-btn" onClick={() => goToPage(1)}>1</button>
                {getPageNumbers()[0] > 2 && <span className="page-dots">...</span>}
              </>
            )}

            {getPageNumbers().map((p) => (
              <button
                key={p}
                className={`page-btn ${p === page ? "active" : ""}`}
                onClick={() => goToPage(p)}
              >
                {p}
              </button>
            ))}

            {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
              <>
                {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                  <span className="page-dots">...</span>
                )}
                <button className="page-btn" onClick={() => goToPage(totalPages)}>
                  {totalPages}
                </button>
              </>
            )}

            <button
              className="page-btn"
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="modal-overlay" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              <FiX />
            </button>
            <div className="modal-icon-warning">
              <FiAlertTriangle size={28} />
            </div>
            <h3>Delete {contentNameLower}?</h3>
            <p>
              Are you sure you want to delete <strong>{deleteTarget.title}</strong>? This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Cancel
              </button>
              <button className="btn-danger" onClick={confirmDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMovies;
