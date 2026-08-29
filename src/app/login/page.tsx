"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  return (
    <div className="mx-auto max-w-sm py-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Accès membre
      </p>
      <h1 className="mb-2 font-display text-2xl font-bold">Se connecter</h1>
      <p className="mb-6 text-sm text-foreground-dim">
        Reçois un lien magique par e-mail, aucun mot de passe nécessaire.
      </p>

      {status === "sent" ? (
        <p className="text-sm">
          Vérifie ta boîte mail ({email}) et clique sur le lien reçu.
        </p>
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
              },
            });
            setStatus(error ? "error" : "sent");
          }}
        >
          <input
            type="email"
            required
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg border border-border bg-transparent px-3 py-2 text-foreground placeholder:text-foreground-dim focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-accent px-4 py-2 font-mono text-xs uppercase tracking-wide text-background transition hover:opacity-85"
          >
            {status === "sending" ? "Envoi…" : "Recevoir le lien"}
          </button>
          {status === "error" && (
            <p className="text-sm text-accent">
              Une erreur est survenue, réessaie.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
