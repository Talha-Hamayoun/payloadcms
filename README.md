# MotoForge — Motorcycle Parts Platform

Professional motorcycle spare parts, accessories, decorations, and modification website built with **Next.js**, **Payload CMS**, and **PostgreSQL**.

## Requirements

- Node.js 20.9+ (22 recommended)
- pnpm 9 or 10
- PostgreSQL 16+ (Docker Compose included)
- Sharp-compatible OS build tools (usually automatic)

## Installation

```bash
pnpm install
cp .env.example .env
```

Edit `.env` and set:

- `MAIN_DATABASE_URL` — PostgreSQL connection string
- `PAYLOAD_SECRET` — long random secret
- `NEXT_PUBLIC_SERVER_URL` — public site URL (e.g. `http://localhost:3000`)

## PostgreSQL setup

Using Docker (recommended for local development):

```bash
docker compose up -d
```

Default connection (matches `.env` for local use):

```text
postgresql://postgres:NestPass123@localhost:5432/payloadcms?schema=public
```

Or point `MAIN_DATABASE_URL` at your own Postgres instance and create an empty database named `payloadcms`.

## Environment configuration

| Variable | Scope | Purpose |
| --- | --- | --- |
| `MAIN_DATABASE_URL` | Server only | Postgres connection |
| `PAYLOAD_SECRET` | Server only | Payload encryption/auth |
| `NEXT_PUBLIC_SERVER_URL` | Public | Canonical URLs, sitemap, OG |
| `PREVIEW_SECRET` | Server only | Optional draft preview |
| `R2_ACCOUNT_ID` | Server only | Cloudflare account ID (R2) |
| `R2_ACCESS_KEY_ID` | Server only | R2 API token access key |
| `R2_SECRET_ACCESS_KEY` | Server only | R2 API token secret |
| `R2_BUCKET_NAME` | Server only | R2 bucket name |
| `R2_PUBLIC_URL` | Server only* | Public media base URL (custom domain or `*.r2.dev`) |
| `R2_ENDPOINT` | Server only | Optional S3 API endpoint override |
| `R2_CLIENT_UPLOADS` | Server only | Set `1` to enable browser→R2 uploads (Vercel) |

\* `R2_PUBLIC_URL` is read on the server to build media URLs stored in Payload; the resulting `https://…` image URLs are public. Never put R2 secrets in `NEXT_PUBLIC_*` vars.

Never expose database or R2 credentials to the browser.

## Cloudflare R2 setup

Media uploads can use **Cloudflare R2** (S3-compatible) via `@payloadcms/storage-s3`. When R2 env vars are missing, Payload keeps using the local `media/` folder (existing local files are not deleted).

### 1. Create bucket & token

1. Open [Cloudflare Dashboard → R2](https://dash.cloudflare.com/?to=/:account/r2).
2. Create a bucket (e.g. `motoforge-media`).
3. **Settings → Public access**: enable an **R2.dev** subdomain **or** attach a **custom domain** (e.g. `media.example.com`).
4. **Manage R2 API Tokens** → create a token with **Object Read & Write** on that bucket.
5. Copy **Account ID**, **Access Key ID**, and **Secret Access Key**.

### 2. Environment variables

Add to `.env` / Vercel:

```env
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key
R2_SECRET_ACCESS_KEY=your_r2_secret_key
R2_BUCKET_NAME=motoforge-media
R2_PUBLIC_URL=https://media.example.com
```

`R2_PUBLIC_URL` must be the public base URL **without a trailing slash** (custom domain or `https://pub-xxxxx.r2.dev`).

Optional:

```env
# Defaults to https://<R2_ACCOUNT_ID>.r2.cloudflarestorage.com
R2_ENDPOINT=https://<ACCOUNT_ID>.r2.cloudflarestorage.com
# On Vercel, set to 1 and configure R2 CORS for PUT from your site origin
R2_CLIENT_UPLOADS=1
```

### 3. CORS (only if `R2_CLIENT_UPLOADS=1`)

In the R2 bucket CORS policy, allow `PUT` / `GET` from your site origin (e.g. `https://your-app.vercel.app` and `http://localhost:3000`).

### 4. Behaviour

- New Admin → Media uploads go to R2 under the `media/` prefix (Payload still unique-ifies filenames).
- Image sizes (`thumbnail`, `card`, `hero`) are generated then uploaded to R2.
- Postgres stores metadata + relationships; files live in R2.
- Frontend/`next/image` use the public URL from `R2_PUBLIC_URL`.
- Local `media/` files already on disk are left alone unless you migrate them manually.

After enabling R2 for the first time, run migrations if Payload reports a new `prefix` field on `media`:

```bash
pnpm migrate:create
pnpm migrate
```

## Development

```bash
pnpm dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Payload Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

On first boot, Payload pushes the schema to Postgres (`push` in development). Create the first admin user in `/admin` or run the seed script.

## Seed data

```bash
pnpm seed
```

Creates sample brands, bikes, categories, products, globals, and an admin user:

- Email: `admin@motoforge.local`
- Password: `Admin123!`

Seed is idempotent for most entities and is not required after production content exists.

## Useful commands

```bash
pnpm generate:types      # Generate src/payload-types.ts from Payload config
pnpm generate:importmap  # Refresh Payload admin import map
pnpm typecheck
pnpm lint
pnpm build
pnpm start
```

## Production build

```bash
pnpm build
pnpm start
```

For production Postgres, create and run migrations instead of relying on `push`:

```bash
pnpm payload migrate:create
pnpm payload migrate
```

## Project structure

```text
src/
  app/
    (frontend)/     # Public website (App Router)
    (payload)/      # Payload admin + REST/GraphQL API
    api/            # App route handlers (contact, search)
  collections/      # Payload collections
  globals/          # Header, Footer, Site Settings, Homepage
  components/       # UI, layout, product, home, forms
  lib/data/         # Typed Payload data-access layer
  fields/           # Shared fields (slug, SEO)
  access/           # Access control helpers
  seed/             # Dev seed script
  utilities/        # cn, format, media, seo helpers
  validations/      # Zod schemas
payload.config.ts   # (via src/payload.config.ts)
```

## Payload architecture

- Database adapter: `@payloadcms/db-postgres`
- Connection env: `MAIN_DATABASE_URL`
- Auth collection: `users` (roles: `admin`, `editor`)
- Public content filtered by `active` / draft `_status`
- Frontend reads CMS data through `src/lib/data/*` — do not query Payload ad hoc inside presentational components

## License

MIT
