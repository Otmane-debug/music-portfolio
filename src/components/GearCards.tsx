"use client";

import { useState } from "react";

type Item = {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  imageUrl: string | null;
};

export default function GearCards({ items }: { items: Item[] }) {
  const [selected, setSelected] = useState<Item | null>(null);

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setSelected(item)}
              className="group block w-full overflow-hidden rounded-xl border border-border text-left transition hover:border-accent"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-background-alt">
                {item.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-wide text-foreground-dim">
                    No photo yet
                  </div>
                )}
              </div>
              <div className="space-y-1 p-4">
                {item.category && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                    {item.category}
                  </p>
                )}
                <h3 className="font-display text-lg text-foreground">
                  {item.name}
                </h3>
                {item.description && (
                  <p className="text-sm text-foreground-dim">
                    {item.description}
                  </p>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-6 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-full w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-background-alt"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-background">
              {selected.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selected.imageUrl}
                  alt={selected.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-wide text-foreground-dim">
                  No photo yet
                </div>
              )}
            </div>
            <div className="space-y-2 p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  {selected.category && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                      {selected.category}
                    </p>
                  )}
                  <h3 className="font-display text-2xl text-foreground">
                    {selected.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="shrink-0 rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:border-accent hover:text-accent"
                >
                  Close
                </button>
              </div>
              {selected.description && (
                <p className="text-sm text-foreground-dim">
                  {selected.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
