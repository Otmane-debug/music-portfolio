import ShopGrid from "@/components/shop/ShopGrid";

export default function ShopPage() {
  return (
    <div className="space-y-8 py-14">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Merch
        </p>
        <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          Wear the sound.
        </h1>
        <p className="max-w-lg text-foreground-dim">
          Mugs, t-shirts, and hoodies printed on demand — shipped straight to
          your door.
        </p>
      </div>

      <ShopGrid />
    </div>
  );
}
