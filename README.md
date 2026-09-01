# Sweet Cravings Bakery

A pink + black bakery website starter built with Next.js, TypeScript and Supabase.

## Current demo

The homepage is fully designed with:
- Festival announcement banner
- Pink/black bakery theme
- Hero section
- Featured cakes
- WhatsApp ordering buttons
- Gallery section
- Reviews section
- Opening offer popup (shown once per browser session)
- Starter admin pages for Products and Offers & Banners

The current homepage uses demo data so it works before Supabase is connected.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add your Supabase project URL and publishable key.
4. Run `supabase/schema.sql` in the Supabase SQL Editor.
5. Create a Storage bucket called `product-images`.

Supabase's current Next.js guidance uses `@supabase/ssr`, `createBrowserClient`, cookie-based auth, and `NEXT_PUBLIC_SUPABASE_URL` plus `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

## Next build steps

1. Connect public product queries to Supabase.
2. Add email/password admin login.
3. Protect `/admin`.
4. Add product CRUD.
5. Add product image upload to Storage.
6. Add banner CRUD + scheduling.
7. Store the bakery WhatsApp number in settings.
8. Replace demo images/content with the bakery's real content.
