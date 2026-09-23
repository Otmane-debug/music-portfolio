-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).

create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  cover_path text,        -- path inside the public "covers" bucket
  preview_path text not null,   -- path inside the public "tracks-public" bucket (streaming)
  download_path text not null,  -- path inside the private "tracks-private" bucket (auth required)
  purchase_link text,     -- external checkout URL (Stripe Payment Link, Gumroad, etc.)
  stripe_price_id text,   -- unused for verification (kept for reference)
  stripe_product_id text, -- Stripe Product ID (prod_...) used to verify payment server-side
  duration_seconds integer, -- track length in seconds, shown in the catalog
  created_at timestamptz not null default now()
);

alter table public.tracks enable row level security;

-- Anyone can read track metadata (title, description, streaming path).
create policy "Tracks are publicly readable"
  on public.tracks for select
  using (true);

-- Only you should be able to insert/update/delete tracks — do this from the
-- Supabase dashboard (Table editor) while logged in as the project owner,
-- or via the service-role key from a trusted script. No write policy is
-- granted to regular users on purpose.

-- First/last name are collected at sign-up and stored on the auth user
-- itself (auth.users.raw_user_meta_data), via the `data` option passed to
-- signInWithOtp() — no separate profiles table needed for that.

create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  track_id uuid not null references public.tracks(id) on delete cascade,
  stripe_session_id text not null unique,
  created_at timestamptz not null default now()
);

alter table public.purchases enable row level security;

-- Users can only see their own purchase history.
create policy "Users can view their own purchases"
  on public.purchases for select
  using (auth.uid() = user_id);

-- No insert/update/delete policy: rows are only written by the
-- service-role key, from the server, after Stripe payment is verified
-- (see src/app/api/purchase-download/[trackId]/route.ts).

create table if not exists public.shop_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  stripe_session_id text not null unique,
  gelato_order_id text,
  product_id text not null,
  product_name text not null,
  variant_label text not null,
  quantity integer not null default 1,
  amount_total_cents integer not null,
  fulfillment_status text not null default 'pending',
  refunded boolean not null default false,
  created_at timestamptz not null default now()
);

-- If shop_orders already existed from an earlier run of this file, add the
-- two newer columns without touching existing rows.
alter table public.shop_orders
  add column if not exists fulfillment_status text not null default 'pending';
alter table public.shop_orders
  add column if not exists refunded boolean not null default false;

alter table public.shop_orders enable row level security;

-- Users can only see their own shop orders.
create policy "Users can view their own shop orders"
  on public.shop_orders for select
  using (auth.uid() = user_id);

-- No insert/update/delete policy: rows are only written by the
-- service-role key, from the server, after Stripe payment is verified
-- (see src/app/api/shop/complete/route.ts).

create table if not exists public.gear (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,          -- e.g. "Guitar", "Amp", "Interface", "Mic", "Headphones"
  description text,
  image_path text,        -- path inside the public "gear" bucket
  specs jsonb,            -- ordered list of {label, value} pairs, e.g. [{"label":"Body","value":"Basswood"}]
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gear enable row level security;

create policy "Gear is publicly readable"
  on public.gear for select
  using (true);

-- --- Storage buckets ---
-- Create these from the Supabase dashboard (Storage):
--   1. "tracks-public"  -> Public bucket, used for streaming previews.
--   2. "covers"         -> Public bucket, used for cover art.
--   3. "tracks-private"  -> Private bucket, used for gated downloads.
--   4. "gear"           -> Public bucket, used for equipment photos.
--
-- For "tracks-private", no public policy is needed: the app's server-side
-- API route uses the service-role key to mint a short-lived signed URL
-- only after checking the visitor is authenticated (see
-- src/app/api/download/[trackId]/route.ts).
