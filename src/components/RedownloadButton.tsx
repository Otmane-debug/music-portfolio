"use client";

import { useState } from "react";

export default function RedownloadButton({ trackId }: { trackId: string }) {
  const [loading, setLoading] = useState(false);

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
