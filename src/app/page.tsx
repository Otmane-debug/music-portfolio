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
    </div>
  );
}
