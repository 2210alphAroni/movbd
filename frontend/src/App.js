import React from 'react';
const API = axios.create({ baseURL: `${import.meta.env.VITE_API_URL || 'https://movbd-backend.onrender.com'}/api` });
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Watchlist from './pages/Watchlist';
import AdminDashboard from './components/admin/AdminDashboard';
import './components/admin/Admin.css';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading-center" style={{minHeight:'100vh'}}><div className="spinner"/></div>;
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) return <div className="loading-center" style={{minHeight:'100vh'}}><div className="spinner"/></div>;
  if (!user) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/" />;
  return children;
};

const AppLayout = ({ children, showFooter = true }) => (
  <>
    <Navbar />
    {children}
    {showFooter && <Footer />}
  </>
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout><Home /></AppLayout>} />
      <Route path="/movies" element={<AppLayout><Movies /></AppLayout>} />
      <Route path="/movies/:id" element={<AppLayout><MovieDetail /></AppLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/watchlist" element={<ProtectedRoute><AppLayout><Watchlist /></AppLayout></ProtectedRoute>} />
      <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#16161f', color: '#fff', border: '1px solid #2a2a3a' },
            success: { iconTheme: { primary: '#e50914', secondary: '#fff' } }
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
