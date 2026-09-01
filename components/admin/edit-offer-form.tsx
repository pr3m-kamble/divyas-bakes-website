"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

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

export default function EditOfferForm({
  offer,
}: {
  offer: Offer;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(offer.title);
  const [description, setDescription] = useState(
    offer.description || ""
  );
  const [buttonText, setButtonText] = useState(
    offer.button_text || "Order on WhatsApp"
  );

  const [active, setActive] = useState(offer.active);

  const [startDate, setStartDate] = useState(
    offer.start_date
      ? new Date(offer.start_date)
          .toISOString()
          .slice(0, 16)
      : ""
  );

  const [endDate, setEndDate] = useState(
    offer.end_date
      ? new Date(offer.end_date)
          .toISOString()
          .slice(0, 16)
      : ""
  );

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState(
    offer.image_url || ""
  );

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
      let imageUrl = offer.image_url;

      // Upload new image if selected
      if (image) {
        const extension =
          image.name.split(".").pop();

        const fileName =
          `${crypto.randomUUID()}.${extension}`;

        const filePath =
          `offers/${fileName}`;

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

      // If activating this offer,
      // deactivate other offers first.
      if (active) {
        const { error: deactivateError } =
          await supabase
            .from("offers")
            .update({ active: false })
            .eq("active", true)
            .neq("id", offer.id);

        if (deactivateError) {
          throw deactivateError;
        }
      }

      // Update offer
      const { error } = await supabase
        .from("offers")
        .update({
          title,
          description,
          image_url: imageUrl,
          button_text: buttonText,
          active,
          start_date: startDate
            ? new Date(startDate).toISOString()
            : null,
          end_date: endDate
            ? new Date(endDate).toISOString()
            : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", offer.id);

      if (error) {
        throw error;
      }

      setMessage(
        "Offer updated successfully!"
      );

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
        maxWidth: 650,
        background: "#121212",
        padding: 25,
        borderRadius: 15,
        border: "1px solid #292929",
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        Edit Offer
      </h2>

      {/* TITLE */}

      <label>Offer Title</label>

      <input
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
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
        style={{
          ...inputStyle,
          minHeight: 100,
          resize: "vertical",
        }}
      />

      {/* BUTTON TEXT */}

      <label>Button Text</label>

      <input
        value={buttonText}
        onChange={(e) =>
          setButtonText(e.target.value)
        }
        style={inputStyle}
      />

      {/* CURRENT / NEW IMAGE */}

      <label>Offer Image</label>

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

      {/* BUTTONS */}

      <div
        style={{
          display: "flex",
          gap: 10,
        }}
      >
        <button
          type="submit"
          disabled={loading}
          style={{
            flex: 1,
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
            ? "Saving..."
            : "Save Changes"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push("/admin/offers")
          }
          style={{
            padding: "14px 20px",
            border: "1px solid #444",
            borderRadius: 8,
            background: "transparent",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
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