const BARS = [
  { duration: "0.8s", delay: "0s" },
  { duration: "1.1s", delay: "0.1s" },
  { duration: "0.9s", delay: "0.2s" },
  { duration: "1.3s", delay: "0.05s" },
];

export default function EqBars() {
  return (
    <div className="flex h-4 shrink-0 items-end gap-0.5" aria-hidden>
      {BARS.map((bar, i) => (
        <span
          key={i}
          className="animate-eq w-[3px] rounded-sm bg-accent"
          style={{ animationDuration: bar.duration, animationDelay: bar.delay }}
        />
      ))}
    </div>
  );
}
