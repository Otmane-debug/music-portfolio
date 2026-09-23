import { timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { createStripeClient } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { getGelatoOrderStatus } from "@/lib/shop/gelato";
import { sendOrderEmail, type OrderEmailStep } from "@/lib/email/orderEmail";

// Gelato reports several fulfillmentStatus values as items move through
// production; multiple raw statuses map to the same customer-facing email
// milestone, and each milestone column ensures we only ever send it once
// regardless of how many times Gelato repeats or reorders webhook calls.
const MILESTONES: { statuses: string[]; step: OrderEmailStep; column: string }[] = [
  { statuses: ["printed", "in_production", "passed"], step: "in_production", column: "emailed_in_production" },
  { statuses: ["shipped"], step: "shipped", column: "emailed_shipped" },
  { statuses: ["delivered"], step: "delivered", column: "emailed_delivered" },
];

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
    .select(
      "id, stripe_session_id, gelato_order_id, refunded, email, product_name, variant_label, quantity, amount_total_cents, emailed_in_production, emailed_shipped, emailed_delivered",
    )
    .eq("stripe_session_id", orderReferenceId)
    .single();

  if (!order) {
    return NextResponse.json({ ok: true });
  }

  await admin
    .from("shop_orders")
    .update({ fulfillment_status: fulfillmentStatus })
    .eq("id", order.id);

  const milestone = MILESTONES.find((m) => m.statuses.includes(fulfillmentStatus));
  if (
    milestone &&
    order.email &&
    !order[milestone.column as keyof typeof order]
  ) {
    const status = order.gelato_order_id
      ? await getGelatoOrderStatus(order.gelato_order_id)
      : null;

    try {
      await sendOrderEmail({
        to: order.email,
        step: milestone.step,
        productName: order.product_name,
        variantLabel: order.variant_label,
        quantity: order.quantity,
        amountTotalCents: order.amount_total_cents,
        siteUrl: new URL(request.url).origin,
        trackingUrl: status?.trackingUrl,
        minDeliveryDate: status?.minDeliveryDate,
        maxDeliveryDate: status?.maxDeliveryDate,
      });
      await admin
        .from("shop_orders")
        .update({ [milestone.column]: true })
        .eq("id", order.id);
    } catch (err) {
      console.error(`Failed to send ${milestone.step} order email:`, err);
    }
  }

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
