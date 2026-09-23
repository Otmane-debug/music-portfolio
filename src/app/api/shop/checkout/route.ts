import { NextResponse } from "next/server";
import { createStripeClient } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { getShopProduct } from "@/lib/shop/products";

export async function POST(request: Request) {
  const { productId, variantId } = await request.json();

  const product = getShopProduct(productId);
  const variant = product?.variants.find((v) => v.id === variantId);

  if (!product || !variant) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const origin = new URL(request.url).origin;
  const stripe = createStripeClient();

  // Not required to buy merch, but lets signed-in buyers see the order
  // later in their account's purchase history.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ...(user && { client_reference_id: user.id }),
    ...(user?.email && { customer_email: user.email }),
    line_items: [
      {
        price_data: {
          currency: "eur",
          unit_amount: variant.priceCents,
          product_data: {
            name:
              variant.label === "Unique"
                ? product.name
                : `${product.name} — ${variant.label}`,
            images: [`${origin}${product.image}`],
          },
        },
        quantity: 1,
        adjustable_quantity: { enabled: true, minimum: 1, maximum: 5 },
      },
    ],
    shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU", "MC"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: product.shippingCents, currency: "eur" },
          display_name: "Livraison standard",
        },
      },
    ],
    // Read back by /api/shop/complete to build the Gelato print order —
    // keeps a Gelato-specific webhook/secret out of the deploy checklist,
    // mirroring how track purchases are verified on Stripe's redirect.
    metadata: {
      productId: product.id,
      variantId: variant.id,
      gelatoProductUid: variant.gelatoProductUid,
      designFileUrl: `${origin}${product.designFile}`,
    },
    success_url: `${origin}/api/shop/complete?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/shop/${product.id}`,
  });

  return NextResponse.json({ url: session.url });
}
