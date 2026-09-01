"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string | null;
  description: string | null;
  available: boolean;
  featured: boolean;
};

export default function EditProductForm({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(String(product.price));
  const [category, setCategory] = useState(
    product.category || "Cakes"
  );
  const [description, setDescription] = useState(
    product.description || ""
  );

  const [available, setAvailable] = useState(
    product.available
  );

  const [featured, setFeatured] = useState(
    product.featured
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleUpdate(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("products")
      .update({
        name,
        price: Number(price),
        category,
        description,
        available,
        featured,
      })
      .eq("id", product.id);

    if (error) {
      console.error(error);
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Product updated successfully!");

    setLoading(false);

    router.refresh();
  }

  return (
    <form
      onSubmit={handleUpdate}
      style={{
        maxWidth: 600,
        marginTop: 30,
        background: "#121212",
        padding: 25,
        borderRadius: 15,
        border: "1px solid #292929",
      }}
    >
      <label>Product Name</label>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={inputStyle}
      />

      <label>Price</label>

      <input
        type="number"
        min="0"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        style={inputStyle}
      />

      <label>Category</label>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={inputStyle}
      >
        <option value="Cakes">Cakes</option>
        <option value="Cupcakes">Cupcakes</option>
        <option value="Brownies">Brownies</option>
        <option value="Custom Cakes">Custom Cakes</option>
        <option value="Other">Other</option>
      </select>

      <label>Description</label>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{
          ...inputStyle,
          minHeight: 120,
          resize: "vertical",
        }}
      />

      <div style={{ margin: "20px 0" }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={available}
            onChange={(e) =>
              setAvailable(e.target.checked)
            }
          />

          Product is Available
        </label>
      </div>

      <div style={{ marginBottom: 20 }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) =>
              setFeatured(e.target.checked)
            }
          />

          ⭐ Featured Product
        </label>
      </div>

      {message && (
        <p style={{ color: "#f7a4bc" }}>
          {message}
        </p>
      )}

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
        {loading ? "Saving..." : "Save Changes"}
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