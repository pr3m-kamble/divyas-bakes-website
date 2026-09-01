import Link from "next/link";
import ProductForm from "@/components/admin/product-form";
import { createClient } from "@/lib/supabase/server";
import DeleteProductButton from "@/components/admin/delete-product-button";

export default async function AdminProducts() {
  const supabase = await createClient();

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 6%",
        background: "#080808",
        color: "white",
      }}
    >
      <Link
        href="/admin"
        style={{
          color: "#f7a4bc",
          textDecoration: "none",
        }}
      >
        ← Dashboard
      </Link>

      <div style={{ marginTop: 30 }}>
        <h1 style={{ fontSize: 42 }}>
          Products
        </h1>

        <p style={{ color: "#aaa" }}>
          Add and manage your bakery products.
        </p>
      </div>

      {error && (
        <p style={{ color: "#ff8fab" }}>
          Error loading products: {error.message}
        </p>
      )}

      <ProductForm />

      <section style={{ marginTop: 50 }}>
        <h2>All Products</h2>

        {products?.length === 0 && (
          <p style={{ color: "#999" }}>
            No products added yet.
          </p>
        )}

        <div
          style={{
            display: "grid",
            gap: 15,
            marginTop: 20,
          }}
        >
          {products?.map((product) => (
            <div
              key={product.id}
              style={{
                padding: 20,
                border: "1px solid #292929",
                borderRadius: 14,
                background: "#111",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>
                  {product.name}
                </h3>

                <p
                  style={{
                    color: "#aaa",
                    margin: "8px 0",
                  }}
                >
                  {product.category}
                </p>

                <strong style={{ color: "#f7a4bc" }}>
                  ₹{product.price}
                </strong>

                <span
                  style={{
                    marginLeft: 15,
                    fontSize: 13,
                    color: product.available
                      ? "#8ee6a8"
                      : "#ff8b8b",
                  }}
                >
                  {product.available
                    ? "Available"
                    : "Unavailable"}
                </span>
              </div>

              <div
  style={{
    display: "flex",
    gap: 10,
  }}
>
  <Link
    href={`/admin/products/edit/${product.id}`}
    style={{
      border: "1px solid #f7a4bc",
      background: "transparent",
      color: "#f7a4bc",
      padding: "9px 15px",
      borderRadius: 8,
      textDecoration: "none",
    }}
  >
    Edit
  </Link>

  <DeleteProductButton
    productId={product.id}
  />
</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}