import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import Logo from "@/components/Logo";
import MobileNav from "@/components/MobileNav";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <Link href="/" className="group flex items-center gap-2 sm:gap-3">
          <Logo className="h-7 w-7 shrink-0 text-accent sm:h-8 sm:w-8" />
          <span className="font-display text-base font-bold tracking-tight sm:text-lg">
            Sailor VIII Music
          </span>
        </Link>

        <nav className="hidden items-center gap-4 sm:flex">
          <Link
            href="/gear"
            className="font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:text-accent"
          >
            Gear
          </Link>
          <Link
            href="/shop"
            className="font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:text-accent"
          >
            Shop
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

        <MobileNav isLoggedIn={!!user} />
      </div>
    </header>
  );
}
