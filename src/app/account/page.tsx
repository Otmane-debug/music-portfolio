import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import RedownloadButton from "@/components/RedownloadButton";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: purchases } = await supabase
    .from("purchases")
    .select("id, track_id, created_at, tracks (title)")
    .order("created_at", { ascending: false });

  return (
    <div className="py-14">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Your account
      </p>
      <h1 className="mb-10 font-display text-2xl font-bold">{user.email}</h1>

      <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-foreground-dim">
        Purchase history
      </h2>

      {!purchases || purchases.length === 0 ? (
        <p className="text-sm text-foreground-dim">
          You haven&apos;t bought any tracks yet.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {purchases.map((purchase) => (
            <li
              key={purchase.id}
              className="flex items-center justify-between py-3 text-sm"
            >
              <span>
                {(purchase.tracks as unknown as { title: string } | null)
                  ?.title ?? "Untitled track"}
              </span>
              <span className="flex items-center gap-4">
                <span className="font-mono text-xs text-foreground-dim">
                  {new Date(purchase.created_at).toLocaleDateString()}
                </span>
                <RedownloadButton trackId={purchase.track_id} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
