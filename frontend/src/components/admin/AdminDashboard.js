import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../utils/api';
import AdminMovies from './AdminMovies';
import AdminAddMovie from './AdminAddMovie';
import AdminUsers from './AdminUsers';
import { FiFilm, FiUsers, FiDownload, FiStar, FiTrendingUp, FiPlus, FiGrid, FiLogOut } from 'react-icons/fi';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import './Admin.css';

// Count-up animation hook
const useCountUp = (end, duration = 900) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (end === undefined || end === null) return;
    let startTime = null;
    const startVal = 0;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(startVal + (end - startVal) * eased));
      if (progress < 1) ref.current = requestAnimationFrame(step);
    };

    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [end, duration]);

  return count;
};

const StatCard = ({ icon, label, value, color }) => {
  const animatedValue = useCountUp(value ?? 0);
  return (
    <div className="stat-card stat-card-premium" style={{ '--color': color }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <strong>{animatedValue?.toLocaleString() ?? 0}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      {label && <div className="chart-tooltip-label">{label}</div>}
      {payload.map((entry, i) => (
        <div key={i} className="chart-tooltip-row">
          <span className="chart-tooltip-dot" style={{ background: entry.color || entry.fill }} />
          {entry.name}: <strong>{entry.value}</strong>
        </div>
      ))}
    </div>
  );
};

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

  const published = stats?.published ?? 0;
  const totalMovies = stats?.totalMovies ?? 0;
  const draft = Math.max(totalMovies - published, 0);

  const statusData = [
    { name: 'Published', value: published, color: '#22c55e', gradientId: 'gradGreen' },
    { name: 'Draft', value: draft, color: '#6b7280', gradientId: 'gradGray' },
  ];

  const overviewData = [
    { name: 'Movies', value: totalMovies, color: '#e50914', gradientId: 'gradRed' },
    { name: 'Users', value: stats?.totalUsers ?? 0, color: '#3b82f6', gradientId: 'gradBlue' },
    { name: 'Reviews', value: stats?.totalReviews ?? 0, color: '#8b5cf6', gradientId: 'gradPurple' },
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
                <StatCard icon={<FiStar />} label="Reviews" value={stats?.totalReviews} color="#8b5cf6" />
              </div>

              <div className="charts-grid">
                <div className="chart-card chart-card-premium">
                  <div className="chart-card-header">
                    <h3>Published vs Draft</h3>
                    <span className="chart-badge">{totalMovies} total</span>
                  </div>
                  {totalMovies > 0 ? (
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <defs>
                          <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4ade80" stopOpacity={1} />
                            <stop offset="100%" stopColor="#16a34a" stopOpacity={1} />
                          </linearGradient>
                          <linearGradient id="gradGray" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#9ca3af" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4b5563" stopOpacity={1} />
                          </linearGradient>
                          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" result="blur" />
                            <feMerge>
                              <feMergeNode in="blur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                        </defs>
                        <Pie
                          data={statusData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={95}
                          paddingAngle={4}
                          animationDuration={1000}
                          animationBegin={100}
                          filter="url(#glow)"
                        >
                          {statusData.map((entry, i) => (
                            <Cell key={i} fill={`url(#${entry.gradientId})`} stroke="var(--bg-card)" strokeWidth={3} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          verticalAlign="bottom"
                          iconType="circle"
                          formatter={(value) => <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="chart-empty">No movies yet</div>
                  )}
                </div>

                <div className="chart-card chart-card-premium">
                  <div className="chart-card-header">
                    <h3>Platform Overview</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={overviewData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ff4d4f" stopOpacity={1} />
                          <stop offset="100%" stopColor="#a3080d" stopOpacity={0.85} />
                        </linearGradient>
                        <linearGradient id="gradBlue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                          <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.85} />
                        </linearGradient>
                        <linearGradient id="gradPurple" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a78bfa" stopOpacity={1} />
                          <stop offset="100%" stopColor="#6d28d9" stopOpacity={0.85} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={{ stroke: 'var(--border)' }} tickLine={false} />
                      <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={70} animationDuration={1000} animationBegin={150}>
                        {overviewData.map((entry, i) => (
                          <Cell key={i} fill={`url(#${entry.gradientId})`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
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