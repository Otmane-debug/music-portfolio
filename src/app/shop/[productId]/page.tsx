import Link from "next/link";
import { notFound } from "next/navigation";
import { getShopProduct } from "@/lib/shop/products";
import BuyForm from "@/components/shop/BuyForm";

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

  return (
    <div className="py-14">
      <Link
        href="/shop"
        className="mb-8 inline-block font-mono text-xs uppercase tracking-wide text-foreground-dim transition hover:text-accent"
      >
        ← Back to shop
      </Link>

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
        <div className="space-y-3">
          <div className="aspect-square w-full overflow-hidden rounded-xl border border-border bg-background-alt">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.gallery[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.gallery.length > 1 && (
            <div className="grid grid-cols-3 gap-3">
              {product.gallery.slice(1).map((src) => (
                <div
                  key={src}
                  className="aspect-square w-full overflow-hidden rounded-lg border border-border bg-background-alt"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {product.tagline}
            </p>
            <h1 className="font-display text-3xl font-bold leading-tight tracking-tight">
              {product.name}
            </h1>
          </div>

          <BuyForm product={product} />

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
