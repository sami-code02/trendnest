# TrendNest

A Pinterest-driven affiliate storefront built with Next.js 15, React 19, TypeScript, Tailwind, and Prisma.

## What's built (Phase 1 — storefront foundation)

- **Full data model** in `prisma/schema.prisma`: products, categories, images, FAQs, related
  products, blog posts, wishlist, users/roles, affiliate click tracking, homepage sections
  (admin-editable), and import job auditing — ready for 100 to 100,000+ products.
- **Storefront pages**, all in `src/app`:
  - `/` — hero, trending, deals, categories, best sellers, editor's picks, new arrivals, blog
    preview, newsletter
  - `/category/[slug]` — banner, breadcrumbs, filter/sort UI, product grid, schema.org breadcrumbs
  - `/product/[slug]` — gallery, buy button, specs, pros/cons, FAQ (with FAQPage schema), related
    products, Product schema.org JSON-LD, social share (Pinterest/WhatsApp/Facebook/Twitter/copy link)
  - `/blog` and `/blog/[slug]` — Article schema, related-product cross-linking
  - `/search` — instant client-side search with category/rating filters
  - `/wishlist` — persisted via a `WishlistProvider` (localStorage for now; swappable for the
    `WishlistItem` Prisma model once auth is wired)
- **SEO**: `sitemap.ts`, `robots.ts`, per-page metadata, Open Graph/Twitter cards, JSON-LD for
  products, breadcrumbs, articles, and FAQs.
- **Design system**: brand tokens (`#111111` / `#FF4F7B` / `#7B61FF`) wired into
  `tailwind.config.ts`, Inter + Poppins via `next/font/google`, glass header, soft-shadow cards,
  Framer Motion hero.
- **Mock data layer** (`src/lib/mock-data.ts`) — 12 products across 12 categories, 5 blog posts —
  shaped 1:1 with the Prisma schema, so the storefront renders with zero DB setup. `prisma/seed.ts`
  loads this same data into Postgres once you connect one.

## Running it locally

```bash
npm install
cp .env.example .env        # fill in DATABASE_URL at minimum
npm run dev                 # storefront runs on mock data immediately, no DB needed
```

To move off mock data:

```bash
npm run prisma:migrate      # creates tables from schema.prisma
npm run seed                # loads the sample catalog into Postgres
```

Then replace the imports in `src/app/**/page.tsx` from `@/lib/mock-data` with real
`prisma.product.findMany(...)` / `prisma.category.findMany(...)` calls — the shapes already match.

## Not built yet (by design — see chat for phasing discussion)

This spec also called for an admin CMS, bulk CSV/XLSX import, NextAuth login, Cloudinary uploads,
GA4/Pinterest/Meta Pixel wiring, and rate limiting/CSRF hardening. Those are substantial pieces on
their own — each is a good next phase:

1. **Auth** — wire `next-auth` (Auth.js v5) using the `User`/`Account`/`Session` models already in
   the schema; gate `/admin` behind `role: ADMIN`.
2. **Admin dashboard** — CRUD screens for products/categories/blog/homepage sections, built on
   Server Actions against Prisma.
3. **Bulk import** — CSV/XLSX parser (`papaparse` / `xlsx`) writing to the `ImportJob` model with
   per-row validation and an error report.
4. **Cloudinary** — signed upload widget for product/blog images, replacing the placeholder image
   URLs in mock data.
5. **Analytics** — drop GA4/Pinterest Tag/Meta Pixel snippets into `layout.tsx` behind the env vars
   already stubbed in `.env.example`, plus a `/api/track-click` route backed by `AffiliateClick`.
6. **Deploy** — push to Vercel, attach a managed Postgres (Neon/Supabase/Vercel Postgres), set env
   vars, done.

Say which of these you want next and I'll build it into this same codebase.
