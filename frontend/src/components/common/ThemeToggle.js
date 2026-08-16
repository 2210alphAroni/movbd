import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className={`theme-icon ${theme === 'dark' ? 'visible' : ''}`}>
        <FiMoon />
      </span>
      <span className={`theme-icon ${theme === 'light' ? 'visible' : ''}`}>
        <FiSun />
      </span>
    </button>
  );
};

export default ThemeToggle;