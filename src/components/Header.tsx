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
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-4 sm:px-6 sm:py-5">
        <Link href="/" className="group flex items-center gap-2 sm:gap-3">
          <Logo className="h-7 w-7 shrink-0 text-accent sm:h-8 sm:w-8" />
          <span className="font-display text-base font-bold tracking-tight sm:text-lg">
            Sailor VIII Music
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-4">
          <Link
            href="/gear"
            className="font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:text-accent"
          >
            Gear
          </Link>
          {user ? (
            <>
              <Link
                href="/account"
                className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wide transition hover:border-accent hover:text-accent sm:px-4 sm:py-1.5"
              >
                Profile
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-accent px-3 py-1 font-mono text-xs uppercase tracking-wide text-accent transition hover:bg-accent hover:text-background sm:px-4 sm:py-1.5"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
