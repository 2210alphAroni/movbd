import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import toast from 'react-hot-toast';
import { FiCamera, FiUser, FiMail, FiLock, FiSave, FiEye, FiEyeOff } from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '', confirmPassword: '' });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileRef = useRef();

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      toast.error('Passwords do not match'); return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      if (form.name !== user.name) formData.append('name', form.name);
      if (form.email !== user.email) formData.append('email', form.email);
      if (form.password) formData.append('password', form.password);
      if (avatarFile) formData.append('avatar', avatarFile);

      const res = await authAPI.updateProfile(formData);
      const updated = { ...user, ...res.data };
      setUser(updated);
      localStorage.setItem('movbd_user', JSON.stringify(updated));
      toast.success('Profile updated!');
      setForm(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const initials = user?.name?.charAt(0).toUpperCase();

  return (
    <div className="profile-page page-enter">
      <div className="container">
        <div className="profile-card">
          <h2 className="profile-title">My Profile</h2>

          <form onSubmit={handleSubmit}>
            {/* Avatar */}
            <div className="avatar-section">
              <div className="avatar-wrap" onClick={() => fileRef.current.click()}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="avatar-img" />
                ) : (
                  <div className="avatar-placeholder">{initials}</div>
                )}
                <div className="avatar-overlay"><FiCamera /></div>
              </div>
              <p className="avatar-hint">Click to change photo</p>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} hidden />
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label"><FiUser /> Name</label>
              <input
                name="name" value={form.name} onChange={handleChange}
                className="form-control" placeholder="Your name" required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label"><FiMail /> Email</label>
              <input
                name="email" value={form.email} onChange={handleChange}
                className="form-control" type="email" placeholder="Your email" required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label"><FiLock /> New Password</label>
              <div className="password-input-wrap">
                <input
                  name="password" value={form.password} onChange={handleChange}
                  className="form-control" type={showPassword ? 'text' : 'password'}
                  placeholder="Leave blank to keep current"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label"><FiLock /> Confirm Password</label>
              <div className="password-input-wrap">
                <input
                  name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                  className="form-control" type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Repeat new password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-lg profile-save-btn">
              <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;