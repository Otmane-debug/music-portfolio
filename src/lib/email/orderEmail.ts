import { Resend } from "resend";
import { formatPrice } from "@/lib/format";

function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY!);
}

export type OrderEmailStep = "confirmed" | "in_production" | "shipped" | "delivered";

type OrderEmailData = {
  to: string;
  step: OrderEmailStep;
  productName: string;
  variantLabel: string;
  quantity: number;
  amountTotalCents: number;
  siteUrl: string;
  trackingUrl?: string | null;
  minDeliveryDate?: string | null;
  maxDeliveryDate?: string | null;
};

const STEP_COPY: Record<
  OrderEmailStep,
  { badge: string; heading: string; intro: string }
> = {
  confirmed: {
    badge: "Order confirmed",
    heading: "Thanks for your order!",
    intro:
      "We've received your payment. Your piece will be printed on demand and shipped straight to you.",
  },
  in_production: {
    badge: "In production",
    heading: "Your order is being printed",
    intro:
      "Our print shop has started making your piece. We'll let you know as soon as it's on its way.",
  },
  shipped: {
    badge: "Shipped",
    heading: "Your order is on its way!",
    intro: "Your piece just left the print shop and is now out for delivery.",
  },
  delivered: {
    badge: "Delivered",
    heading: "Your order has been delivered",
    intro:
      "Your piece has arrived. We hope you love it — thanks for supporting Sailor VIII!",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
}

function renderHtml(data: OrderEmailData) {
  const copy = STEP_COPY[data.step];
  const itemLine = `${data.productName}${
    data.variantLabel !== "One size" ? ` — ${data.variantLabel}` : ""
  }${data.quantity > 1 ? ` × ${data.quantity}` : ""}`;

  const deliveryRow =
    data.step === "shipped" && data.minDeliveryDate && data.maxDeliveryDate
      ? `<tr>
          <td style="padding:6px 0;color:#a89f8f;font-size:13px;">Estimated delivery</td>
          <td style="padding:6px 0;color:#f5efe6;font-size:13px;text-align:right;">${formatDate(
            data.minDeliveryDate,
          )} – ${formatDate(data.maxDeliveryDate)}</td>
        </tr>`
      : "";

  const trackingButton = data.trackingUrl
    ? `<tr>
        <td align="center" style="padding:28px 0 0;">
          <a href="${data.trackingUrl}" style="display:inline-block;background:#ff4d1c;color:#0e0c0a;text-decoration:none;font-weight:600;font-size:13px;letter-spacing:1px;text-transform:uppercase;padding:12px 28px;border-radius:999px;">Track package</a>
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background:#0e0c0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0e0c0a;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
            <tr>
              <td align="center" style="padding-bottom:28px;">
                <span style="color:#f5efe6;font-size:15px;font-weight:700;letter-spacing:0.5px;">Sailor VIII Music</span>
              </td>
            </tr>
            <tr>
              <td style="background:#17140f;border:1px solid rgba(245,239,230,0.14);border-radius:16px;padding:32px 28px;">
                <p style="margin:0 0 16px;color:#ff4d1c;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">${copy.badge}</p>
                <h1 style="margin:0 0 12px;color:#f5efe6;font-size:22px;line-height:1.3;">${copy.heading}</h1>
                <p style="margin:0 0 24px;color:#a89f8f;font-size:14px;line-height:1.6;">${copy.intro}</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(245,239,230,0.14);padding-top:16px;">
                  <tr>
                    <td style="padding:6px 0;color:#f5efe6;font-size:14px;font-weight:600;">${itemLine}</td>
                    <td style="padding:6px 0;color:#f5efe6;font-size:14px;text-align:right;">${formatPrice(
                      data.amountTotalCents,
                    )}</td>
                  </tr>
                  ${deliveryRow}
                </table>

                ${trackingButton}

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center" style="padding-top:20px;">
                      <a href="${data.siteUrl}/account" style="color:#a89f8f;text-decoration:underline;font-size:13px;">View my orders</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:24px;">
                <p style="margin:0;color:#a89f8f;font-size:11px;">Sailor VIII Music</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

const SUBJECTS: Record<OrderEmailStep, (productName: string) => string> = {
  confirmed: (name) => `Order confirmed — ${name}`,
  in_production: (name) => `Your order "${name}" is in production`,
  shipped: (name) => `Your order "${name}" has shipped`,
  delivered: (name) => `Your order "${name}" has been delivered`,
};

export async function sendOrderEmail(data: OrderEmailData) {
  const resend = getResendClient();
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: data.to,
    subject: SUBJECTS[data.step](data.productName),
    html: renderHtml(data),
  });
}
