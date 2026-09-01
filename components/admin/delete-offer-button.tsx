"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DeleteOfferButton({
  offerId,
}: {
  offerId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (
      !window.confirm(
        "Are you sure you want to delete this offer?"
      )
    ) {
      return;
    }

    setLoading(true);

    const supabase = createClient();

    const { error } = await supabase
      .from("offers")
      .delete()
      .eq("id", offerId);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{
        border: "1px solid #6b293d",
        background: "transparent",
        color: "#ff8fab",
        padding: "9px 15px",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}