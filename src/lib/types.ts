export type Track = {
  id: string;
  title: string;
  description: string | null;
  cover_path: string | null;
  preview_path: string;
  download_path: string;
  purchase_link: string | null;
  stripe_price_id: string | null;
  stripe_product_id: string | null;
  duration_seconds: number | null;
  created_at: string;
};

export type GearSpec = {
  label: string;
  value: string;
};

export type Gear = {
  id: string;
  name: string;
  category: string | null;
  description: string | null;
  image_path: string | null;
  specs: GearSpec[] | null;
  sort_order: number;
  created_at: string;
};
