"use client";

import { useEffect, useState } from "react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, images.length]);

  return (
    <div className="space-y-3">
      <button
        onClick={() => setLightboxOpen(true)}
        className="block aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-background-alt"
        aria-label="Agrandir l'image"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </button>

      <div className="grid grid-cols-6 gap-2">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={`aspect-square overflow-hidden rounded-lg border bg-background-alt transition ${
              i === active
                ? "border-accent"
                : "border-border hover:border-accent"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {lightboxOpen && (
        <div
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-10"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Fermer"
            className="absolute right-4 top-4 font-mono text-xs uppercase tracking-wide text-white/70 transition hover:text-white"
          >
            Fermer ✕
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i - 1 + images.length) % images.length);
              }}
              aria-label="Image précédente"
              className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-6 text-2xl text-white/70 transition hover:text-white sm:left-6"
            >
              ‹
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full cursor-default object-contain"
          />

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActive((i) => (i + 1) % images.length);
              }}
              aria-label="Image suivante"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-6 text-2xl text-white/70 transition hover:text-white sm:right-6"
            >
              ›
            </button>
          )}

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-white/60">
            {active + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
