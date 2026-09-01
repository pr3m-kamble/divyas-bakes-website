
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
export const dynamic = "force-dynamic";

type Offer = {
  id: string;
  title: string;
  description: string | null;
  button_text: string | null;
  image_url: string | null;
  start_date: string | null;
  end_date: string | null;
  active: boolean;
};

export default function AdminOffers() {
  const supabase = createClient();

  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("Order on WhatsApp");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // --------------------------------------------------
  // LOAD OFFERS
  // --------------------------------------------------

  async function loadOffers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("offers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading offers:", error);
      alert(error.message);
    } else {
      setOffers(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadOffers();
  }, []);

  // --------------------------------------------------
  // CREATE OFFER
  // --------------------------------------------------

  async function createOffer(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter an offer title.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter an offer description.");
      return;
    }

    setSaving(true);

    try {
      let imageUrl: string | null = null;

      // Upload image if selected
      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `offers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, image);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      // If creating active offer,
      // // deactivate all existing offers first.
      // if (active) {
      //   const { error: deactivateError } = await supabase
      //     .from("offers")
      //     .update({ active: false })
      //     .eq("active", true);

      //   if (deactivateError) {
      //     throw deactivateError;
      //   }
      // }

      const { error } = await supabase.from("offers").insert({
  title: title.trim(),
  description: description.trim(),
  button_text: buttonText.trim() || "Order on WhatsApp",
  image_url: imageUrl,
  start_date: startDate || null,
  end_date: endDate || null,
});

      if (error) {
        throw error;
      }

      alert("Offer created successfully! 🎉");

      // Reset form
      setTitle("");
      setDescription("");
      setButtonText("Order on WhatsApp");
      setStartDate("");
      setEndDate("");
      // setActive(false);
      setImage(null);

      const fileInput = document.getElementById(
        "offer-image"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      await loadOffers();
    } catch (error: any) {
      console.error("Create offer error:", error);
      alert(error?.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  // --------------------------------------------------
  // TOGGLE ACTIVE
  // --------------------------------------------------

  async function toggleOffer(offer: Offer) {
    const newActiveState = !offer.active;

    try {
      // If activating this offer,
      // deactivate all other offers first.
      if (newActiveState) {
        const { error: deactivateError } = await supabase
          .from("offers")
          .update({ active: false })
          .eq("active", true);

        if (deactivateError) {
          throw deactivateError;
        }
      }

      const { error } = await supabase
        .from("offers")
        .update({
          active: newActiveState,
        })
        .eq("id", offer.id);

      if (error) {
        throw error;
      }

      await loadOffers();
    } catch (error: any) {
      console.error("Toggle offer error:", error);
      alert(error?.message || "Could not update offer.");
    }
  }

  // --------------------------------------------------
  // DELETE OFFER
  // --------------------------------------------------

  async function deleteOffer(offer: Offer) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${offer.title}"?`
    );

    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from("offers")
        .delete()
        .eq("id", offer.id);

      if (error) {
        throw error;
      }

      await loadOffers();
    } catch (error: any) {
      console.error("Delete offer error:", error);
      alert(error?.message || "Could not delete offer.");
    }
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080808",
        color: "#fff",
        padding: "40px 6%",
      }}
    >
      {/* BACK */}
      <Link
        href="/admin"
        style={{
          color: "#f7a4bc",
          textDecoration: "none",
          fontSize: 18,
          fontWeight: 600,
        }}
      >
        ← Dashboard
      </Link>

      {/* HEADER */}
      <div style={{ marginTop: 35, marginBottom: 35 }}>
        <h1
          style={{
            fontSize: 48,
            marginBottom: 10,
          }}
        >
          Offers
        </h1>

        <p
          style={{
            color: "#aaa",
            fontSize: 18,
          }}
        >
          Create and manage festival offers and homepage banners.
        </p>
      </div>

      {/* CREATE OFFER */}
      <section
        style={{
          maxWidth: 850,
          background: "#111",
          border: "1px solid #333",
          borderRadius: 20,
          padding: 35,
        }}
      >
        <h2 style={{ fontSize: 30, marginBottom: 25 }}>
          Add New Offer
        </h2>

        <form onSubmit={createOffer}>
          {/* TITLE */}
          <label style={labelStyle}>
            Offer Title
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Diwali Special 🎉"
            style={inputStyle}
          />

          {/* DESCRIPTION */}
          <label style={labelStyle}>
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Get 15% OFF on all customized cakes."
            rows={4}
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />

          {/* BUTTON */}
          <label style={labelStyle}>
            Button Text
          </label>

          <input
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            placeholder="Order on WhatsApp"
            style={inputStyle}
          />

          {/* IMAGE */}
          <label style={labelStyle}>
            Festival / Offer Image
          </label>

          <input
            id="offer-image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files?.[0] || null);
            }}
            style={{
              width: "100%",
              marginBottom: 25,
            }}
          />


          {/* ACTIVE */}
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 25,
              marginBottom: 25,
              cursor: "pointer",
              color: "#ccc",
            }}
          >
           
          </label>

          {/* CREATE */}
          <button
            type="submit"
            disabled={saving}
            style={{
              width: "100%",
              border: "none",
              borderRadius: 10,
              padding: "16px",
              background: "#ec5d8c",
              color: "#fff",
              fontSize: 18,
              fontWeight: 700,
              cursor: saving ? "not-allowed" : "pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Creating..." : "Create Offer"}
          </button>
        </form>
      </section>

      {/* ALL OFFERS */}
      <section style={{ marginTop: 50 }}>
        <h2 style={{ fontSize: 30, marginBottom: 25 }}>
          All Offers
        </h2>

        {loading ? (
          <p style={{ color: "#aaa" }}>
            Loading offers...
          </p>
        ) : offers.length === 0 ? (
          <p style={{ color: "#aaa" }}>
            No offers created yet.
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {offers.map((offer) => (
              <article
                key={offer.id}
                style={{
                  background: "#111",
                  border: "1px solid #292929",
                  borderRadius: 16,
                  padding: 20,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                {/* INFO */}
                <div>
                  <h3
                    style={{
                      margin: 0,
                      marginBottom: 8,
                      fontSize: 20,
                    }}
                  >
                    {offer.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      color: "#aaa",
                    }}
                  >
                    {offer.description}
                  </p>

                  <div
                    style={{
                      marginTop: 10,
                      color: offer.active
                        ? "#6ee7a0"
                        : "#777",
                      fontWeight: 600,
                    }}
                  >
                    {offer.active
                      ? "● Active"
                      : "○ Inactive"}
                  </div>
                </div>

                {/* ACTIONS */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexShrink: 0,
                  }}
                >
                  {/* <button
                    onClick={() => toggleOffer(offer)}
                    style={{
                      border: "1px solid #333",
                      background: offer.active
                        ? "#12351f"
                        : "#181818",
                      color: offer.active
                        ? "#6ee7a0"
                        : "#fff",
                      padding: "10px 15px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {offer.active
                      ? "Deactivate"
                      : "Activate"}
                  </button> */}

                  <button
                    onClick={() => deleteOffer(offer)}
                    style={{
                      border: "1px solid #662633",
                      background: "#180d10",
                      color: "#f47d9b",
                      padding: "10px 15px",
                      borderRadius: 8,
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

// --------------------------------------------------
// STYLES
// --------------------------------------------------

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 17,
  fontWeight: 600,
  marginBottom: 8,
  color: "#eee",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  background: "#080808",
  border: "1px solid #333",
  borderRadius: 10,
  padding: "14px",
  color: "#fff",
  fontSize: 16,
  marginBottom: 20,
};