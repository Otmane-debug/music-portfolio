-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).

create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  cover_path text,        -- path inside the public "covers" bucket
  preview_path text not null,   -- path inside the public "tracks-public" bucket (streaming)
  download_path text not null,  -- path inside the private "tracks-private" bucket (auth required)
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

-- --- Storage buckets ---
-- Create these from the Supabase dashboard (Storage):
--   1. "tracks-public"  -> Public bucket, used for streaming previews.
--   2. "covers"         -> Public bucket, used for cover art.
--   3. "tracks-private"  -> Private bucket, used for gated downloads.
--
-- For "tracks-private", no public policy is needed: the app's server-side
-- API route uses the service-role key to mint a short-lived signed URL
-- only after checking the visitor is authenticated (see
-- src/app/api/download/[trackId]/route.ts).
