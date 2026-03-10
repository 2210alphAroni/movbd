# 🎬 MovBD - Full Stack Movie Management Platform

Bangladesh's premier movie platform built with MERN Stack.

---

## ✨ Features

### User Features
- 🔐 Register & Login with JWT authentication
- 🎥 Browse, search & filter movies by genre, quality, year
- 📺 Watch YouTube trailers in-page
- ⬇️ Download movies (login required)
- ⭐ Rate & review movies (1-10 scale)
- 💬 Comment section per movie
- 🔖 Watchlist / Favorites management
- 🌙 Netflix-style dark theme

### Admin Features
- 📊 Dashboard with stats (movies, users, downloads, reviews)
- ➕ Add/Edit/Delete movies with poster & backdrop upload
- 📤 Upload movie files directly (MP4/MKV/AVI up to 10GB)
- 👥 Manage users
- 📢 Publish/unpublish movies
- ⭐ Feature movies on homepage

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (JSON Web Tokens) |
| File Upload | Multer |
| Styling | Custom CSS (Netflix dark theme) |

---

## 🚀 Quick Setup

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

### 1. Clone & Install

```bash
# Backend
cd movbd/backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI

# Frontend
cd ../frontend
npm install
```

### 2. Configure Environment

Edit `backend/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/movbd
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
```

### 3. Run the Project

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### 4. Create Admin Account

After starting, register a normal user, then update in MongoDB:
```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@movbd.com" },
  { $set: { role: "admin" } }
)
```

Or use this seeder script:
```bash
cd backend
node -e "
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.create({ name: 'Admin', email: 'admin@movbd.com', password: 'admin123', role: 'admin' });
  console.log('Admin created: admin@movbd.com / admin123');
  process.exit();
});
"
```

---

## 📁 Project Structure

```
movbd/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model with bcrypt
│   │   ├── Movie.js         # Movie model
│   │   └── Review.js        # Reviews & ratings model
│   ├── routes/
│   │   ├── auth.js          # Register, login, profile
│   │   ├── movies.js        # Public movie routes + download
│   │   ├── admin.js         # Admin CRUD + file upload
│   │   ├── reviews.js       # Create/delete reviews
│   │   └── watchlist.js     # Toggle watchlist
│   ├── middleware/
│   │   ├── auth.js          # JWT protect + adminOnly
│   │   └── upload.js        # Multer for poster/movie files
│   ├── uploads/             # Stored files (gitignore this)
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── common/
        │   │   ├── Navbar.js + Navbar.css
        │   │   └── Footer.js + Footer.css
        │   ├── movie/
        │   │   └── MovieCard.js + MovieCard.css
        │   └── admin/
        │       ├── AdminDashboard.js
        │       ├── AdminMovies.js
        │       ├── AdminAddMovie.js
        │       ├── AdminUsers.js
        │       └── Admin.css
        ├── context/
        │   └── AuthContext.js   # Global auth state
        ├── pages/
        │   ├── Home.js + Home.css
        │   ├── Movies.js + Movies.css
        │   ├── MovieDetail.js + MovieDetail.css
        │   ├── Login.js + Auth.css
        │   ├── Register.js
        │   └── Watchlist.js + Watchlist.css
        ├── utils/
        │   └── api.js           # Axios API calls
        ├── App.js
        ├── index.js
        └── index.css            # Global styles + variables
```

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Protected |
| PUT | `/api/auth/profile` | Protected |

### Movies
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/movies` | Public |
| GET | `/api/movies/featured` | Public |
| GET | `/api/movies/genres` | Public |
| GET | `/api/movies/:id` | Public |
| GET | `/api/movies/:id/download` | Protected |

### Admin
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/admin/stats` | Admin |
| GET/POST | `/api/admin/movies` | Admin |
| PUT/DELETE | `/api/admin/movies/:id` | Admin |
| POST | `/api/admin/movies/:id/upload-file` | Admin |
| GET/DELETE | `/api/admin/users/:id` | Admin |

### Reviews & Watchlist
| Method | Endpoint | Access |
|--------|----------|--------|
| GET/POST | `/api/reviews/:movieId` | Public/Protected |
| DELETE | `/api/reviews/:id` | Owner/Admin |
| GET | `/api/watchlist` | Protected |
| POST | `/api/watchlist/:movieId` | Protected |

---

## 🎨 YouTube Trailer URL Format

When adding a movie, use YouTube **embed** URL:
```
https://www.youtube.com/embed/VIDEO_ID
```
Example: `https://www.youtube.com/embed/dQw4w9WgXcQ`

---

## 🔒 Security Notes

- Change `JWT_SECRET` in production
- Add rate limiting for production
- Store files on cloud (AWS S3/Cloudinary) for production
- Add HTTPS in production

---

## 📦 Production Deployment

```bash
# Build frontend
cd frontend
npm run build

# Serve frontend from backend (add to server.js)
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')));
```

---

*Built with ❤️ for Bangladesh cinema lovers*
