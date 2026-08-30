import { createClient } from "@/lib/supabase/server";
import type { Track } from "@/lib/types";
import TrackRows from "@/components/TrackRows";

export default async function TrackList() {
  const supabase = await createClient();

  const [{ data: tracks }, { data: userData }] = await Promise.all([
    supabase
      .from("tracks")
      .select("*")
      .order("created_at", { ascending: false }),
    supabase.auth.getUser(),
  ]);

  const user = userData.user;
  const isLoggedIn = !!user;

  if (!tracks || tracks.length === 0) {
    return (
      <p className="font-mono text-sm text-foreground-dim">
        No tracks published yet — check back soon.
      </p>
    );
  }

  const rows = (tracks as Track[]).map((track) => {
    const { data: preview } = supabase.storage
      .from("tracks-public")
      .getPublicUrl(track.preview_path);

    // Tie the checkout session to the signed-in visitor, so the payment
    // can be matched back to their account after Stripe redirects here.
    let buyLink: string | null = null;
    if (user && track.purchase_link) {
      const url = new URL(track.purchase_link);
      url.searchParams.set("client_reference_id", user.id);
      if (user.email) url.searchParams.set("prefilled_email", user.email);
      buyLink = url.toString();
    }

    return {
      id: track.id,
      title: track.title,
      description: track.description,
      url: preview.publicUrl,
      buyLink,
    };
  });

  return (
    <div className="space-y-4">
      {!isLoggedIn && (
        <p className="font-mono text-xs uppercase tracking-wide text-foreground-dim">
          Sign in to buy tracks.
        </p>
      )}
      <TrackRows tracks={rows} />
    </div>
  );
}
