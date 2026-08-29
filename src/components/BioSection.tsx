const gear = ["Guitare électrique", "Électroacoustique", "Ableton Live", "Focusrite"];

export default function BioSection() {
  return (
    <section className="space-y-8 py-14">
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
          Autodidacte · ex-conservatoire · ingénieur informatique
        </p>
        <h1 className="max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          Musique tissée entre cordes et circuits.
        </h1>
      </div>

      <p className="max-w-lg text-foreground-dim">
        Musicien autodidacte, j&apos;ai posé une première année de
        conservatoire avant que le Covid-19 n&apos;interrompe la formation.
        Depuis, j&apos;ai continué seul — entre guitare électrique, textures
        électroacoustiques et compositions sur Ableton Live, enregistrées via
        une interface Focusrite.
      </p>
      <p className="max-w-lg text-foreground-dim">
        En parallèle, je suis ingénieur informatique — ce site est ma propre
        construction, pensée comme un studio miniature pour partager ma
        musique directement avec vous.
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
    </section>
  );
}
