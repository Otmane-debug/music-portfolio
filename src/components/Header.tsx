import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import Logo from "@/components/Logo";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-center gap-3">
          <Logo className="h-8 w-8 shrink-0 text-accent" />
          <span className="font-display text-lg font-bold tracking-tight">
            Sailor VIII Music
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/gear"
            className="hidden font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:text-accent sm:inline"
          >
            Gear
          </Link>
          {user ? (
            <>
              <Link
                href="/account"
                className="rounded-full border border-border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition hover:border-accent hover:text-accent"
              >
                Profile
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-accent px-4 py-1.5 font-mono text-xs uppercase tracking-wide text-accent transition hover:bg-accent hover:text-background"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
