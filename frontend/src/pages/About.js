import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiPlay,
  FiUsers,
  FiFilm,
  FiDownload,
  FiStar,
  FiShield,
  FiHeart,
  FiMail,
} from "react-icons/fi";
import "./About.css";

const FEATURES = [
  {
    icon: <FiFilm />,
    title: "Huge Library",
    desc: "Thousands of movies across every genre, updated daily.",
  },
  {
    icon: <FiDownload />,
    title: "Fast Downloads",
    desc: "High speed, reliable download links in multiple qualities.",
  },
  {
    icon: <FiStar />,
    title: "Ratings & Reviews",
    desc: "Real reviews from real users to help you pick your next watch.",
  },
  {
    icon: <FiShield />,
    title: "Safe & Secure",
    desc: "No hidden malware, no annoying redirects — just movies.",
  },
];

const STATS = [
  { label: "Movies", value: "10,000+" },
  { label: "Active Users", value: "50,000+" },
  { label: "Genres", value: "20+" },
  { label: "Daily Visitors", value: "5,000+" },
];

const About = () => {
  const { user } = useAuth();

  return (
    <div className="about page-enter">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-backdrop" />
        <div className="container about-hero-content">
          <span className="badge badge-accent">About Us</span>
          <h1 className="about-hero-title">Your Home For Movies</h1>
          <p className="about-hero-desc">
            MovBD is a place built for movie lovers — a simple, fast, and
            reliable platform to discover, watch, and download the movies
            you care about, all in one place.
          </p>
          <div className="about-hero-actions">
            <Link to="/movies" className="btn btn-primary btn-lg">
              <FiPlay /> Browse Movies
            </Link>
            <Link to="/contact" className="btn btn-ghost btn-lg">
              <FiMail /> Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container story-grid">
          <div className="story-text">
            <h2 className="section-title">
              <FiHeart /> Our Story
            </h2>
            <p>
              MovBD started with a simple idea: movie discovery shouldn't be
              complicated. We were tired of cluttered sites, broken links,
              and endless ads getting in the way of a good film.
            </p>
            <p>
              So we built a platform that puts the movies first — clean
              design, accurate information, and a community of users who
              genuinely love cinema. Today, MovBD is home to thousands of
              titles and a growing community of film fans.
            </p>
          </div>
          <div className="story-stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="story-stat-item">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title center">What We Offer</h2>
          <div className="features-grid">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="feature-card"
                style={{ "--delay": `${i * 0.05}s` }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Community Banner */}
      {!user && (
        <section className="community-banner">
          <div className="container community-content">
            <FiUsers className="community-icon" />
            <h2>Join Our Community</h2>
            <p>
              Create an account to build your watchlist, rate movies, and get
              personalized recommendations tailored to your taste.
            </p>
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default About;