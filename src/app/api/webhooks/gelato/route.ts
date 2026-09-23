import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { createStripeClient } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";

function isAuthorized(request: Request) {
  const expected = process.env.GELATO_WEBHOOK_SECRET!;
  const received = request.headers.get("x-gelato-webhook-secret") ?? "";
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Gelato's order status can only be known asynchronously (production and
// address validation happen after our order-create call already returned),
// so this is how we "block" payment for undeliverable orders after the
// fact: refund automatically the moment Gelato reports the order failed.
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (body.event !== "order_status_updated") {
    return NextResponse.json({ ok: true });
  }

  const orderReferenceId: string | undefined = body.orderReferenceId;
  const fulfillmentStatus: string | undefined = body.fulfillmentStatus;
  if (!orderReferenceId || !fulfillmentStatus) {
    return NextResponse.json({ ok: true });
  }

  const admin = createAdminClient();
  const { data: order } = await admin
    .from("shop_orders")
    .select("id, stripe_session_id, refunded")
    .eq("stripe_session_id", orderReferenceId)
    .single();

  if (!order) {
    return NextResponse.json({ ok: true });
  }

  await admin
    .from("shop_orders")
    .update({ fulfillment_status: fulfillmentStatus })
    .eq("id", order.id);

  if (fulfillmentStatus === "failed" && !order.refunded) {
    const stripe = createStripeClient();
    const session = await stripe.checkout.sessions.retrieve(
      order.stripe_session_id,
    );

    if (session.payment_intent) {
      await stripe.refunds.create({
        payment_intent: session.payment_intent as string,
        reason: "requested_by_customer",
      });
      await admin
        .from("shop_orders")
        .update({ refunded: true })
        .eq("id", order.id);
    }
  }

  return NextResponse.json({ ok: true });
}
