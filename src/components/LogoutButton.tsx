"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}
      className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wide transition hover:border-accent hover:text-accent sm:px-4 sm:py-1.5"
    >
      Sign out
    </button>
  );
}
