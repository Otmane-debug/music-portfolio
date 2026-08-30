const gear = ["Electric Guitar", "Electroacoustic", "Ableton Live", "Focusrite"];

export default function BioSection() {
  return (
    <section className="space-y-8 py-14">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Self-taught · ex-conservatory
        </p>
        <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          Music woven from strings and circuits.
        </h1>
      </div>

      <p className="max-w-lg text-foreground-dim">
        A self-taught musician, I spent a first year at the conservatory
        before the Covid-19 pandemic cut the training short. Since then,
        I&apos;ve kept learning on my own — moving between electric guitar,
        electroacoustic textures, and compositions in Ableton Live,
        recorded through a Focusrite interface.
      </p>
      <p className="max-w-lg text-foreground-dim">
        On the side, I&apos;m a software engineer — this site is my own
        build, designed as a miniature studio to share my music directly
        with you.
      </p>

      <ul className="flex flex-wrap gap-2">
        {gear.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wide text-foreground-dim"
          >
            {item}
          </li>
        ))}
      </ul>

      <a
        href="mailto:viiisailor82@gmail.com"
        className="inline-flex items-center gap-1.5 rounded-full border border-accent px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-accent transition hover:bg-accent hover:text-background"
      >
        Contact me
      </a>
    </section>
  );
}
