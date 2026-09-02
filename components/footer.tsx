"use client";

export default function Footer() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  const developerWhatsApp = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hi Prem! I found your developer contact through the Divya's Bakes website."
      )}`
    : "#";

  return (
    <footer className="site-footer" id="contact">
      {/* Main Footer */}
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <a href="/" className="footer-logo">
            <span className="footer-logo-mark">♨</span>
            <span className="logo-script">Divya’s Bakes</span>
          </a>

          <p>
            Freshly baked with love, made to make
            your special moments sweeter. ♡
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <a href="#home">Home</a>
          <a href="#cakes">Our Cakes</a>
          <a href="#about">About Us</a>
          <a href="#gallery">Gallery</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Get in Touch</h3>

          <a href="#contact"> Surat, India</a>

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Us
            </a>
          )}

          <p className="footer-note">
            Have a custom cake in mind?
            <br />
            Let’s make it happen! 
          </p>
        </div>
      </div>

      {/* Developer Section */}
      <div className="developer-section">
        <div className="developer-line" />

        <div className="developer-content">
          <span className="developer-label">
            Website crafted with
          </span>

          <span className="developer-heart">♥</span>

          <span className="developer-label">
            by
          </span>

          <a
            href={developerWhatsApp}
            target="_blank"
            rel="noreferrer"
            className="developer-name"
          >
            Prem
          </a>

          <span className="developer-role">
            Developer & Designer
          </span>
        </div>

        <div className="developer-links">
          <a
            href="https://github.com/pr3m-kamble"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <span>·</span>

          <a
            href="https://www.linkedin.com/in/prem-kamble/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

    

          
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Divya’s Bakes.
          All rights reserved.
        </p>

        <p>
          Made with ❤️
        </p>
      </div>
    </footer>
  );
}