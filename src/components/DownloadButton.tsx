"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DownloadButton({
  trackId,
  isLoggedIn,
}: {
  trackId: string;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!isLoggedIn) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="shrink-0 font-mono text-xs uppercase tracking-wide text-foreground-dim underline decoration-border underline-offset-4 transition hover:text-accent"
      >
        Sign in
      </button>
    );
  }

  return (
    <button
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          const res = await fetch(`/api/download/${trackId}`);
          if (!res.ok) throw new Error("download failed");
          const { url } = await res.json();
          window.location.href = url;
        } finally {
          setLoading(false);
        }
      }}
      className="shrink-0 font-mono text-xs uppercase tracking-wide text-accent underline decoration-accent/40 underline-offset-4 transition hover:opacity-75"
    >
      {loading ? "Preparing…" : "Download"}
    </button>
  );
}
