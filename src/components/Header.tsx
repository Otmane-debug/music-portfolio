import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-tight">
            Mon univers musical
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground-dim transition group-hover:text-accent">
            guitare · électroacoustique · ableton
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
              Se connecter
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
