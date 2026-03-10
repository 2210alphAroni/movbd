const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const Movie = require('../models/Movie');
const { protect } = require('../middleware/auth');

// @GET /api/movies - Get all published movies with filters
router.get('/', async (req, res) => {
  try {
    const { search, genre, language, year, quality, sort, page = 1, limit = 12 } = req.query;
    const query = { isPublished: true };

    if (search) query.$text = { $search: search };
    if (genre) query.genre = { $in: [genre] };
    if (language) query.language = language;
    if (year) query.releaseYear = parseInt(year);
    if (quality) query.quality = quality;

    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      rating: { averageRating: -1 },
      popular: { downloadCount: -1 },
      year: { releaseYear: -1 }
    };

    const movies = await Movie.find(query)
      .sort(sortOptions[sort] || { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-downloadFile');

    const total = await Movie.countDocuments(query);
    res.json({ movies, total, pages: Math.ceil(total / limit), currentPage: parseInt(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/movies/featured
router.get('/featured', async (req, res) => {
  try {
    const movies = await Movie.find({ isPublished: true, isFeatured: true }).limit(5).select('-downloadFile');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/movies/genres - Get all unique genres
router.get('/genres', async (req, res) => {
  try {
    const genres = await Movie.distinct('genre', { isPublished: true });
    res.json(genres.sort());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/movies/:id
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).select('-downloadFile');
    if (!movie || !movie.isPublished) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/movies/:id/download - Protected download
router.get('/:id/download', protect, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie || !movie.isPublished) return res.status(404).json({ message: 'Movie not found' });
    if (!movie.downloadFile) return res.status(404).json({ message: 'No download file available' });

    // Increment download count
    movie.downloadCount += 1;
    await movie.save();

    const filePath = path.join(__dirname, '..', movie.downloadFile);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File not found on server' });

    res.download(filePath, `${movie.title}.${path.extname(filePath).slice(1)}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
