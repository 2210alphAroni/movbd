const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  titleBn: { type: String, trim: true },
  description: { type: String, required: true },
  genre: [{ type: String, required: true }],
  language: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  duration: { type: Number },
  director: { type: String },
  cast: [{ type: String }],
  country: { type: String },
  quality: { type: String, enum: ['CAM', 'HD', 'FHD', '4K', 'BluRay'], default: 'HD' },
  poster: { type: String, required: true },
  backdrop: { type: String, default: '' },
  trailerUrl: { type: String, default: '' },
  downloadFile: { type: String, default: '' },
  fileSize: { type: String, default: '' },
  isPublished: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  downloadCount: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// language_override: 'nolang' দিলে MongoDB আর language field কে
// text index language হিসেবে ব্যবহার করবে না
movieSchema.index(
  { title: 'text', description: 'text', director: 'text' },
  { default_language: 'none', language_override: 'nolang' }
);

module.exports = mongoose.model('Movie', movieSchema);