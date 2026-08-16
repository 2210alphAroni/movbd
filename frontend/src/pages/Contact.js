import React, { useState } from "react";
import { FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";
import "./Contact.css";

const CONTACT_INFO = [
  {
    icon: <FiMail />,
    title: "Email Us",
    desc: "support@movbd.com",
  },
  {
    icon: <FiMapPin />,
    title: "Location",
    desc: "Dhaka, Bangladesh",
  },
];

const initialForm = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      // TODO: wire this up to a real API endpoint, e.g.
      // await contactAPI.send(form);
      await new Promise((resolve) => setTimeout(resolve, 800));
      toast.success("Message sent! We'll get back to you soon.");
      setForm(initialForm);
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact page-enter">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-backdrop" />
        <div className="container contact-hero-content">
          <span className="badge badge-accent">Contact Us</span>
          <h1 className="contact-hero-title">Get In Touch</h1>
          <p className="contact-hero-desc">
            Have a question, suggestion, or found a broken link? We'd love
            to hear from you — our team usually replies within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="contact-info-section">
        <div className="container contact-info-grid">
          {CONTACT_INFO.map((item, i) => (
            <div
              key={item.title}
              className="contact-info-card"
              style={{ "--delay": `${i * 0.05}s` }}
            >
              <div className="contact-info-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section className="contact-form-section">
        <div className="container contact-form-grid">
          <div className="contact-form-intro">
            <h2 className="section-title">Send A Message</h2>
            <p>
              Fill out the form and our support team will get back to you
              as soon as possible. Whether it's a bug report, a movie
              request, or feedback — we're listening.
            </p>
            <div className="contact-socials">
              <a
                href="https://www.facebook.com/ronystorys"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://wa.me/8801608203690"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={submitting}
            >
              <FiSend /> {submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-section">
        <div className="container">
          <h2 className="section-title center">Find Us</h2>
          <div className="contact-map-wrapper">
            <iframe
              title="MovBD Location - Dhaka, Bangladesh"
              src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;