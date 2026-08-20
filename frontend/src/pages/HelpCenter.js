import React, { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiSearch,
  FiChevronDown,
  FiUser,
  FiPlay,
  FiStar,
  FiDownload,
  FiShield,
  FiMail,
  FiMessageCircle,
  FiArrowRight,
  FiX,
} from "react-icons/fi";
import "./HelpCenter.css";

const CATEGORIES = [
  {
    id: "account",
    label: "Account & Login",
    desc: "Sign up, sign in, and manage your profile",
    icon: FiUser,
    items: [
      {
        q: "How do I create an account?",
        a: "Click Register in the top navigation, fill in your name, email, and password, then submit. You'll be signed in right away and can start browsing movies.",
        popular: true,
      },
      {
        q: "I forgot my password. What do I do?",
        a: "On the Login page, use the \"Forgot password\" link to receive a reset email. Follow the instructions in that email to set a new password.",
        popular: true,
      },
      {
        q: "Can I change my email or profile details later?",
        a: "Yes. Go to your Profile page from the account menu to update your name, email, and other account details at any time.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes, account deletion can be requested from your Profile page, or by messaging support through the Contact page.",
      },
    ],
  },
  {
    id: "watching",
    label: "Watching Movies",
    desc: "Streaming, trailers, and video quality",
    icon: FiPlay,
    items: [
      {
        q: "Do I need an account to watch movies?",
        a: "You can browse and view movie details without an account, but you'll need to log in to stream, save titles to your watchlist, or leave a rating.",
        popular: true,
      },
      {
        q: "Can I watch trailers before deciding?",
        a: "Yes. Every movie page includes a trailer preview so you can check it out before committing to the full watch.",
      },
      {
        q: "What video quality is available?",
        a: "Available quality depends on the title and is shown as a badge, such as HD or 4K, on the movie's poster and detail page.",
      },
      {
        q: "Can I watch on my phone or tablet?",
        a: "Yes, the site is fully responsive and works on any modern mobile browser, no app download required.",
      },
    ],
  },
  {
    id: "watchlist",
    label: "Watchlist & Ratings",
    desc: "Saving titles and leaving reviews",
    icon: FiStar,
    items: [
      {
        q: "How do I add a movie to my watchlist?",
        a: "Click the watchlist icon on any movie card or on the movie detail page. You'll need to be logged in for it to save.",
        popular: true,
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
    label: "Technical Issues",
    desc: "Playback problems and browser support",
    icon: FiDownload,
    items: [
      {
        q: "The video won't play. What should I try first?",
        a: "Refresh the page and check your internet connection. If the problem continues, try a different browser or clear your browser cache.",
        popular: true,
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
    label: "Privacy & Safety",
    desc: "Data handling and reporting issues",
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
        popular: true,
      },
    ],
  },
];

const POPULAR = CATEGORIES.flatMap((cat) =>
  cat.items.filter((i) => i.popular).map((i) => ({ ...i, categoryId: cat.id, categoryLabel: cat.label })),
);

const HelpCenter = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [openKey, setOpenKey] = useState(`${CATEGORIES[0].id}-0`);
  const faqRef = useRef(null);

  const normalizedQuery = query.trim().toLowerCase();
  const isSearching = normalizedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return CATEGORIES.flatMap((cat) =>
      cat.items
        .filter(
          (item) =>
            item.q.toLowerCase().includes(normalizedQuery) ||
            item.a.toLowerCase().includes(normalizedQuery),
        )
        .map((item) => ({ ...item, categoryId: cat.id, categoryLabel: cat.label })),
    );
  }, [normalizedQuery, isSearching]);

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory);

  const scrollToFaq = () => {
    faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCategorySelect = (id) => {
    setQuery("");
    setActiveCategory(id);
    setOpenKey(`${id}-0`);
    scrollToFaq();
  };

  const handlePopularSelect = (item) => {
    setQuery("");
    setActiveCategory(item.categoryId);
    const idx = CATEGORIES.find((c) => c.id === item.categoryId).items.findIndex(
      (i) => i.q === item.q,
    );
    setOpenKey(`${item.categoryId}-${idx}`);
    scrollToFaq();
  };

  return (
    <div className="help-page page-enter">
      {/* Hero + Search */}
      <section className="help-hero">
        <div className="container help-hero-content">
          <span className="badge badge-accent help-eyebrow">Help Center</span>
          <h1 className="help-title">How can we help you?</h1>
          <p className="help-subtitle">
            Search our knowledge base or browse by topic below.
          </p>
          <div className="help-search">
            <FiSearch className="help-search-icon" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for answers, e.g. 'reset password'"
              aria-label="Search help articles"
            />
            {query && (
              <button
                className="help-search-clear"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>
          {!isSearching && (
            <div className="help-popular-chips">
              <span className="help-popular-label">Popular:</span>
              {POPULAR.slice(0, 4).map((item) => (
                <button
                  key={item.q}
                  className="help-chip"
                  onClick={() => handlePopularSelect(item)}
                >
                  {item.q}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category cards */}
      {!isSearching && (
        <section className="help-categories">
          <div className="container">
            <div className="help-cat-grid">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    className={`help-cat-card ${
                      activeCategory === cat.id ? "active" : ""
                    }`}
                    onClick={() => handleCategorySelect(cat.id)}
                  >
                    <div className="help-cat-icon">
                      <Icon />
                    </div>
                    <div className="help-cat-text">
                      <strong>{cat.label}</strong>
                      <span>{cat.desc}</span>
                    </div>
                    <span className="help-cat-count">{cat.items.length}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ / Search results */}
      <section className="help-faq-section" ref={faqRef}>
        <div className="container help-faq-container">
          {isSearching ? (
            <>
              <div className="help-results-header">
                <h2>
                  {searchResults.length
                    ? `${searchResults.length} result${
                        searchResults.length > 1 ? "s" : ""
                      } for "${query}"`
                    : `No results for "${query}"`}
                </h2>
              </div>
              {searchResults.length > 0 ? (
                <div className="help-list">
                  {searchResults.map((item, i) => {
                    const key = `search-${i}`;
                    return (
                      <div key={key} className="help-item-wrap">
                        <span className="help-item-tag">{item.categoryLabel}</span>
                        <FaqItem
                          item={item}
                          isOpen={openKey === key}
                          onToggle={() =>
                            setOpenKey(openKey === key ? null : key)
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="help-empty">
                  <p>Try a different search term, or reach out to our team below.</p>
                  <Link to="/contact" className="btn btn-primary">
                    Contact Support
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="help-faq-header">
                <h2>{currentCategory.label}</h2>
                <p>{currentCategory.desc}</p>
              </div>
              <div className="help-list">
                {currentCategory.items.map((item, i) => {
                  const key = `${activeCategory}-${i}`;
                  return (
                    <FaqItem
                      key={key}
                      item={item}
                      isOpen={openKey === key}
                      onToggle={() => setOpenKey(openKey === key ? null : key)}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Support channels */}
      <section className="help-support">
        <div className="container">
          <div className="help-support-header">
            <h2>Still need help?</h2>
            <p>Our team typically replies within 24 hours.</p>
          </div>
          <div className="help-support-grid">
            <div className="help-support-card">
              <FiMessageCircle className="help-support-icon" />
              <strong>Live Chat</strong>
              <span>Use the chat widget in the bottom corner for quick questions.</span>
            </div>
            <a href="mailto:support@movbd.com" className="help-support-card">
              <FiMail className="help-support-icon" />
              <strong>Email Support</strong>
              <span>support@movbd.com</span>
            </a>
            <Link to="/contact" className="help-support-card">
              <FiArrowRight className="help-support-icon" />
              <strong>Contact Form</strong>
              <span>Send us a detailed message through our contact page.</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const FaqItem = ({ item, isOpen, onToggle }) => (
  <div className={`help-faq-item ${isOpen ? "open" : ""}`}>
    <button className="help-faq-question" onClick={onToggle} aria-expanded={isOpen}>
      <span>{item.q}</span>
      <FiChevronDown className="help-faq-chevron" />
    </button>
    <div className="help-faq-answer-wrap">
      <p className="help-faq-answer">{item.a}</p>
    </div>
  </div>
);

export default HelpCenter;