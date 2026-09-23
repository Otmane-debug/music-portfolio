"use client";

import { useState } from "react";
import type { ShopProduct } from "@/lib/shop/products";
import { formatPrice } from "@/lib/format";

export default function BuyForm({ product }: { product: ShopProduct }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const variant = product.variants.find((v) => v.id === variantId)!;
  const hasSizes = product.variants.length > 1;

  async function handleBuy() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, variantId }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Something went wrong");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <p className="font-display text-2xl text-foreground">
        {formatPrice(variant.priceCents)}
      </p>

      {hasSizes && (
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-wide text-foreground-dim">
            Taille
          </p>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => setVariantId(v.id)}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition ${
                  v.id === variantId
                    ? "border-accent bg-accent text-background"
                    : "border-border text-foreground-dim hover:border-accent hover:text-accent"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={handleBuy}
        disabled={loading}
        className="inline-flex items-center gap-1.5 rounded-full border border-accent px-6 py-2 font-mono text-xs uppercase tracking-wide text-accent transition hover:bg-accent hover:text-background disabled:opacity-50"
      >
        {loading ? "Redirection…" : "Acheter"}
      </button>

      {error && (
        <p className="font-mono text-xs text-red-400">{error}</p>
      )}

      <p className="font-mono text-[10px] uppercase tracking-wide text-foreground-dim">
        + {formatPrice(product.shippingCents)} de livraison (France)
      </p>
    </div>
  );
}
