"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  return (
    <div className="mx-auto max-w-sm py-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Member access
      </p>
      <h1 className="mb-2 font-display text-2xl font-bold">Sign in</h1>
      <p className="mb-6 text-sm text-foreground-dim">
        Get a magic link by email, no password needed.
      </p>

      {status === "sent" ? (
        <div className="space-y-2 text-sm">
          <p>Check your inbox ({email}) and click the link you received.</p>
          <p className="text-foreground-dim">
            If you don&apos;t see it within a few minutes, check your spam /
            junk folder.
          </p>
        </div>
      ) : (
        <form
          className="flex flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setStatus("sending");
            const supabase = createClient();
            const { error } = await supabase.auth.signInWithOtp({
              email,
              options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
                data: {
                  first_name: firstName,
                  last_name: lastName,
                },
              },
            });
            setStatus(error ? "error" : "sent");
          }}
        >
          <div className="flex gap-3">
            <input
              type="text"
              required
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 rounded-lg border border-border bg-transparent px-3 py-2 text-foreground placeholder:text-foreground-dim focus:border-accent focus:outline-none"
            />
            <input
              type="text"
              required
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 rounded-lg border border-border bg-transparent px-3 py-2 text-foreground placeholder:text-foreground-dim focus:border-accent focus:outline-none"
            />
          </div>
          <input
            type="email"
            required
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-border bg-transparent px-3 py-2 text-foreground placeholder:text-foreground-dim focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-accent px-4 py-2 font-mono text-xs uppercase tracking-wide text-background transition hover:opacity-85"
          >
            {status === "sending" ? "Sending…" : "Get magic link"}
          </button>
          {status === "error" && (
            <p className="text-sm text-accent">
              Something went wrong, please try again.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
