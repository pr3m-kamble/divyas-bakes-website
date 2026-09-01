"use client";

import { useState } from "react";
import { WhatsAppButton } from "./whatsapp-button";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <>
      {/* Hamburger */}
      <button
        type="button"
        className="mobile-menu-button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
      >
        {open ? "×" : "☰"}
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${open ? "mobile-menu-open" : ""}`}>
        <a href="#home" onClick={closeMenu}>
          Home
        </a>

        <a href="#cakes" onClick={closeMenu}>
          Cakes
        </a>

        <a href="#about" onClick={closeMenu}>
          About Us
        </a>

        <a href="#gallery" onClick={closeMenu}>
          Gallery
        </a>

        <a href="#reviews" onClick={closeMenu}>
          Reviews
        </a>

        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>

        <div onClick={closeMenu}>
          <WhatsAppButton>
            💬 Order on WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </>
  );
}