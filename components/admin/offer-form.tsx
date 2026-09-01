// 
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function OfferForm() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState(
    "Order on WhatsApp"
  );

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [active, setActive] = useState(false);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must be smaller than 5MB.");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setMessage("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      let imageUrl = "";

      // -----------------------------
      // Upload offer image
      // -----------------------------

      if (image) {
        const extension =
          image.name.split(".").pop();

        const fileName = `${crypto.randomUUID()}.${extension}`;

        const filePath = `offers/${fileName}`;

        const { error: uploadError } =
          await supabase.storage
            .from("product-images")
            .upload(filePath, image, {
              cacheControl: "3600",
              upsert: false,
            });

        if (uploadError) {
          throw uploadError;
        }

        const { data } =
          supabase.storage
            .from("product-images")
            .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      // -----------------------------
      // Create offer
      // -----------------------------

      const { error } = await supabase
        .from("offers")
        .insert({
          title,
          description,
          image_url: imageUrl || null,
          button_text: buttonText,
          active,
          start_date: startDate
            ? new Date(startDate).toISOString()
            : null,
          end_date: endDate
            ? new Date(endDate).toISOString()
            : null,
        });

      if (error) {
        throw error;
      }

      setMessage(
        "Offer created successfully!"
      );

      // Reset form

      setTitle("");
      setDescription("");
      setButtonText("Order on WhatsApp");
      setStartDate("");
      setEndDate("");
      setActive(false);
      setImage(null);
      setPreview("");

      router.refresh();
    } catch (error: any) {
      console.error(error);

      setMessage(
        error?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 600,
        background: "#121212",
        padding: 25,
        borderRadius: 15,
        border: "1px solid #292929",
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        Create New Offer
      </h2>

      {/* TITLE */}

      <label>Offer Title</label>

      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
        placeholder="Diwali Special 🎉"
        required
        style={inputStyle}
      />

      {/* DESCRIPTION */}

      <label>Description</label>

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="20% OFF on selected cakes"
        style={{
          ...inputStyle,
          minHeight: 100,
          resize: "vertical",
        }}
      />

      {/* BUTTON */}

      <label>Button Text</label>

      <input
        value={buttonText}
        onChange={(e) =>
          setButtonText(e.target.value)
        }
        placeholder="Order on WhatsApp"
        style={inputStyle}
      />

      {/* IMAGE */}

      <label>Festival / Offer Image</label>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{
          marginTop: 8,
          marginBottom: 15,
          color: "#ddd",
        }}
      />

      {/* PREVIEW */}

      {preview && (
        <div style={{ marginBottom: 20 }}>
          <p
            style={{
              color: "#aaa",
              fontSize: 13,
            }}
          >
            Image Preview
          </p>

          <img
            src={preview}
            alt="Offer preview"
            style={{
              width: "100%",
              maxHeight: 300,
              objectFit: "cover",
              borderRadius: 12,
              border: "1px solid #333",
            }}
          />
        </div>
      )}

      {/* START DATE */}

      <label>Start Date</label>

      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) =>
          setStartDate(e.target.value)
        }
        style={inputStyle}
      />

      {/* END DATE */}

      <label>End Date</label>

      <input
        type="datetime-local"
        value={endDate}
        onChange={(e) =>
          setEndDate(e.target.value)
        }
        style={inputStyle}
      />

      {/* ACTIVE */}

      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 20,
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={active}
          onChange={(e) =>
            setActive(e.target.checked)
          }
        />

        Show this offer on the website
      </label>

      {/* MESSAGE */}

      {message && (
        <p style={{ color: "#f7a4bc" }}>
          {message}
        </p>
      )}

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: 14,
          border: 0,
          borderRadius: 8,
          background: "#e95f8c",
          color: "#fff",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {loading
          ? "Uploading..."
          : "Create Offer"}
      </button>
    </form>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  margin: "8px 0 18px",
  padding: 12,
  borderRadius: 8,
  border: "1px solid #333",
  background: "#080808",
  color: "#fff",
};