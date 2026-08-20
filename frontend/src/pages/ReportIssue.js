import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiFilm,
  FiAlertTriangle,
  FiCopy,
  FiTool,
  FiHelpCircle,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiChevronRight,
} from "react-icons/fi";
import "./ReportIssue.css";

const ISSUE_TYPES = [
  {
    id: "playback",
    icon: FiFilm,
    title: "Video won't play",
    desc: "Broken link, buffering, or playback error",
  },
  {
    id: "wrong-info",
    icon: FiAlertTriangle,
    title: "Wrong information",
    desc: "Incorrect title, year, cast, or description",
  },
  {
    id: "copyright",
    icon: FiCopy,
    title: "Copyright concern",
    desc: "Content you believe should be removed",
  },
  {
    id: "bug",
    icon: FiTool,
    title: "Site bug",
    desc: "Something on the site isn't working right",
  },
  {
    id: "other",
    icon: FiHelpCircle,
    title: "Something else",
    desc: "Anything not covered above",
  },
];

const SEVERITIES = [
  { id: "low", label: "Low" },
  { id: "medium", label: "Medium" },
  { id: "high", label: "High" },
  { id: "critical", label: "Critical" },
];

const STEPS = ["Issue", "Details", "Contact"];

const ReportIssue = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [refId] = useState(
    () => `RPT-${Math.floor(100000 + Math.random() * 900000)}`,
  );
  const [form, setForm] = useState({
    issueType: "",
    reference: "",
    severity: "medium",
    description: "",
    name: "",
    email: "",
  });

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const canNext = () => {
    if (step === 0) return !!form.issueType;
    if (step === 1) return form.description.trim().length >= 10;
    return true;
  };

  const handleNext = () => {
    if (!canNext()) return;
    if (step === STEPS.length - 1) {
      setSubmitted(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => setStep((s) => Math.max(0, s - 1));

  const selectedType = ISSUE_TYPES.find((t) => t.id === form.issueType);

  if (submitted) {
    return (
      <div className="report-page page-enter">
        <div className="container report-success">
          <div className="report-success-icon">
            <FiCheck />
          </div>
          <h1>Report submitted</h1>
          <p>
            Thanks for letting us know. Our team will review it and follow up
            by email if needed.
          </p>
          <div className="report-success-ref">
            Reference ID <strong>{refId}</strong>
          </div>
          <div className="report-success-actions">
            <Link to="/home" className="btn btn-primary btn-lg">
              Back to Home
            </Link>
            <Link to="/help" className="btn btn-ghost btn-lg">
              Visit Help Center
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-page page-enter">
      <div className="container report-shell">
        {/* Left rail */}
        <aside className="report-rail">
          <span className="badge badge-accent report-eyebrow">
            Report an Issue
          </span>
          <h1 className="report-title">Let's fix this together</h1>
          <p className="report-lede">
            Tell us what happened in a few quick steps. Most reports are
            reviewed within 24 hours.
          </p>

          <ol className="report-steps">
            {STEPS.map((label, i) => (
              <li
                key={label}
                className={`report-step ${i === step ? "current" : ""} ${
                  i < step ? "done" : ""
                }`}
              >
                <span className="report-step-num">
                  {i < step ? <FiCheck /> : i + 1}
                </span>
                <span className="report-step-label">{label}</span>
              </li>
            ))}
          </ol>
        </aside>

        {/* Right panel */}
        <div className="report-panel">
          <span className="report-ghost-num">
            {String(step + 1).padStart(2, "0")}
          </span>

          {step === 0 && (
            <div className="report-step-content">
              <h2>What's the issue?</h2>
              <p className="report-step-desc">
                Pick the option that best matches what you ran into.
              </p>
              <div className="report-type-list">
                {ISSUE_TYPES.map((type) => {
                  const Icon = type.icon;
                  const active = form.issueType === type.id;
                  return (
                    <button
                      key={type.id}
                      className={`report-type-row ${active ? "active" : ""}`}
                      onClick={() => update("issueType", type.id)}
                    >
                      <span className="report-type-icon">
                        <Icon />
                      </span>
                      <span className="report-type-text">
                        <strong>{type.title}</strong>
                        <span>{type.desc}</span>
                      </span>
                      <span className="report-type-radio" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="report-step-content">
              <h2>Tell us more</h2>
              <p className="report-step-desc">
                Reporting: <strong>{selectedType?.title}</strong>
              </p>

              <label className="report-field">
                <span>Movie title or page URL (optional)</span>
                <input
                  type="text"
                  value={form.reference}
                  onChange={(e) => update("reference", e.target.value)}
                  placeholder="e.g. Dark Waters, or /movies/..."
                />
              </label>

              <label className="report-field">
                <span>How urgent is this?</span>
                <div className="report-severity">
                  {SEVERITIES.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`report-severity-chip sev-${s.id} ${
                        form.severity === s.id ? "active" : ""
                      }`}
                      onClick={() => update("severity", s.id)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </label>

              <label className="report-field">
                <span>Description</span>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Describe what happened, what you expected, and any steps to reproduce it."
                />
                <span className="report-field-hint">
                  {form.description.trim().length < 10
                    ? "At least 10 characters"
                    : `${form.description.trim().length} characters`}
                </span>
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="report-step-content">
              <h2>How can we reach you?</h2>
              <p className="report-step-desc">
                We'll only use this to follow up on your report.
              </p>

              <label className="report-field">
                <span>Name (optional)</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Your name"
                />
              </label>

              <label className="report-field">
                <span>Email (optional)</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              <div className="report-summary">
                <div className="report-summary-row">
                  <span>Issue type</span>
                  <strong>{selectedType?.title}</strong>
                </div>
                <div className="report-summary-row">
                  <span>Urgency</span>
                  <strong className={`sev-text sev-${form.severity}`}>
                    {SEVERITIES.find((s) => s.id === form.severity)?.label}
                  </strong>
                </div>
                {form.reference && (
                  <div className="report-summary-row">
                    <span>Reference</span>
                    <strong>{form.reference}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="report-nav">
            {step > 0 ? (
              <button className="btn btn-ghost" onClick={handleBack}>
                <FiArrowLeft /> Back
              </button>
            ) : (
              <span />
            )}
            <button
              className="btn btn-primary"
              disabled={!canNext()}
              onClick={handleNext}
            >
              {step === STEPS.length - 1 ? (
                <>
                  Submit Report <FiChevronRight />
                </>
              ) : (
                <>
                  Continue <FiArrowRight />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;