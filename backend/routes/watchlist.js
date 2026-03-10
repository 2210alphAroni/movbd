const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

router.use(protect);

// @GET /api/watchlist
router.get('/', async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('watchlist', 'title poster averageRating releaseYear genre quality');
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @POST /api/watchlist/:movieId - Toggle watchlist
router.post('/:movieId', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const movieId = req.params.movieId;
    const idx = user.watchlist.indexOf(movieId);

    if (idx === -1) {
      user.watchlist.push(movieId);
      await user.save();
      res.json({ message: 'Added to watchlist', added: true });
    } else {
      user.watchlist.splice(idx, 1);
      await user.save();
      res.json({ message: 'Removed from watchlist', added: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
