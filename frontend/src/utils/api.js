import axios from 'axios';
const API = axios.create({ baseURL: `${import.meta.env.VITE_API_URL || 'https://movbd-backend.onrender.com'}/api` });
// Every request এ automatically token attach করবে
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
  updateProfile: (data) => API.put('/auth/profile', data),
};

export const moviesAPI = {
  getAll: (params) => API.get('/movies', { params }),
  getFeatured: () => API.get('/movies/featured'),
  getGenres: () => API.get('/movies/genres'),
  getById: (id) => API.get(`/movies/${id}`),
  download: (id) => API.get(`/movies/${id}/download`, { responseType: 'blob' }),
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
  createMovie: (data) => API.post('/admin/movies', data),
  updateMovie: (id, data) => API.put(`/admin/movies/${id}`, data),
  uploadFile: (id, data, onProgress) => API.post(`/admin/movies/${id}/upload-file`, data, {
    onUploadProgress: onProgress,
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteMovie: (id) => API.delete(`/admin/movies/${id}`),
  getUsers: () => API.get('/admin/users'),
  deleteUser: (id) => API.delete(`/admin/users/${id}`),
  deleteReview: (id) => API.delete(`/admin/reviews/${id}`),
};

export default API;