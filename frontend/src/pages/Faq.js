import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronDown,
  FiHelpCircle,
  FiUser,
  FiPlay,
  FiStar,
  FiDownload,
  FiShield,
  FiMessageCircle,
} from "react-icons/fi";
import "./Faq.css";

const FAQ_CATEGORIES = [
  {
    id: "account",
    label: "Account & Login",
    icon: FiUser,
    items: [
      {
        q: "How do I create an account?",
        a: "Click the Register button in the top navigation, fill in your name, email, and password, then submit. You'll be signed in right away and can start browsing movies.",
      },
      {
        q: "I forgot my password. What do I do?",
        a: "On the Login page, use the \"Forgot password\" link to receive a reset email. Follow the instructions in that email to set a new password.",
      },
      {
        q: "Can I change my email or profile details later?",
        a: "Yes. Go to your Profile page from the account menu to update your name, email, and other account details at any time.",
      },
    ],
  },
  {
    id: "watching",
    label: "Watching Movies",
    icon: FiPlay,
    items: [
      {
        q: "Do I need an account to watch movies?",
        a: "You can browse and view movie details without an account, but you'll need to log in to stream, save titles to your watchlist, or leave a rating.",
      },
      {
        q: "Can I watch trailers before deciding?",
        a: "Yes. Every movie page includes a trailer preview so you can check it out before committing to the full watch.",
      },
      {
        q: "What video quality is available?",
        a: "Available quality depends on the title and is shown as a badge (such as HD or 4K) on the movie's poster and detail page.",
      },
    ],
  },
  {
    id: "watchlist",
    label: "Watchlist & Ratings",
    icon: FiStar,
    items: [
      {
        q: "How do I add a movie to my watchlist?",
        a: "Click the watchlist icon on any movie card or on the movie detail page. You'll need to be logged in for it to save.",
      },
      {
        q: "Where can I see my saved movies?",
        a: "Open the Watchlist page from the navigation menu to see every title you've saved, and remove any you no longer want there.",
      },
      {
        q: "Can I rate and review a movie?",
        a: "Yes. On any movie detail page you can leave a star rating and a written review to help other users decide what to watch.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical & Downloads",
    icon: FiDownload,
    items: [
      {
        q: "The video won't play. What should I try first?",
        a: "Refresh the page and check your internet connection. If the problem continues, try a different browser or clear your browser cache.",
      },
      {
        q: "Can I download movies to watch offline?",
        a: "Downloading is being worked on as a future feature. For now, movies are available to stream directly on the site.",
      },
      {
        q: "Which browsers and devices are supported?",
        a: "The site works on current versions of Chrome, Firefox, Edge, and Safari, on both desktop and mobile devices.",
      },
    ],
  },
  {
    id: "privacy",
    label: "Privacy & Support",
    icon: FiShield,
    items: [
      {
        q: "Is my personal information safe?",
        a: "Your account is protected with secure login and your details are never shared publicly. See our policies for more on how your data is handled.",
      },
      {
        q: "How do I report an issue with a movie listing?",
        a: "Use the Contact page to send us a message with the movie title and a description of the issue, and our team will look into it.",
      },
      {
        q: "How can I reach support directly?",
        a: "You can reach out any time through the Contact page, or use the chat widget in the bottom corner of the site for quick questions.",
      },
    ],
  },
];

const FaqItem = ({ item, isOpen, onToggle }) => (
  <div className={`faq-item ${isOpen ? "open" : ""}`}>
    <button className="faq-question" onClick={onToggle} aria-expanded={isOpen}>
      <span>{item.q}</span>
      <FiChevronDown className="faq-chevron" />
    </button>
    <div className="faq-answer-wrap">
      <p className="faq-answer">{item.a}</p>
    </div>
  </div>
);

const Faq = () => {
  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].id);
  const [openIndex, setOpenIndex] = useState(0);

  const currentCategory = FAQ_CATEGORIES.find((c) => c.id === activeCategory);

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setOpenIndex(0);
  };

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="faq-page page-enter">
      {/* Header */}
      <section className="faq-hero">
        <div className="container faq-hero-content">
          <span className="badge badge-accent faq-badge">
            <FiHelpCircle /> Help Center
          </span>
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">
            Answers to common questions about accounts, streaming, and your
            watchlist. Can't find what you need? Reach out on our{" "}
            <Link to="/contact">Contact page</Link>.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="faq-section">
        <div className="container faq-layout">
          {/* Category nav */}
          <aside className="faq-nav">
            {FAQ_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  className={`faq-nav-item ${
                    activeCategory === cat.id ? "active" : ""
                  }`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <Icon />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Questions */}
          <div className="faq-list">
            <h2 className="faq-list-title">{currentCategory.label}</h2>
            {currentCategory.items.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="faq-cta">
        <div className="container faq-cta-content">
          <FiMessageCircle className="faq-cta-icon" />
          <div>
            <h3>Still have questions?</h3>
            <p>Our team is happy to help with anything not covered here.</p>
          </div>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Faq;