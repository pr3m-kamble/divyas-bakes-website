import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditProductForm from "@/components/admin/edit-product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

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
        href="/admin/products"
        style={{
          color: "#f7a4bc",
          textDecoration: "none",
        }}
      >
        ← Back to Products
      </Link>

      <h1 style={{ marginTop: 30 }}>
        Edit Product
      </h1>

      <p style={{ color: "#aaa" }}>
        Update your product information.
      </p>

      <EditProductForm product={product} />
    </main>
  );
}