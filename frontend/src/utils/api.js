import axios from 'axios';
const API = axios.create({ baseURL: `${import.meta.env.VITE_API_URL || 'https://movbd-backend.vercel.app'}/api` });

API.interceptors.request.use((config) => {
  const user = localStorage.getItem('movbd_user');
  if (user) {
    const { token } = JSON.parse(user);
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.put('/auth/profile', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export const moviesAPI = {
  getAll: (params) => API.get('/movies', { params }),
  getFeatured: () => API.get('/movies/featured'),
  getGenres: () => API.get('/movies/genres'),
  getById: (id) => API.get(`/movies/${id}`),
  download: (id) => API.get(`/movies/${id}/download`, { responseType: 'blob' }),
};

export const shortfilmsAPI = {
  getAll: (params) => API.get('/shortfilms', { params }),
  getFeatured: () => API.get('/shortfilms/featured'),
  getGenres: () => API.get('/shortfilms/genres'),
  getById: (id) => API.get(`/shortfilms/${id}`),
};

export const reviewsAPI = {
  getByMovie: (movieId) => API.get(`/reviews/${movieId}`),
  create: (movieId, data) => API.post(`/reviews/${movieId}`, data),
  delete: (id) => API.delete(`/reviews/${id}`),
};

export const watchlistAPI = {
  get: () => API.get('/watchlist'),
  toggle: (movieId) => API.post(`/watchlist/${movieId}`),
};

export const adminAPI = {
  getStats: () => API.get('/admin/stats'),
  getMovies: (params) => API.get('/admin/movies', { params }),
  getShortfilms: (params) => API.get('/admin/shortfilms', { params }),
  getMovie: (id) => API.get(`/admin/movies/${id}`),
  getShortfilm: (id) => API.get(`/admin/shortfilms/${id}`),
  createMovie: (data) => API.post('/admin/movies', data),
  createShortfilm: (data) => API.post('/admin/shortfilms', data),
  updateMovie: (id, data) => API.put(`/admin/movies/${id}`, data),
  updateShortfilm: (id, data) => API.put(`/admin/shortfilms/${id}`, data),
  uploadFile: (id, data, onProgress) => API.post(`/admin/movies/${id}/upload-file`, data, {
    onUploadProgress: onProgress,
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteMovie: (id) => API.delete(`/admin/movies/${id}`),
  deleteShortfilm: (id) => API.delete(`/admin/shortfilms/${id}`),
  getUsers: () => API.get('/admin/users'),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
  deleteReview: (id) => API.delete(`/admin/reviews/${id}`),
};

export default API;
