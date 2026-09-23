import { NextResponse } from "next/server";
import { createStripeClient } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { getShopProduct } from "@/lib/shop/products";
import { sendOrderEmail } from "@/lib/email/orderEmail";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  const origin = new URL(request.url).origin;

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const stripe = createStripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "collected_information"],
  });

  if (session.payment_status !== "paid") {
    return NextResponse.json(
      { error: "Payment not verified" },
      { status: 403 },
    );
  }

  const { productId, variantId, gelatoProductUid, designFileUrl } =
    session.metadata ?? {};
  const product = productId ? getShopProduct(productId) : undefined;
  const quantity = session.line_items?.data[0]?.quantity ?? 1;

  const shipping = session.collected_information?.shipping_details;
  const email = session.customer_details?.email;

  if (product && gelatoProductUid && designFileUrl && shipping) {
    const [firstName, ...rest] = shipping.name.split(" ");

    // orderReferenceId = the Stripe session id, so a reloaded success page
    // (or a retry) doesn't place the same print order twice.
    const gelatoRes = await fetch("https://order.gelatoapis.com/v4/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.GELATO_API_KEY!,
      },
      body: JSON.stringify({
        orderType: "order",
        orderReferenceId: session.id,
        customerReferenceId: email ?? session.id,
        currency: "EUR",
        items: [
          {
            itemReferenceId: `${variantId}-1`,
            productUid: gelatoProductUid,
            files: [{ type: "default", url: designFileUrl }],
            quantity,
          },
        ],
        shippingAddress: {
          firstName: firstName || shipping.name,
          lastName: rest.join(" ") || firstName,
          addressLine1: shipping.address.line1,
          addressLine2: shipping.address.line2 ?? undefined,
          city: shipping.address.city,
          postCode: shipping.address.postal_code,
          country: shipping.address.country,
          email: email ?? undefined,
        },
      }),
    });

    let gelatoOrderId: string | null = null;
    if (!gelatoRes.ok) {
      const errorBody = await gelatoRes.text();
      console.error("Gelato order creation failed:", errorBody);
    } else {
      const gelatoOrder = await gelatoRes.json();
      gelatoOrderId = gelatoOrder.id ?? null;
    }

    // Recorded even for guests (user_id null) — only signed-in buyers see
    // it in their account, but the row still ties the Stripe session to
    // the Gelato order for support/lookup purposes. The print order above
    // already went through, so a DB hiccup here must not 500 the buyer's
    // redirect to the confirmation page.
    const variantLabel =
      product.variants.find((v) => v.id === variantId)?.label ?? "";
    const amountTotalCents = session.amount_total ?? 0;

    try {
      const admin = createAdminClient();
      await admin.from("shop_orders").upsert(
        {
          user_id: session.client_reference_id ?? null,
          stripe_session_id: session.id,
          gelato_order_id: gelatoOrderId,
          product_id: product.id,
          product_name: product.name,
          variant_label: variantLabel,
          quantity,
          amount_total_cents: amountTotalCents,
          email: email ?? null,
        },
        { onConflict: "stripe_session_id" },
      );
    } catch (err) {
      console.error("Failed to record shop order:", err);
    }

    if (email) {
      try {
        await sendOrderEmail({
          to: email,
          step: "confirmed",
          productName: product.name,
          variantLabel,
          quantity,
          amountTotalCents,
          siteUrl: origin,
        });
      } catch (err) {
        console.error("Failed to send order confirmation email:", err);
      }
    }
  }

  return NextResponse.redirect(
    `${origin}/shop/success?product=${encodeURIComponent(product?.name ?? "")}`,
  );
}
