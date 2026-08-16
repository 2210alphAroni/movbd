import React, { useState, useRef, useEffect } from 'react';
import { FiMessageCircle, FiX, FiSend, FiUser } from 'react-icons/fi';
import movbdQA from '../../data/movbdQA';
import './ChatWidget.css';

const WELCOME_MESSAGE = {
  role: 'agent',
  text: "Hi! I'm the MovBD assistant. Ask me anything about the site — movies, downloads, your account, or anything else.",
};

const FALLBACK_REPLY =
  "I'm not sure about that one yet. Could you rephrase it, or reach out through the Contact page for more specific help?";

// Basic normalizer: lowercase, strip punctuation, collapse whitespace
const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Very small set of common stopwords so they don't dominate scoring
const STOPWORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'do', 'does', 'i', 'to', 'of', 'in', 'on',
  'for', 'and', 'my', 'me', 'how', 'what', 'can', 'ki', 'ta', 'ami', 'ei',
]);

const tokenize = (str) =>
  normalize(str)
    .split(' ')
    .filter((word) => word.length > 1 && !STOPWORDS.has(word));

// Pre-tokenize the dataset once for faster matching
const INDEXED_QA = movbdQA.map((item) => ({
  ...item,
  tokens: new Set([
    ...tokenize(item.q),
    ...(item.keywords || []).flatMap((k) => tokenize(k)),
  ]),
}));

// Score a user message against every QA entry using simple token overlap,
// with a bonus for exact keyword substring matches.
const findBestMatch = (message) => {
  const userTokens = tokenize(message);
  const normalizedMsg = normalize(message);

  if (userTokens.length === 0) return null;

  let best = null;
  let bestScore = 0;

  for (const item of INDEXED_QA) {
    let score = 0;

    // Token overlap
    for (const token of userTokens) {
      if (item.tokens.has(token)) score += 1;
    }

    // Bonus: direct substring match on any keyword phrase
    for (const kw of item.keywords || []) {
      if (normalizedMsg.includes(normalize(kw))) score += 2;
    }

    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  }

  // Require at least a minimal signal before trusting the match
  return bestScore >= 1 ? best : null;
};

// Frontend-only "agent" reply — matches against the local Q&A dataset.
// No backend call needed. Swap this out later for a real API if desired.
const getAgentReply = async (message) => {
  await new Promise((resolve) => setTimeout(resolve, 400)); // small delay feels more natural
  const match = findBestMatch(message);
  return match ? match.a : FALLBACK_REPLY;
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setSending(true);

    try {
      const reply = await getAgentReply(text);
      setMessages((prev) => [...prev, { role: 'agent', text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'agent', text: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-panel">
          <div className="chat-panel-header">
            <div className="chat-header-info">
              <div className="chat-avatar">
                <FiMessageCircle />
              </div>
              <div>
                <strong>MovBD Assistant</strong>
                <span className="chat-status">
                  <span className="status-dot" /> Online
                </span>
              </div>
            </div>
            <button
              className="chat-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <FiX />
            </button>
          </div>

          <div className="chat-panel-body" ref={bodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble-row ${msg.role}`}>
                {msg.role === 'agent' && (
                  <div className="chat-bubble-avatar">
                    <FiMessageCircle />
                  </div>
                )}
                <div className={`chat-bubble ${msg.role}`}>{msg.text}</div>
                {msg.role === 'user' && (
                  <div className="chat-bubble-avatar user">
                    <FiUser />
                  </div>
                )}
              </div>
            ))}
            {sending && (
              <div className="chat-bubble-row agent">
                <div className="chat-bubble-avatar">
                  <FiMessageCircle />
                </div>
                <div className="chat-bubble agent typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <form className="chat-panel-input" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={sending}
            />
            <button type="submit" disabled={sending || !input.trim()} aria-label="Send message">
              <FiSend />
            </button>
          </form>
        </div>
      )}

      <button
        className="chat-toggle-btn"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? <FiX /> : <FiMessageCircle />}
      </button>
    </div>
  );
};

export default ChatWidget;