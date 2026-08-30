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

  const isLoggedIn = !!userData.user;

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

    return {
      id: track.id,
      title: track.title,
      description: track.description,
      url: preview.publicUrl,
      purchaseLink: track.purchase_link,
    };
  });

  return (
    <div className="space-y-4">
      {!isLoggedIn && (
        <p className="font-mono text-xs uppercase tracking-wide text-foreground-dim">
          Sign in to download tracks.
        </p>
      )}
      <TrackRows tracks={rows} isLoggedIn={isLoggedIn} />
    </div>
  );
}
