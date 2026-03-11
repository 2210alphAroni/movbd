const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const User = require('../models/User');
const Review = require('../models/Review');
const { protect, adminOnly } = require('../middleware/auth');
const { uploadPoster, uploadMovie } = require('../middleware/upload');

// All admin routes require auth + admin role
router.use(protect, adminOnly);

// @GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [totalMovies, totalUsers, totalReviews, published, featured] = await Promise.all([
      Movie.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Review.countDocuments(),
      Movie.countDocuments({ isPublished: true }),
      Movie.countDocuments({ isFeatured: true })
    ]);
    const totalDownloads = await Movie.aggregate([{ $group: { _id: null, total: { $sum: '$downloadCount' } } }]);
    res.json({
      totalMovies, totalUsers, totalReviews, published, featured,
      totalDownloads: totalDownloads[0]?.total || 0
    });
  } catch (err) {
    console.error("Error:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({ message: err.message || JSON.stringify(err) });
  }
});

// @GET /api/admin/movies - All movies (including unpublished)
router.get('/movies', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const movies = await Movie.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    const total = await Movie.countDocuments();
    res.json({ movies, total, pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error("Error:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({ message: err.message || JSON.stringify(err) });
  }
});

// @POST /api/admin/movies - Create movie
const cpUpload = (req, res, next) => {
  const upload = uploadPoster.fields([{ name: 'poster', maxCount: 1 }, { name: 'backdrop', maxCount: 1 }]);
  upload(req, res, next);
};

router.post('/movies', cpUpload, async (req, res) => {
  try {
    const { title, titleBn, description, genre, language, releaseYear, duration, director, cast, country, quality, trailerUrl, movieUrl, isPublished, isFeatured } = req.body;

    if (!req.files?.poster) return res.status(400).json({ message: 'Poster is required' });

    const movie = await Movie.create({
      title,
      titleBn,
      description,
      genre: Array.isArray(genre) ? genre : genre?.split(",").map((g) => g.trim()),
      cast: Array.isArray(cast) ? cast : cast?.split(",").map((c) => c.trim()),
      language,
      releaseYear: parseInt(releaseYear),
      duration: duration ? parseInt(duration) : undefined,
      director,
      country,
      quality,
      trailerUrl,
      movieUrl,
      poster: req.files.poster[0].path,
      backdrop: req.files.backdrop ? req.files.backdrop[0].path : "",
      isPublished: isPublished === "true",
      isFeatured: isFeatured === "true",
    });
    res.status(201).json(movie);
  } catch (err) {
    console.error("Error:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({ message: err.message || JSON.stringify(err) });
  }
});

// @POST /api/admin/movies/:id/upload-file - Upload movie file
router.post('/movies/:id/upload-file', uploadMovie.single('movieFile'), async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const fileSizeInMB = (req.file.size / (1024 * 1024)).toFixed(1);
    const fileSizeDisplay = fileSizeInMB > 1024
      ? `${(fileSizeInMB / 1024).toFixed(2)} GB`
      : `${fileSizeInMB} MB`;

    movie.downloadFile = req.file.path;
    movie.fileSize = req.file.size ? `${(req.file.size / (1024 * 1024)).toFixed(1)} MB` : 'Unknown';

    await movie.save();
    res.json({ message: 'File uploaded successfully', fileSize: fileSizeDisplay });
  } catch (err) {
    console.error("Error:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({ message: err.message || JSON.stringify(err) });
  }
});

// @PUT /api/admin/movies/:id - Update movie
router.put('/movies/:id', cpUpload, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const fields = ['title', 'titleBn', 'description', 'language', 'releaseYear', 'duration', 'director', 'country', 'quality', 'trailerUrl', 'movieUrl'];
    fields.forEach(f => { if (req.body[f] !== undefined) movie[f] = req.body[f]; });

    if (req.body.genre) movie.genre = Array.isArray(req.body.genre) ? req.body.genre : req.body.genre.split(',').map(g => g.trim());
    if (req.body.cast) movie.cast = Array.isArray(req.body.cast) ? req.body.cast : req.body.cast.split(',').map(c => c.trim());
    if (req.body.isPublished !== undefined) movie.isPublished = req.body.isPublished === 'true';
    if (req.body.isFeatured !== undefined) movie.isFeatured = req.body.isFeatured === 'true';
    if (req.files?.poster) movie.poster = req.files.poster[0].path;
    if (req.files?.backdrop) movie.backdrop = req.files.backdrop[0].path;

    await movie.save();
    res.json(movie);
  } catch (err) {
    console.error("Error:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({ message: err.message || JSON.stringify(err) });
  }
});

// @DELETE /api/admin/movies/:id
router.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    await Review.deleteMany({ movie: req.params.id });
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error("Error:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({ message: err.message || JSON.stringify(err) });
  }
});

// @GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("Error:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({ message: err.message || JSON.stringify(err) });
  }
});

// @DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error("Error:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({ message: err.message || JSON.stringify(err) });
  }
});

// @DELETE /api/admin/reviews/:id
router.delete('/reviews/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error("Error:", JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({ message: err.message || JSON.stringify(err) });
  }
});

module.exports = router;