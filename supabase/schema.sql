-- Sweet Cravings Bakery - Supabase schema
-- Run this in Supabase SQL Editor after creating your project.

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null default 0,
  category text,
  image_url text,
  available boolean not null default true,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  button_text text default 'Order Now',
  is_active boolean not null default false,
  show_popup boolean not null default false,
  show_home_banner boolean not null default true,
  start_date timestamptz,
  end_date timestamptz,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.banners enable row level security;

-- Public can read products that are available.
create policy "Public can read available products"
on public.products for select
using (available = true);

-- Public can read active banners.
create policy "Public can read active banners"
on public.banners for select
using (
  is_active = true
  and (start_date is null or start_date <= now())
  and (end_date is null or end_date >= now())
);

-- IMPORTANT:
-- Add admin-only policies after you create the admin account.
-- For the first version, do not expose insert/update/delete to anon users.
-- We'll add an admin authorization mechanism in the next build step.

-- Storage:
-- Create a bucket named "product-images" in Supabase Storage.
-- Keep the bucket public for product display, but protect uploads/deletes
-- with Storage RLS policies for your admin user.
