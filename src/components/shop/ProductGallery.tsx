"use client";

import { useEffect, useRef, useState } from "react";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = () => setActive((i) => (i + 1) % images.length);
  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen, images.length]);

  // Swipe left/right, since the corner arrow buttons sit close to the
  // screen edge where mobile browsers often intercept taps for their own
  // back/forward-swipe gestures.
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  }

  return (
    <div className="space-y-3">
      <button
        onClick={() => setLightboxOpen(true)}
        className="block aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-background-alt"
        aria-label="Zoom in"
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
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-10"
        >
          <button
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg text-white ring-1 ring-white/40 transition hover:bg-white/30"
          >
            ✕
          </button>

          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white ring-1 ring-white/40 transition hover:bg-white/30 sm:left-6"
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
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl text-white ring-1 ring-white/40 transition hover:bg-white/30 sm:right-6"
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
