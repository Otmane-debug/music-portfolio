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
        Aucun morceau publié pour le moment — revenez bientôt.
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
    };
  });

  return (
    <div className="space-y-4">
      {!isLoggedIn && (
        <p className="font-mono text-xs uppercase tracking-wide text-foreground-dim">
          Connecte-toi pour télécharger les morceaux.
        </p>
      )}
      <TrackRows tracks={rows} isLoggedIn={isLoggedIn} />
    </div>
  );
}
