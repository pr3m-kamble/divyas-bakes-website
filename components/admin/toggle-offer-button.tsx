"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

function ToggleOfferButton({
  offerId,
  active,
}: {
  offerId: string;
  active: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  async function toggleOffer() {
  setLoading(true);

  try {
    // Check current logged-in user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    console.log("CURRENT USER:", user);

    if (userError) {
      console.error("USER ERROR:", userError);
    }

    if (!user) {
      alert("You are not logged in to Supabase.");
      return;
    }

    // Check admin status
    const { data: adminStatus, error: adminError } =
      await supabase.rpc("is_admin");

    console.log("IS ADMIN:", adminStatus);
    console.log("ADMIN ERROR:", adminError);

    if (adminError) {
      throw adminError;
    }

    if (!adminStatus) {
      alert("Your account is not recognized as an admin.");
      return;
    }

    // If activating this offer, deactivate other active offers
    if (!active) {
      const { error: deactivateError } = await supabase
        .from("offers")
        .update({ active: false })
        .eq("active", true);

      if (deactivateError) {
        throw deactivateError;
      }
    }

    // Toggle selected offer
    const { error } = await supabase
      .from("offers")
      .update({
        active: !active,
      })
      .eq("id", offerId);

    if (error) {
      throw error;
    }

    router.refresh();
  } catch (error: any) {
    console.error("TOGGLE ERROR:", error);
    alert(error?.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
}

  return (
    <button
      onClick={toggleOffer}
      disabled={loading}
      style={{
        border: "1px solid #444",
        background: active ? "#183d29" : "#252525",
        color: active ? "#8ee6a8" : "#aaa",
        padding: "9px 15px",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      {loading
        ? "Updating..."
        : active
        ? "● Active"
        : "○ Activate"}
    </button>
  );
}

export default ToggleOfferButton;