"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProductForm() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Cakes");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    // Limit image size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image must be smaller than 5MB.");
      return;
    }

    // Allow only common image formats
    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
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
      const slug = name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      let imageUrl = "";

      // -----------------------------
      // Upload image
      // -----------------------------

      if (image) {
        const fileExtension =
          image.name.split(".").pop();

        const fileName = `${crypto.randomUUID()}.${fileExtension}`;

        const filePath = `cakes/${fileName}`;

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

        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      // -----------------------------
      // Create product
      // -----------------------------

      const { error } = await supabase
        .from("products")
        .insert({
          name,
          slug,
          price: Number(price),
          category,
          description,
          image_url: imageUrl || null,
          available: true,
          featured: false,
        });

      if (error) {
        throw error;
      }

      setMessage("Product added successfully!");

      setName("");
      setPrice("");
      setDescription("");
      setCategory("Cakes");
      setImage(null);
      setPreview("");

      router.refresh();
    } catch (error: any) {
      console.error(error);

      setMessage(
        error?.message ||
          "Something went wrong while adding the product."
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
        Add New Product
      </h2>

      {/* NAME */}

      <label>Product Name</label>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Chocolate Truffle Cake"
        required
        style={inputStyle}
      />

      {/* PRICE */}

      <label>Price</label>

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="799"
        min="0"
        required
        style={inputStyle}
      />

      {/* CATEGORY */}

      <label>Category</label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={inputStyle}
      >
        <option value="Cakes">Cakes</option>
        <option value="Cupcakes">Cupcakes</option>
        <option value="Brownies">Brownies</option>
        <option value="Custom Cakes">
          Custom Cakes
        </option>
        <option value="Other">Other</option>
      </select>

      {/* DESCRIPTION */}

      <label>Description</label>

      <textarea
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
        placeholder="Rich chocolate cake with silky ganache."
        style={{
          ...inputStyle,
          minHeight: 110,
          resize: "vertical",
        }}
      />

      {/* IMAGE */}

      <label>Product Image</label>

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

      {/* IMAGE PREVIEW */}

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
            alt="Product preview"
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

      {/* MESSAGE */}

      {message && (
        <p
          style={{
            color: "#f7a4bc",
            fontSize: 14,
          }}
        >
          {message}
        </p>
      )}

      {/* BUTTON */}

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: 14,
          border: 0,
          borderRadius: 8,
          background: "#e95f8c",
          color: "white",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {loading
          ? "Uploading..."
          : "Add Product"}
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