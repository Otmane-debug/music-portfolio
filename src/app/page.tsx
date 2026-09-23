import Link from "next/link";
import BioSection from "@/components/BioSection";
import TrackList from "@/components/TrackList";
import TipButton from "@/components/TipButton";

export default function Home() {
  return (
    <div className="pb-10">
      <BioSection />

      <section className="space-y-6 border-t border-border pt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground-dim">
            Catalog
          </h2>
          <TipButton />
        </div>
        <TrackList />
      </section>

      <section className="space-y-6 border-t border-border pt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-foreground-dim">
          Shop
        </h2>
        <p className="max-w-lg text-foreground-dim">
          Mugs, t-shirts et hoodies imprimés à la demande — livrés
          directement chez toi.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/shop/tshirt/photo-3.jpg"
            alt="T-shirt Sailor VIII porté"
            className="aspect-square w-full rounded-xl border border-border object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/shop/tshirt/photo-4.jpg"
            alt="T-shirt Sailor VIII porté"
            className="aspect-square w-full rounded-xl border border-border object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/shop/mugs/waveform/photo-2.jpg"
            alt="Mug Sailor VIII sur une table"
            className="aspect-square w-full rounded-xl border border-border object-cover"
          />
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 rounded-full border border-accent px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-accent transition hover:bg-accent hover:text-background"
        >
          Voir le shop
        </Link>
      </section>

      <section className="space-y-4 border-t border-border pt-10">
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
