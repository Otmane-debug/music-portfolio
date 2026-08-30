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
    .select("title, download_path, stripe_product_id")
    .eq("id", trackId)
    .single();

  if (trackError || !track || !track.stripe_product_id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const stripe = createStripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  // Compared by product, not price: "customer chooses the amount" prices
  // mint a fresh Price id on every checkout, but stay on the same Product.
  const paidForThisTrack =
    session.payment_status === "paid" &&
    session.line_items?.data.some(
      (item) => item.price?.product === track.stripe_product_id,
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

  // The signed URL sets Content-Disposition: attachment, so navigating to
  // it starts a download without leaving this page — show a proper thank
  //-you page instead of a blank tab, with a way back into the site.
  const html = `<!DOCTYPE html>
<html>
  <head><meta charset="utf-8" /><title>${track.title}</title></head>
  <body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0e0c0a;color:#f5efe6;font-family:system-ui,sans-serif;">
    <div style="text-align:center;max-width:420px;padding:0 24px;">
      <p style="color:#ff4d1c;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin:0 0 16px;">Purchase complete</p>
      <h1 style="font-size:24px;margin:0 0 12px;">Thanks for your purchase!</h1>
      <p style="color:#a89f8f;font-size:14px;line-height:1.6;margin:0 0 28px;">Your download of "${track.title}" is starting automatically. You can also find it anytime in your account's purchase history.</p>
      <a href="/" style="display:inline-block;background:#ff4d1c;color:#0e0c0a;text-decoration:none;font-weight:600;font-size:13px;letter-spacing:1px;text-transform:uppercase;padding:12px 28px;border-radius:999px;margin-right:12px;">Back to home</a>
      <a href="/account" style="display:inline-block;color:#a89f8f;text-decoration:underline;font-size:13px;">View purchases</a>
    </div>
    <script>
      window.location.href = ${JSON.stringify(data.signedUrl)};
    </script>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html" },
  });
}
