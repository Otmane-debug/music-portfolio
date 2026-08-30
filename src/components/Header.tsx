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
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight">
              Sailor VIII Music
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground-dim transition group-hover:text-accent">
              electric guitar · electroacoustic · ableton
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden font-mono text-xs text-foreground-dim sm:inline">
                {user.email}
              </span>
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
