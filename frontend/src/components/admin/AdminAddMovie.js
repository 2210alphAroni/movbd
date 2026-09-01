import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { adminAPI } from "../../utils/api";
import toast from "react-hot-toast";

const GENRES_LIST = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "War",
  "Western",
  "Bangla",
  "Hindi",
  "Hollywood",
];
const QUALITIES = ["CAM", "HD", "FHD", "4K", "BluRay"];
const LANGUAGES = [
  "Bangla",
  "Hindi",
  "English",
  "Tamil",
  "Telugu",
  "Korean",
  "Arabic",
  "Other",
];

const AdminAddMovie = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const isShortfilm = location.pathname.includes("/shortfilms");
  const contentName = isShortfilm ? "Short Film" : "Movie";
  const contentNameLower = isShortfilm ? "short film" : "movie";
  const listPath = isShortfilm ? "/admin/shortfilms" : "/admin/movies";
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    titleBn: "",
    description: "",
    genre: [],
    language: "Bangla",
    releaseYear: new Date().getFullYear(),
    duration: "",
    director: "",
    cast: "",
    country: "Bangladesh",
    quality: "HD",
    trailerUrl: "",
    movieUrl: "",
    isPublished: false,
    isFeatured: false,
  });
  const [posterFile, setPosterFile] = useState(null);
  const [backdropFile, setBackdropFile] = useState(null);
  const [posterPreview, setPosterPreview] = useState("");

  useEffect(() => {
    if (isEdit) {
      const getItem = isShortfilm ? adminAPI.getShortfilm : adminAPI.getMovie;
      getItem(id)
        .then((res) => {
          const m = res.data;
          setForm({
            title: m.title || "",
            titleBn: m.titleBn || "",
            description: m.description || "",
            genre: m.genre || [],
            language: m.language || "Bangla",
            releaseYear: m.releaseYear || 2024,
            duration: m.duration || "",
            director: m.director || "",
            cast: m.cast?.join(", ") || "",
            country: m.country || "",
            quality: m.quality || "HD",
            trailerUrl: m.trailerUrl || "",
            movieUrl: m.movieUrl || "",
            isPublished: m.isPublished,
            isFeatured: m.isFeatured,
          });
          if (m.poster)
            setPosterPreview(
              m.poster?.startsWith("/uploads")
                ? `${import.meta.env.VITE_API_URL || "https://movbd-backend.vercel.app"}${m.poster}`
                : m.poster,
            );
        })
        .catch(() => navigate(listPath));
    }
  }, [id, isShortfilm, listPath, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleGenre = (genre) => {
    setForm((prev) => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter((g) => g !== genre)
        : [...prev.genre, genre],
    }));
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPosterFile(file);
      setPosterPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEdit && !posterFile) {
      toast.error("Poster is required");
      return;
    }
    if (form.genre.length === 0) {
      toast.error("Select at least one genre");
      return;
    }
    if (isShortfilm && Number(form.duration) > 25) {
      toast.error("Short film duration cannot be more than 25 minutes");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === "genre") formData.append("genre", val.join(","));
        else formData.append(key, val);
      });
      if (posterFile) formData.append("poster", posterFile);
      if (backdropFile) formData.append("backdrop", backdropFile);

      if (isEdit) {
        const updateItem = isShortfilm ? adminAPI.updateShortfilm : adminAPI.updateMovie;
        await updateItem(id, formData);
        toast.success(`${contentName} updated!`);
      } else {
        const createItem = isShortfilm ? adminAPI.createShortfilm : adminAPI.createMovie;
        await createItem(formData);
        toast.success(`${contentName} added!`);
      }
      navigate(listPath);
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to save ${contentNameLower}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-add-movie page-enter">
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-grid">
          <div className="form-left">
            <div className="form-group">
              <label className="form-label">{contentName} Title (English) *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                required
                placeholder="e.g. Inception"
              />
            </div>
            <div className="form-group">
              <label className="form-label">{contentName} Title (Bengali)</label>
              <input
                name="titleBn"
                value={form.titleBn}
                onChange={handleChange}
                className="form-control"
                placeholder="বাংলা শিরোনাম"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                required
                rows={5}
                placeholder={`${contentName} synopsis...`}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Language</label>
                <select
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="form-control"
                >
                  {LANGUAGES.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quality</label>
                <select
                  name="quality"
                  value={form.quality}
                  onChange={handleChange}
                  className="form-control"
                >
                  {QUALITIES.map((q) => (
                    <option key={q}>{q}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Release Year</label>
                <input
                  name="releaseYear"
                  type="number"
                  value={form.releaseYear}
                  onChange={handleChange}
                  className="form-control"
                  min="1900"
                  max="2030"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Duration (minutes)</label>
                <input
                  name="duration"
                  type="number"
                  value={form.duration}
                  onChange={handleChange}
                  className="form-control"
                  max={isShortfilm ? "25" : undefined}
                  placeholder={isShortfilm ? "Maximum 25" : "e.g. 120"}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Director</label>
                <input
                  name="director"
                  value={form.director}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Director name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Country</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Cast (comma-separated)</label>
              <input
                name="cast"
                value={form.cast}
                onChange={handleChange}
                className="form-control"
                placeholder="Actor 1, Actor 2, Actor 3"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Trailer URL (YouTube or Facebook)</label>
              <input
                name="trailerUrl"
                value={form.trailerUrl}
                onChange={handleChange}
                className="form-control"
                placeholder="YouTube or Facebook video link"
              />
            </div>
            <div className="form-group">
              <label className="form-label">{contentName} URL (YouTube or Facebook)</label>
              <input
                name="movieUrl"
                value={form.movieUrl}
                onChange={handleChange}
                className="form-control"
                placeholder="YouTube or Facebook video link"
              />
            </div>
          </div>

          <div className="form-right">
            <div className="form-group">
              <label className="form-label">Poster Image *</label>
              <div
                className="image-upload"
                onClick={() => document.getElementById("posterInput").click()}
              >
                {posterPreview ? (
                  <img src={posterPreview} alt="Poster" />
                ) : (
                  <span>Click to upload poster</span>
                )}
              </div>
              <input
                id="posterInput"
                type="file"
                accept="image/*"
                onChange={handlePosterChange}
                hidden
              />
            </div>
            <div className="form-group">
              <label className="form-label">Backdrop Image (optional)</label>
              <div
                className="image-upload backdrop"
                onClick={() => document.getElementById("backdropInput").click()}
              >
                <span>Click to upload backdrop</span>
              </div>
              <input
                id="backdropInput"
                type="file"
                accept="image/*"
                onChange={(e) => setBackdropFile(e.target.files[0])}
                hidden
              />
            </div>

            <div className="form-group">
              <label className="form-label">Genres *</label>
              <div className="genre-selector">
                {GENRES_LIST.map((g) => (
                  <button
                    key={g}
                    type="button"
                    className={`genre-tag ${form.genre.includes(g) ? "selected" : ""}`}
                    onClick={() => toggleGenre(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="toggle-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={form.isPublished}
                  onChange={handleChange}
                />
                <span className="toggle" />
                Publish {contentName} (visible to users)
              </label>
              <label className="toggle-label">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={form.isFeatured}
                  onChange={handleChange}
                />
                <span className="toggle" />
                Feature on Homepage
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(listPath)}
            className="btn btn-ghost btn-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
          >
            {loading ? "Saving..." : isEdit ? `Update ${contentName}` : `Add ${contentName}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddMovie;
