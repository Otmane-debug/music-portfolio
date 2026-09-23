"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { CloseIcon, MenuIcon } from "@/components/icons";

export default function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative sm:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-9 w-9 items-center justify-center text-foreground-dim transition hover:text-accent"
      >
        {open ? (
          <CloseIcon className="h-5 w-5" />
        ) : (
          <MenuIcon className="h-5 w-5" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-44 rounded-xl border border-border bg-background-alt p-2 shadow-lg">
          <Link
            href="/gear"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:bg-border/40 hover:text-accent"
          >
            Gear
          </Link>
          <Link
            href="/shop"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:bg-border/40 hover:text-accent"
          >
            Shop
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:bg-border/40 hover:text-accent"
              >
                Profile
              </Link>
              <div className="px-1 py-1">
                <LogoutButton />
              </div>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-wide text-accent transition hover:bg-border/40"
            >
              Sign in
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
