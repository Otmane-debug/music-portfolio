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

function galleryFor(basePath: string) {
  return [1, 2, 3, 4, 5, 6].map((n) => `${basePath}/photo-${n}.jpg`);
}

const MUG_UID = "mug_product_msz_11-oz_mmat_ceramic-white_cl_4-0";
const MUG_DESCRIPTION = [
  "This beautiful ceramic mug is perfect for every moment of the day: a morning coffee, a hot chocolate, or any other hot drink you enjoy. The mug has a glossy white finish with a colored rim, interior, and handle. Prints come out beautifully with vivid colors, and the print keeps its quality and shine even after the microwave and dishwasher.",
  "Ceramic mug, 11 oz (325 ml) — microwave safe — colored rim, interior, and handle — white print area.",
];

export const shopProducts: ShopProduct[] = [
  {
    id: "mug-waveform",
    category: "mugs",
    name: "Mug Waveform",
    tagline: "Stereo · 48 kHz · 24 bit",
    description: MUG_DESCRIPTION,
    image: "/shop/mugs/waveform/photo-1.jpg",
    gallery: galleryFor("/shop/mugs/waveform"),
    designFile: "/shop/mugs/waveform/design.png",
    shippingCents: 499,
    variants: [
      { id: "default", label: "One size", priceCents: 1026, gelatoProductUid: MUG_UID },
    ],
  },
  {
    id: "mug-harmonic-ratios",
    category: "mugs",
    name: "Mug Harmonic Ratios",
    tagline: "2:1 · 3:2 · 4:3",
    description: MUG_DESCRIPTION,
    image: "/shop/mugs/harmonic-ratios/photo-1.jpg",
    gallery: galleryFor("/shop/mugs/harmonic-ratios"),
    designFile: "/shop/mugs/harmonic-ratios/design.png",
    shippingCents: 499,
    variants: [
      { id: "default", label: "One size", priceCents: 1026, gelatoProductUid: MUG_UID },
    ],
  },
  {
    id: "mug-side-a-side-b",
    category: "mugs",
    name: "Mug Side A / Side B",
    tagline: "33 1/3 RPM · 45 RPM",
    description: MUG_DESCRIPTION,
    image: "/shop/mugs/side-a-side-b/photo-1.jpg",
    gallery: galleryFor("/shop/mugs/side-a-side-b"),
    designFile: "/shop/mugs/side-a-side-b/design.png",
    shippingCents: 499,
    variants: [
      { id: "default", label: "One size", priceCents: 1026, gelatoProductUid: MUG_UID },
    ],
  },
  {
    id: "tshirt-high-bias",
    category: "t-shirts",
    name: "T-shirt High Bias",
    tagline: "Mixtape Vol. 08 — Type II",
    description: [
      "Known for its soft feel, this t-shirt is ideal for DTG printing.",
      "Seamless double-needle collar with a high stitch density for a smoother print surface. Includes a tear-away label for easy rebranding. Tubular fit for minimal torque. Available in a wide range of colors for various design needs.",
    ],
    image: "/shop/tshirt/photo-1.jpg",
    gallery: galleryFor("/shop/tshirt"),
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
      "A thick hoodie made from a soft 50% cotton, 50% polyester blend.",
      "Features a lined hood with matching drawstrings. Air-jet spun yarn gives it a soft feel and reduces pilling. Includes a pouch pocket, ribbed cuffs, and a spandex-lined waistband.",
    ],
    image: "/shop/hoodie-harmonic-ratios/photo-1.jpg",
    gallery: galleryFor("/shop/hoodie-harmonic-ratios"),
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
      "A comfortable, durable unisex hoodie made from a blend of organic cotton and recycled polyester.",
      "80% organic cotton, 20% recycled polyester. 3-thread construction for extra durability. Brushed lining for extra warmth and comfort. Drawstring with metal eyelets.",
    ],
    image: "/shop/hoodie-long-play/photo-1.jpg",
    gallery: galleryFor("/shop/hoodie-long-play"),
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
