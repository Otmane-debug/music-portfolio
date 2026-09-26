import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-6 py-6 font-mono text-xs text-foreground-dim">
        <span>
          © {new Date().getFullYear()} Sailor VIII Music. All rights
          reserved.
        </span>
        <Link href="/privacy" className="transition hover:text-accent">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
