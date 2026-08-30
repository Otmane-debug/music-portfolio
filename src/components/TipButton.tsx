export default function TipButton() {
  const link = process.env.NEXT_PUBLIC_STRIPE_TIP_LINK;

  if (!link) return null;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-accent transition hover:bg-accent hover:text-background"
    >
      Tip
    </a>
  );
}
