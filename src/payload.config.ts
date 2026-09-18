import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
    },
  }),
  sharp,
  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
})
