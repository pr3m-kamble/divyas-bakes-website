"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        background: "transparent",
        color: "#ff9ab6",
        border: "1px solid #4b2735",
        borderRadius: "8px",
        padding: "10px 16px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}