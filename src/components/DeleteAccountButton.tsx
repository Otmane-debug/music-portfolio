"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DeleteAccountButton() {
  const [confirming, setConfirming] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/account/delete", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }
      const supabase = createClient();
      await supabase.auth.signOut();
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="rounded-full border border-red-400/50 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-red-400 transition hover:border-red-400 hover:bg-red-400 hover:text-background"
      >
        Delete account
      </button>
    );
  }

  return (
    <div className="max-w-sm space-y-3 rounded-lg border border-red-400/30 p-4">
      <p className="text-sm text-foreground-dim">
        This permanently deletes your account, purchase history, and shop
        orders. This can&apos;t be undone. Type{" "}
        <span className="font-mono text-foreground">DELETE</span> to confirm.
      </p>
      <input
        type="text"
        value={confirmText}
        onChange={(e) => setConfirmText(e.target.value)}
        placeholder="DELETE"
        className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-foreground-dim/50 focus:border-red-400 focus:outline-none"
      />
      <div className="flex gap-2">
        <button
          onClick={handleDelete}
          disabled={confirmText !== "DELETE" || loading}
          className="rounded-full border border-red-400 bg-red-400 px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-background transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? "Deleting…" : "Permanently delete"}
        </button>
        <button
          onClick={() => {
            setConfirming(false);
            setConfirmText("");
            setError(null);
          }}
          className="rounded-full border border-border px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:border-accent hover:text-accent"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
