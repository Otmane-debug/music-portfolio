export type Track = {
  id: string;
  title: string;
  description: string | null;
  cover_path: string | null;
  preview_path: string;
  download_path: string;
  purchase_link: string | null;
  stripe_price_id: string | null;
  created_at: string;
};
