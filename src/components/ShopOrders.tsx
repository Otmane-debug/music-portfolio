import { createClient } from "@/lib/supabase/server";
import { getGelatoOrderStatus } from "@/lib/shop/gelato";
import { formatPrice } from "@/lib/format";

export default async function ShopOrders() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: orders } = await supabase
    .from("shop_orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (!orders || orders.length === 0) {
    return (
      <p className="text-sm text-foreground-dim">
        You haven&apos;t ordered any merch yet.
      </p>
    );
  }

  const withStatus = await Promise.all(
    orders.map(async (order) => ({
      ...order,
      status: order.gelato_order_id
        ? await getGelatoOrderStatus(order.gelato_order_id)
        : null,
    })),
  );

  return (
    <ul className="divide-y divide-border">
      {withStatus.map((order) => (
        <li key={order.id} className="space-y-1 py-3 text-sm">
          <div className="flex items-center justify-between">
            <span>
              {order.product_name}
              {order.variant_label !== "Unique" && ` — ${order.variant_label}`}
              {order.quantity > 1 && ` × ${order.quantity}`}
            </span>
            <span className="flex items-center gap-4">
              <span className="font-mono text-xs text-foreground-dim">
                {new Date(order.created_at).toLocaleDateString()}
              </span>
              <span className="font-mono text-xs text-foreground-dim">
                {formatPrice(order.amount_total_cents)}
              </span>
            </span>
          </div>
          {order.refunded ? (
            <p className="font-mono text-xs uppercase tracking-wide text-foreground-dim">
              Remboursé — livraison impossible à cette adresse
            </p>
          ) : (
            order.status && (
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-accent">
                <span>{order.status.label}</span>
                {order.status.trackingUrl && (
                  <a
                    href={order.status.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                  >
                    Suivre le colis
                  </a>
                )}
              </div>
            )
          )}
        </li>
      ))}
    </ul>
  );
}
