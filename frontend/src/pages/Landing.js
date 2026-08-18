import React from "react";
import { Link } from "react-router-dom";
import { FiPlay } from "react-icons/fi";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing page-enter">
      <div className="landing-bg">
        <span className="dot dot-1" />
        <span className="dot dot-2" />
        <span className="dot dot-3" />
        <span className="dot dot-4" />
        <span className="dot dot-5" />
      </div>

      <div className="landing-content">
        <div className="landing-logo">
          MOV<span className="accent">BD</span>
        </div>

        <h1 className="landing-title">
          Reviews & Watch Trailers of Movies & Series in Bangladesh
          <br />
          @<span className="accent">MovBD.com</span>
        </h1>

        <p className="landing-subtitle">
          Bangladesh's Largest Movie &amp; Series Collection
        </p>

        <Link to="/home" className="landing-btn">
          <FiPlay /> Visit MovBD.app
        </Link>
      </div>
    </div>
  );
};

export default Landing;