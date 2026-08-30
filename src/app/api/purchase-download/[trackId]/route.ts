import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { createStripeClient } from "@/lib/stripe";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ trackId: string }> },
) {
  const { trackId } = await params;
  const sessionId = new URL(request.url).searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: track, error: trackError } = await supabase
    .from("tracks")
    .select("title, download_path, stripe_price_id")
    .eq("id", trackId)
    .single();

  if (trackError || !track || !track.stripe_price_id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const stripe = createStripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  const paidForThisTrack =
    session.payment_status === "paid" &&
    session.line_items?.data.some(
      (item) => item.price?.id === track.stripe_price_id,
    );

  if (!paidForThisTrack) {
    return NextResponse.json(
      { error: "Payment not verified for this track" },
      { status: 403 },
    );
  }

  // The buy link carries client_reference_id=<user.id>, set while the
  // buyer was signed in — required so the purchase can be credited to
  // their account and show up in their purchase history.
  const userId = session.client_reference_id;
  if (!userId) {
    return NextResponse.json(
      { error: "Purchase isn't linked to a signed-in account" },
      { status: 400 },
    );
  }

  const admin = createAdminClient();

  const { error: purchaseError } = await admin.from("purchases").upsert(
    {
      user_id: userId,
      track_id: trackId,
      stripe_session_id: session.id,
    },
    { onConflict: "stripe_session_id" },
  );

  if (purchaseError) {
    return NextResponse.json({ error: "Could not record purchase" }, { status: 500 });
  }

  const extension = track.download_path.split(".").pop();
  const filename = `${track.title}.${extension}`;

  const { data, error } = await admin.storage
    .from("tracks-private")
    .createSignedUrl(track.download_path, 300, { download: filename });

  if (error || !data) {
    return NextResponse.json({ error: "Storage error" }, { status: 500 });
  }

  return NextResponse.redirect(data.signedUrl);
}
