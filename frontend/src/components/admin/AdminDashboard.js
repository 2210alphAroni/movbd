import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../utils/api';
import AdminMovies from './AdminMovies';
import AdminAddMovie from './AdminAddMovie';
import AdminUsers from './AdminUsers';
import { FiFilm, FiUsers, FiDownload, FiStar, FiTrendingUp, FiPlus, FiGrid, FiLogOut } from 'react-icons/fi';
import './Admin.css';

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card" style={{ '--color': color }}>
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <strong>{value?.toLocaleString() ?? 0}</strong>
      <span>{label}</span>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [stats, setStats] = useState(null);

  useEffect(() => { adminAPI.getStats().then(r => setStats(r.data)).catch(() => {}); }, []);

  if (!user || user.role !== 'admin') return <Navigate to="/" />;

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: <FiGrid />, exact: true },
    { to: '/admin/movies', label: 'Movies', icon: <FiFilm /> },
    { to: '/admin/movies/add', label: 'Add Movie', icon: <FiPlus /> },
    { to: '/admin/users', label: 'Users', icon: <FiUsers /> },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span>MOV</span><span className="r">BD</span>
          <small>Admin</small>
        </div>
        <nav className="admin-nav">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={`admin-nav-item ${location.pathname === item.to ? 'active' : ''}`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <div className="admin-avatar">{user.name?.charAt(0)}</div>
            <div><strong>{user.name}</strong><small>Administrator</small></div>
          </div>
          <button onClick={logout} className="logout-btn"><FiLogOut /></button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <h2 className="admin-page-title">
            {location.pathname === '/admin' && 'Dashboard Overview'}
            {location.pathname === '/admin/movies' && 'Manage Movies'}
            {location.pathname === '/admin/movies/add' && 'Add New Movie'}
            {location.pathname === '/admin/users' && 'Manage Users'}
          </h2>
          <Link to="/" className="btn btn-ghost btn-sm">← View Site</Link>
        </div>

        <Routes>
          <Route path="/" element={
            <div className="admin-overview page-enter">
              <div className="stats-cards">
                <StatCard icon={<FiFilm />} label="Total Movies" value={stats?.totalMovies} color="#e50914" />
                <StatCard icon={<FiTrendingUp />} label="Published" value={stats?.published} color="#22c55e" />
                <StatCard icon={<FiUsers />} label="Users" value={stats?.totalUsers} color="#3b82f6" />
                <StatCard icon={<FiDownload />} label="Total Downloads" value={stats?.totalDownloads} color="#f59e0b" />
                <StatCard icon={<FiStar />} label="Reviews" value={stats?.totalReviews} color="#8b5cf6" />
              </div>
              <div className="admin-quick-actions">
                <h3>Quick Actions</h3>
                <div className="quick-grid">
                  <Link to="/admin/movies/add" className="quick-card"><FiPlus /> Add New Movie</Link>
                  <Link to="/admin/movies" className="quick-card"><FiFilm /> Manage Movies</Link>
                  <Link to="/admin/users" className="quick-card"><FiUsers /> View Users</Link>
                </div>
              </div>
            </div>
          } />
          <Route path="/movies" element={<AdminMovies />} />
          <Route path="/movies/add" element={<AdminAddMovie />} />
          <Route path="/movies/edit/:id" element={<AdminAddMovie />} />
          <Route path="/users" element={<AdminUsers />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
