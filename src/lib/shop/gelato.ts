const STATUS_LABELS: Record<string, string> = {
  draft: "Brouillon",
  pending: "En attente",
  printed: "Imprimée",
  in_production: "En impression",
  failed: "Échouée",
  passed: "Validée",
  canceled: "Annulée",
  shipped: "Expédiée",
  delivered: "Livrée",
};

export async function getGelatoOrderStatus(gelatoOrderId: string) {
  const res = await fetch(`https://order.gelatoapis.com/v4/orders/${gelatoOrderId}`, {
    headers: { "X-API-KEY": process.env.GELATO_API_KEY! },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const order = await res.json();
  const status: string = order.fulfillmentStatus ?? "pending";
  const pkg = order.shipment?.packages?.[0];

  return {
    status,
    label: STATUS_LABELS[status] ?? status,
    trackingUrl: pkg?.trackingUrl ?? null,
    trackingCode: pkg?.trackingCode ?? null,
    minDeliveryDate: order.shipment?.minDeliveryDate ?? null,
    maxDeliveryDate: order.shipment?.maxDeliveryDate ?? null,
  };
}
