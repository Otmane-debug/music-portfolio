import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ trackId: string }> },
) {
  const { trackId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: track, error: trackError } = await supabase
    .from("tracks")
    .select("title, download_path")
    .eq("id", trackId)
    .single();

  if (trackError || !track) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const extension = track.download_path.split(".").pop();
  const filename = `${track.title}.${extension}`;

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from("tracks-private")
    .createSignedUrl(track.download_path, 60, { download: filename });

  if (error || !data) {
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }

  return NextResponse.json({ url: data.signedUrl });
}
