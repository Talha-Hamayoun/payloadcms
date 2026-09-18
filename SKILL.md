# MotoForge Project Skill

Instructions for AI-assisted and human development on this repository.

## Project purpose

MotoForge is a production motorcycle commerce/content platform covering spare parts, accessories, decorations, modification parts, bike compatibility, brands, models, blogs, and modification projects. Content is managed in Payload CMS and rendered by a Next.js App Router frontend.

## Technology stack

- Next.js (App Router) + TypeScript
- Payload CMS 3.x (embedded in Next.js)
- PostgreSQL via `@payloadcms/db-postgres`
- Tailwind CSS 4
- Zod + React Hook Form (interactive forms)
- Lucide React
- `next/image`

## Folder architecture

- `src/app/(frontend)` — public site
- `src/app/(payload)` — admin UI + Payload API routes
- `src/collections` — Payload collections
- `src/globals` — Header, Footer, Site Settings, Homepage
- `src/lib/data` — **only** place for Payload queries used by the frontend
- `src/components` — UI by domain (`ui`, `layout`, `product`, `home`, `forms`, `common`)
- `src/access`, `src/fields`, `src/utilities`, `src/validations`, `src/constants`

Do not invent parallel folder conventions.

## Frontend UI rules (critical)

- Always follow `STYLEGUIDE.md` and tokens in `globals.css`.
- Always reuse existing UI components (`Button`, `Input`, `ProductCard`, `Section`, `Header`, etc.).
- Never introduce random colors or one-off design systems on a single page.
- Do not duplicate components — improve in place.
- Keep CMS content dynamic; never hardcode catalog content.
- Server Components by default; Client Components only for interaction (menus, filters, forms, search).
- Do not modify Payload schemas or APIs for purely visual changes.
- There is **no** custom storefront dashboard — use Payload Admin. Do not invent cart/wishlist/ratings.
- New pages must match header/footer chrome, section spacing, and card patterns.

## Payload architecture

- Config: `src/payload.config.ts`
- DB env: `MAIN_DATABASE_URL` (server-only)
- Auth users with roles `admin` | `editor`
- Public collections gate on `active: true`
- Draft collections (`blog-posts`, `modification-projects`) gate on `_status: published`
- Shared SEO group + slug hooks live in `src/fields/seo.ts`
- Access helpers live in `src/access`

## Database conventions

- Use Postgres adapter pool `connectionString: process.env.MAIN_DATABASE_URL`
- Dev may use schema `push`; production should use migrations
- Never commit real secrets; keep placeholders in `.env.example`

## Collection conventions

- `slug` unique + indexed
- Relationship filters resolve slug → id in the data layer (Postgres-friendly)
- Product compatibility uses `compatibleModels` hasMany → `bike-models`
- Prefer tabs for large collections (Products)

## Component conventions

- Server Components by default
- `'use client'` only for browser APIs, forms, menus, debounced search, URL-driven filter widgets
- Reuse `Container`, `Section`, `ProductCard`, etc. — no one-off duplicates
- Props typed; avoid prop drilling of entire CMS documents when a narrow view model works

## Naming conventions

- Collections: PascalCase files, kebab-case slugs
- Components: PascalCase
- Data accessors: `getX` / `getXBySlug`
- CSS tokens: semantic (`ink`, `accent`, `surface`, `border`)

## TypeScript rules

- `strict` enabled
- Prefer generated types from `payload generate:types`
- Avoid `any`; narrow Payload relationship unions (`string | number | object`)

## Styling rules

Follow `STYLEGUIDE.md`. Use Tailwind tokens from `globals.css` `@theme`. No Inter/Roboto/purple SaaS aesthetics. Prefer hairline borders over heavy shadows. Oswald only via `.font-display`.

## Responsive rules

Mobile-first. Filters collapse to mobile sheet; navigation uses a dedicated mobile drawer. Do not shrink desktop chrome. Test 375 / 768 / 1024 / 1440.

## Accessibility

Semantic HTML, labeled inputs, keyboard menus, visible focus, meaningful image alt text, `prefers-reduced-motion`.

## SEO rules

- `buildMetadata` helper for dynamic pages
- CMS SEO fields override defaults
- `sitemap.ts` + `robots.ts`
- Product/Article JSON-LD where implemented

## Data fetching conventions

- All CMS reads go through `src/lib/data/*`
- Use `revalidate` (ISR) ~60s for public listings (literal `60`, not imported constants)
- Paginate product queries; never load the full catalog client-side to filter

## Error handling

- Route `error.tsx` / `not-found.tsx`
- Empty states for zero results
- API routes return structured Zod validation errors

## Validation

- Zod schemas in `src/validations`
- Server routes re-validate; never trust client-only checks

## Security rules

- Payload access control is authoritative
- `MAIN_DATABASE_URL` / `PAYLOAD_SECRET` server-only
- Contact form creates documents with create-only public access
- Uploads limited by mime/size in Media collection + Payload upload limits

## What not to do

- Do not hardcode products/brands/bikes in UI (seed/CMS only)
- Do not query Payload inside deep presentational components
- Do not add duplicate mobile/desktop page trees
- Do not introduce MongoDB adapters or deprecated Payload 2 patterns
- Do not break filters, search, or WhatsApp CTAs when restyling
