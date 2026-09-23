import Link from "next/link";
import { notFound } from "next/navigation";
import { getShopProduct } from "@/lib/shop/products";
import { createClient } from "@/lib/supabase/server";
import BuyForm from "@/components/shop/BuyForm";
import ProductGallery from "@/components/shop/ProductGallery";

export default async function ShopProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const product = getShopProduct(productId);

  if (!product) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="py-14">
      <Link
        href="/shop"
        className="mb-8 inline-block font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:text-accent"
      >
        ← Back to shop
      </Link>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <ProductGallery images={product.gallery} alt={product.name} />

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {product.tagline}
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight">
              {product.name}
            </h1>
          </div>

          <BuyForm product={product} isLoggedIn={!!user} />

          <div className="space-y-3 border-t border-border pt-6">
            {product.description.map((paragraph) => (
              <p key={paragraph} className="text-sm text-foreground-dim">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
