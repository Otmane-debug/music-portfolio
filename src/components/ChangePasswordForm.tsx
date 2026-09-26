"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setStatus("error");
      setErrorMessage("Passwords don't match.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
    } else {
      setStatus("done");
      setPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-3">
      <input
        type="password"
        required
        minLength={6}
        placeholder="New password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setStatus("idle");
        }}
        className="rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-foreground-dim focus:border-accent focus:outline-none"
      />
      <input
        type="password"
        required
        minLength={6}
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          setStatus("idle");
        }}
        className="rounded-lg border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-foreground-dim focus:border-accent focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded-full border border-border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition hover:border-accent hover:text-accent disabled:opacity-50"
      >
        {status === "loading" ? "Updating…" : "Update password"}
      </button>
      {status === "done" && (
        <p className="text-xs text-accent">Password updated.</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400">{errorMessage}</p>
      )}
    </form>
  );
}
