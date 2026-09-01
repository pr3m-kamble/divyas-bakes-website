"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { WhatsAppButton } from "./whatsapp-button";

type Offer = {
  title: string;
  description: string | null;
  button_text: string | null;
  active: boolean;
};

export default function Navbar() {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [bannerOpen, setBannerOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchOffer() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("offers")
        .select("title, description, button_text, active")
        .eq("active", true)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Error fetching offer:", error);
        return;
      }

      setOffer(data);
    }

    fetchOffer();
  }, []);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header>

      {/* OFFER BANNER */}

      {offer && bannerOpen && (
        <div className="top-banner">
          <span>
            🎁 <strong>{offer.title}</strong>{" "}
            {offer.description}
          </span>

          <a
            className="top-banner button"
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              `Hi! I want to know about the ${offer.title} offer.`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            {offer.button_text || "Order Now →"}
          </a>

          <button
            className="banner-close"
            aria-label="Close offer"
            onClick={() => setBannerOpen(false)}
          >
            ×
          </button>
        </div>
      )}

      {/* NAVBAR */}

      <nav className="nav">

        {/* LOGO */}

        <a
          href="/"
          className="logo"
          onClick={closeMenu}
        >
          <span className="logo-mark">♨</span>

          <span>
            <span className="logo-script">
              Divya’s Bakes
            </span>
          </span>
        </a>


        {/* DESKTOP MENU */}

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#cakes">Cakes</a>
          <a href="#about">About Us</a>
          <a href="#gallery">Gallery</a>
          <a href="#reviews">Reviews</a>
          <a href="#contact">Contact</a>
        </div>


        {/* DESKTOP WHATSAPP */}

        <div className="desktop-whatsapp">
          <WhatsAppButton />
        </div>


        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "×" : "☰"}
        </button>


        {/* MOBILE MENU */}

        <div
          className={`mobile-menu ${
            menuOpen ? "mobile-menu-open" : ""
          }`}
        >

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

          <div className="mobile-whatsapp">
            <WhatsAppButton>
              💬 Order on WhatsApp
            </WhatsAppButton>
          </div>

        </div>

      </nav>
    </header>
  );
}