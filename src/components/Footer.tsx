export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-6 font-mono text-xs text-foreground-dim">
        © {new Date().getFullYear()} Sailor VIII Music. All rights reserved.
      </div>
    </footer>
  );
}
