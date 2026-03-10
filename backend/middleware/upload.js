const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createStorage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, `../uploads/${folder}`);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  if (allowed.test(path.extname(file.originalname).toLowerCase())) cb(null, true);
  else cb(new Error('Only images allowed'));
};

const videoFilter = (req, file, cb) => {
  const allowed = /mp4|mkv|avi|mov/;
  if (allowed.test(path.extname(file.originalname).toLowerCase())) cb(null, true);
  else cb(new Error('Only video files allowed'));
};

exports.uploadPoster = multer({ storage: createStorage('posters'), fileFilter: imageFilter, limits: { fileSize: 5 * 1024 * 1024 } });
exports.uploadMovie = multer({ storage: createStorage('movies'), fileFilter: videoFilter, limits: { fileSize: 10 * 1024 * 1024 * 1024 } }); // 10GB
