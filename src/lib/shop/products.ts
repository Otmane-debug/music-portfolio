export type ShopCategory = "mugs" | "t-shirts" | "hoodies";

export type ShopVariant = {
  id: string;
  label: string;
  priceCents: number;
  gelatoProductUid: string;
};

export type ShopProduct = {
  id: string;
  category: ShopCategory;
  name: string;
  tagline: string;
  description: string[];
  image: string;
  gallery: string[];
  designFile: string;
  shippingCents: number;
  variants: ShopVariant[];
};

const MUG_UID = "mug_product_msz_11-oz_mmat_ceramic-white_cl_4-0";
const MUG_DESCRIPTION = [
  "Ce magnifique mug en céramique est parfait pour tous les événements de la journée : un café du matin, un chocolat chaud, ou toute autre boisson chaude que tu apprécies. Le mug est d'un blanc brillant avec un bord, un intérieur et une poignée colorés. Les impressions ressortent magnifiquement avec des couleurs vives. L'impression conserve sa qualité et son éclat même après l'utilisation au micro-ondes et au lave-vaisselle.",
  "Mug en céramique 325 ml (11 oz) — peut être mis au micro-ondes — bord, intérieur et poignée colorés — zone d'impression blanche.",
];

export const shopProducts: ShopProduct[] = [
  {
    id: "mug-waveform",
    category: "mugs",
    name: "Mug Waveform",
    tagline: "Stereo · 48 kHz · 24 bit",
    description: MUG_DESCRIPTION,
    image: "/shop/mugs/waveform/photo-lifestyle.jpg",
    gallery: [
      "/shop/mugs/waveform/photo-lifestyle.jpg",
      "/shop/mugs/waveform/photo-front.jpg",
    ],
    designFile: "/shop/mugs/waveform/design.png",
    shippingCents: 499,
    variants: [
      { id: "default", label: "Unique", priceCents: 1026, gelatoProductUid: MUG_UID },
    ],
  },
  {
    id: "mug-harmonic-ratios",
    category: "mugs",
    name: "Mug Harmonic Ratios",
    tagline: "2:1 · 3:2 · 4:3",
    description: MUG_DESCRIPTION,
    image: "/shop/mugs/harmonic-ratios/photo-lifestyle.jpg",
    gallery: [
      "/shop/mugs/harmonic-ratios/photo-lifestyle.jpg",
      "/shop/mugs/harmonic-ratios/photo-front.jpg",
    ],
    designFile: "/shop/mugs/harmonic-ratios/design.png",
    shippingCents: 499,
    variants: [
      { id: "default", label: "Unique", priceCents: 1026, gelatoProductUid: MUG_UID },
    ],
  },
  {
    id: "mug-side-a-side-b",
    category: "mugs",
    name: "Mug Side A / Side B",
    tagline: "33 1/3 RPM · 45 RPM",
    description: MUG_DESCRIPTION,
    image: "/shop/mugs/side-a-side-b/photo-lifestyle.jpg",
    gallery: [
      "/shop/mugs/side-a-side-b/photo-lifestyle.jpg",
      "/shop/mugs/side-a-side-b/photo-front.jpg",
    ],
    designFile: "/shop/mugs/side-a-side-b/design.png",
    shippingCents: 499,
    variants: [
      { id: "default", label: "Unique", priceCents: 1026, gelatoProductUid: MUG_UID },
    ],
  },
  {
    id: "tshirt-high-bias",
    category: "t-shirts",
    name: "T-shirt High Bias",
    tagline: "Mixtape Vol. 08 — Type II",
    description: [
      "Ce t-shirt, réputé pour sa douceur au toucher, est idéal pour l'impression DTG.",
      "Col sans couture aiguille double avec haute densité de points pour une surface d'impression plus lisse. Comprend une étiquette détachable pour un rebranding facile. Coupe tubulaire pour une torsion minimale. Disponible dans une large gamme de couleurs pour répondre à divers besoins de design.",
    ],
    image: "/shop/tshirt/photo-front.jpg",
    gallery: [
      "/shop/tshirt/photo-front.jpg",
      "/shop/tshirt/photo-model-1.jpg",
      "/shop/tshirt/photo-model-2.jpg",
    ],
    designFile: "/shop/tshirt/design.png",
    shippingCents: 439,
    variants: [
      { id: "s", label: "S", priceCents: 1238, gelatoProductUid: "apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_classic_gsi_s_gco_white_gpr_4-0_gildan_64000" },
      { id: "m", label: "M", priceCents: 1238, gelatoProductUid: "apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_classic_gsi_m_gco_white_gpr_4-0_gildan_64000" },
      { id: "l", label: "L", priceCents: 1238, gelatoProductUid: "apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_classic_gsi_l_gco_white_gpr_4-0_gildan_64000" },
      { id: "xl", label: "XL", priceCents: 1238, gelatoProductUid: "apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_classic_gsi_xl_gco_white_gpr_4-0_gildan_64000" },
      { id: "2xl", label: "2XL", priceCents: 1622, gelatoProductUid: "apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_classic_gsi_2xl_gco_white_gpr_4-0_gildan_64000" },
      { id: "3xl", label: "3XL", priceCents: 1976, gelatoProductUid: "apparel_product_gca_t-shirt_gsc_crewneck_gcu_unisex_gqa_classic_gsi_3xl_gco_white_gpr_4-0_gildan_64000" },
    ],
  },
  {
    id: "hoodie-harmonic-ratios",
    category: "hoodies",
    name: "Hoodie Harmonic Ratios",
    tagline: "2:1 · 3:2 · 4:3",
    description: [
      "Un sweat à capuche épais, fabriqué à partir d'un doux mélange 50% coton et 50% polyester.",
      "Doté d'une capuche doublée avec cordon de serrage assorti. La filature à jet d'air du tissu offre une sensation de douceur et réduit le boulochage. Comprend une poche ventrale, des poignets en tricot côtelé et une ceinture montée en élasthanne.",
    ],
    image: "/shop/hoodie-harmonic-ratios/photo-front.jpg",
    gallery: [
      "/shop/hoodie-harmonic-ratios/photo-front.jpg",
      "/shop/hoodie-harmonic-ratios/photo-model-1.jpg",
      "/shop/hoodie-harmonic-ratios/photo-model-2.jpg",
    ],
    designFile: "/shop/hoodie-harmonic-ratios/design.png",
    shippingCents: 699,
    variants: [
      { id: "s", label: "S", priceCents: 3752, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_classic_gsi_s_gco_white_gpr_4-0_gildan_18500" },
      { id: "m", label: "M", priceCents: 3872, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_classic_gsi_m_gco_white_gpr_4-0_gildan_18500" },
      { id: "l", label: "L", priceCents: 3872, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_classic_gsi_l_gco_white_gpr_4-0_gildan_18500" },
      { id: "xl", label: "XL", priceCents: 3872, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_classic_gsi_xl_gco_white_gpr_4-0_gildan_18500" },
      { id: "2xl", label: "2XL", priceCents: 4256, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_classic_gsi_2xl_gco_white_gpr_4-0_gildan_18500" },
      { id: "3xl", label: "3XL", priceCents: 4608, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_classic_gsi_3xl_gco_white_gpr_4-0_gildan_18500" },
      { id: "4xl", label: "4XL", priceCents: 5708, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_classic_gsi_4xl_gco_white_gpr_4-0_gildan_18500" },
      { id: "5xl", label: "5XL", priceCents: 6116, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_classic_gsi_5xl_gco_white_gpr_4-0_gildan_18500" },
    ],
  },
  {
    id: "hoodie-long-play",
    category: "hoodies",
    name: "Hoodie Long Play",
    tagline: "Side A · 33 1/3 RPM",
    description: [
      "Un sweat-shirt à capuche unisexe confortable et durable, fabriqué à partir d'un mélange de coton bio et de polyester recyclé.",
      "80% coton bio et 20% polyester recyclé. Construction à 3 fils pour plus de durabilité. Doublure brossée pour plus de chaleur et de confort. Cordon de serrage avec œillets stoppers métalliques.",
    ],
    image: "/shop/hoodie-long-play/photo-front.jpg",
    gallery: [
      "/shop/hoodie-long-play/photo-front.jpg",
      "/shop/hoodie-long-play/photo-model-1.jpg",
      "/shop/hoodie-long-play/photo-back.jpg",
    ],
    designFile: "/shop/hoodie-long-play/design.png",
    shippingCents: 699,
    variants: [
      { id: "xs", label: "XS", priceCents: 6460, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_organic_gsi_xs_gco_white_gpr_4-0_sols_03568" },
      { id: "s", label: "S", priceCents: 6460, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_organic_gsi_s_gco_white_gpr_4-0_sols_03568" },
      { id: "m", label: "M", priceCents: 6460, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_organic_gsi_m_gco_white_gpr_4-0_sols_03568" },
      { id: "l", label: "L", priceCents: 6460, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_organic_gsi_l_gco_white_gpr_4-0_sols_03568" },
      { id: "xl", label: "XL", priceCents: 6460, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_organic_gsi_xl_gco_white_gpr_4-0_sols_03568" },
      { id: "2xl", label: "2XL", priceCents: 6854, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_organic_gsi_xxl_gco_white_gpr_4-0_sols_03568" },
      { id: "3xl", label: "3XL", priceCents: 7218, gelatoProductUid: "apparel_product_gca_hoodie_gsc_pullover_gcu_unisex_gqa_organic_gsi_3xl_gco_white_gpr_4-0_sols_03568" },
    ],
  },
];

export const shopCategories: { id: ShopCategory; label: string }[] = [
  { id: "mugs", label: "Mugs" },
  { id: "t-shirts", label: "T-shirts" },
  { id: "hoodies", label: "Hoodies" },
];

export function getShopProduct(id: string) {
  return shopProducts.find((product) => product.id === id);
}

export function lowestPriceCents(product: ShopProduct) {
  return Math.min(...product.variants.map((v) => v.priceCents));
}
