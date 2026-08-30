import GearGrid from "@/components/GearGrid";

export default function GearPage() {
  return (
    <div className="space-y-8 py-14">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          The rig
        </p>
        <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          Gear behind the sound.
        </h1>
        <p className="max-w-lg text-foreground-dim">
          The instruments and equipment I record and perform with.
        </p>
      </div>

      <GearGrid />
    </div>
  );
}
