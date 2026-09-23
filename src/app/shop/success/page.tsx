import Link from "next/link";

export default async function ShopSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 py-14 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        Purchase complete
      </p>
      <h1 className="font-display text-3xl font-bold tracking-tight">
        Thanks for your order!
      </h1>
      <p className="max-w-md text-foreground-dim">
        {product ? `Your "${product}" is being prepared` : "Your order is being prepared"}{" "}
        and will be printed and shipped straight to you. You&apos;ll get a
        confirmation email from Stripe.
      </p>
      <Link
        href="/shop"
        className="mt-4 inline-block rounded-full border border-accent px-6 py-2 font-mono text-xs uppercase tracking-wide text-accent transition hover:bg-accent hover:text-background"
      >
        Back to shop
      </Link>
    </div>
  );
}
