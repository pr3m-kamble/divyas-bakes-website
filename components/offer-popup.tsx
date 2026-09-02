"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Offer = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  button_text: string | null;
  active: boolean;
  start_date: string | null;
  end_date: string | null;
};

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState<Offer | null>(null);

  useEffect(() => {
    async function loadOffer() {
      // Don't show popup again during this browser session
      const seen = sessionStorage.getItem(
        "sweet-cravings-offer-seen"
      );

      if (seen) return;

      const supabase = createClient();

      const { data, error } = await supabase
        .from("offers")
        .select("*")
        .eq("active", true)
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error("Offer loading error:", error);
        return;
      }

      if (!data) return;

      // Check offer start date
      if (data.start_date) {
        const start = new Date(data.start_date);

        if (new Date() < start) {
          return;
        }
      }

      // Check offer end date
      if (data.end_date) {
        const end = new Date(data.end_date);

        if (new Date() > end) {
          return;
        }
      }

      setOffer(data);

      // Small delay before opening
      const timer = window.setTimeout(() => {
        setOpen(true);
      }, 700);

      return () => {
        window.clearTimeout(timer);
      };
    }

    loadOffer();
  }, []);

  function close() {
    sessionStorage.setItem(
      "sweet-cravings-offer-seen",
      "1"
    );

    setOpen(false);
  }

  if (!open || !offer) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={close}
    >
      <div
        className="offer-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close"
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>

        {/* OFFER IMAGE */}

        <img
          src={
            offer.image_url ||
            "/images/hero-cake.jpg"
          }
          alt={offer.title}
        />

        <div className="offer-content">

          <div className="modal-small">
            🎉 FESTIVAL SPECIAL
          </div>

          {/* TITLE */}

          <h2>{offer.title}</h2>

          {/* DESCRIPTION */}

          {offer.description && (
            <p>{offer.description}</p>
          )}

          {/* WHATSAPP */}

          <a
  className="wa-btn"
  href="#cakes"
  onClick={close}
>
  {offer.button_text || "View Cakes →"}
</a>

        </div>
      </div>
    </div>
  );
}