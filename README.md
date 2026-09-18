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

Never expose database credentials to the browser.

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
