const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Movie = require('../models/Movie');
const { protect } = require('../middleware/auth');

// @GET /api/reviews/:movieId
router.get('/:movieId', async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.movieId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/reviews/:movieId
router.post('/:movieId', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || !comment) return res.status(400).json({ message: 'Rating and comment required' });

    const existingReview = await Review.findOne({ movie: req.params.movieId, user: req.user._id });
    if (existingReview) return res.status(400).json({ message: 'You already reviewed this movie' });

    const review = await Review.create({
      movie: req.params.movieId, user: req.user._id,
      rating: parseInt(rating), comment
    });

    // Update movie average rating
    const allReviews = await Review.find({ movie: req.params.movieId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await Movie.findByIdAndUpdate(req.params.movieId, {
      averageRating: Math.round(avgRating * 10) / 10,
      totalReviews: allReviews.length
    });

    const populated = await review.populate('user', 'name avatar');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @DELETE /api/reviews/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });

    await review.deleteOne();

    const allReviews = await Review.find({ movie: review.movie });
    const avgRating = allReviews.length > 0
      ? allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length : 0;
    await Movie.findByIdAndUpdate(review.movie, {
      averageRating: Math.round(avgRating * 10) / 10,
      totalReviews: allReviews.length
    });

    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
