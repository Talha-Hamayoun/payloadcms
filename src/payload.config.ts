import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import dns from 'dns'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { Brands } from './collections/Brands'
import { BikeModels } from './collections/BikeModels'
import { Products } from './collections/Products'
import { ModificationProjects } from './collections/ModificationProjects'
import { BlogPosts } from './collections/BlogPosts'
import { BlogCategories, BlogTags } from './collections/BlogTaxonomy'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Footer, Header, Homepage, SiteSettings } from './globals'
import { createR2StoragePlugin } from './storage/r2'

// Neon returns AAAA + A records; prefer IPv4 to avoid ENETUNREACH timeouts on some networks
dns.setDefaultResultOrder('ipv4first')

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/** Normalize host/url env values into https origins for CSRF. */
function toOrigin(raw?: string | null): string | null {
  if (!raw) return null
  const trimmed = raw.trim().replace(/\/$/, '')
  if (!trimmed) return null
  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    return new URL(withProtocol).origin
  } catch {
    return null
  }
}

/**
 * Build serverURL + CSRF allowlist for local + Vercel.
 * If Origin is missing from csrf, Payload ignores the auth cookie and mutations
 * return "You are not allowed to perform this action."
 */
function resolvePublicOrigins() {
  const onVercel = Boolean(process.env.VERCEL)
  const configured = toOrigin(process.env.NEXT_PUBLIC_SERVER_URL)
  // Never prefer a localhost public URL while running on Vercel
  const preferred =
    onVercel && configured?.includes('localhost') ? null : configured

  const candidates = [
    preferred,
    toOrigin(process.env.VERCEL_PROJECT_PRODUCTION_URL),
    toOrigin(process.env.VERCEL_BRANCH_URL),
    toOrigin(process.env.VERCEL_URL),
    !onVercel ? toOrigin('http://localhost:3000') : null,
  ].filter(Boolean) as string[]

  const csrf = [...new Set(candidates)]
  const serverURL = csrf[0] || undefined
  return { serverURL, csrf }
}

const { serverURL, csrf } = resolvePublicOrigins()

export default buildConfig({
  serverURL,
  csrf,
  admin: {
    user: Users.slug,
    importMap: {
      // Keep the committed/generated map stable on Vercel; regenerate via `pnpm generate:importmap`
      autoGenerate: false,
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' · MotoForge CMS',
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Brands,
    BikeModels,
    Products,
    ModificationProjects,
    BlogPosts,
    BlogCategories,
    BlogTags,
    ContactSubmissions,
  ],
  globals: [Header, Footer, SiteSettings, Homepage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.MAIN_DATABASE_URL || '',
      // Neon cold-start / flaky networks need a longer connect window than pg default
      connectionTimeoutMillis: 30_000,
      idleTimeoutMillis: 20_000,
      max: 10,
      keepAlive: true,
    },
    // Use migrations for Neon / production; avoid auto-push on remote DBs
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
  plugins: [createR2StoragePlugin()],
})
