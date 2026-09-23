import Link from "next/link";
import BioSection from "@/components/BioSection";
import TrackList from "@/components/TrackList";
import TipButton from "@/components/TipButton";

export default function Home() {
  return (
    <div>
      <BioSection />

      <section className="space-y-6 border-t border-border py-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground-dim">
            Catalog
          </h2>
          <TipButton />
        </div>
        <TrackList />
      </section>

      <section className="space-y-6 border-t border-border py-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground-dim">
          Shop
        </h2>
        <p className="max-w-lg text-foreground-dim">
          Mugs, t-shirts, and hoodies printed on demand — shipped straight
          to your door.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { src: "/shop/tshirt/photo-3.jpg", alt: "Sailor VIII t-shirt being worn" },
            { src: "/shop/tshirt/photo-4.jpg", alt: "Sailor VIII t-shirt being worn" },
            { src: "/shop/mugs/waveform/photo-2.jpg", alt: "Sailor VIII mug on a table" },
          ].map((photo) => (
            <Link
              key={photo.src}
              href="/shop"
              className="group block aspect-square w-full overflow-hidden rounded-xl border border-border transition hover:border-accent"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </Link>
          ))}
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 rounded-full border border-accent px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-accent transition hover:bg-accent hover:text-background"
        >
          Visit the shop
        </Link>
      </section>

      <section className="space-y-4 border-t border-border py-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground-dim">
          Community
        </h2>
        <p className="text-foreground-dim">
          Join the Discord to chat, get updates, and hear new tracks first.
        </p>
        <a
          href="https://discord.gg/NzpmqNaJtE"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-accent px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-accent transition hover:bg-accent hover:text-background"
        >
          Join Discord
        </a>
      </section>
    </div>
  );
}
