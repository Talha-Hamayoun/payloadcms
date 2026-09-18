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

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
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
