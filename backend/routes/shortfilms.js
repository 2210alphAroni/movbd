const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

const shortfilmQuery = { contentType: 'shortfilm' };

// @GET /api/shortfilms - Get all published short films with filters
router.get('/', async (req, res) => {
  try {
    const { search, genre, language, year, quality, sort, page = 1, limit = 12 } = req.query;
    const query = { isPublished: true, ...shortfilmQuery };

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

    const shortfilms = await Movie.find(query)
      .sort(sortOptions[sort] || { createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .select('-downloadFile');

    const total = await Movie.countDocuments(query);
    res.json({ movies: shortfilms, total, pages: Math.ceil(total / limit), currentPage: parseInt(page) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/shortfilms/featured
router.get('/featured', async (req, res) => {
  try {
    const shortfilms = await Movie.find({ isPublished: true, isFeatured: true, ...shortfilmQuery }).limit(5).select('-downloadFile');
    res.json(shortfilms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/shortfilms/genres
router.get('/genres', async (req, res) => {
  try {
    const genres = await Movie.distinct('genre', { isPublished: true, ...shortfilmQuery });
    res.json(genres.sort());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @GET /api/shortfilms/:id
router.get('/:id', async (req, res) => {
  try {
    const shortfilm = await Movie.findById(req.params.id).select('-downloadFile');
    if (!shortfilm || !shortfilm.isPublished || shortfilm.contentType !== 'shortfilm') {
      return res.status(404).json({ message: 'Short film not found' });
    }
    res.json(shortfilm);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
