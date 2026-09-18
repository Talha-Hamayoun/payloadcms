import type { MetadataRoute } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { absoluteUrl } from '@/utilities/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/products',
    '/categories',
    '/brands',
    '/bikes',
    '/modifications',
    '/blog',
    '/about',
    '/contact',
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
  }))

  try {
    const payload = await getPayloadClient()
    const [products, categories, brands, bikes, mods, posts] = await Promise.all([
      payload.find({ collection: 'products', where: { active: { equals: true } }, limit: 500, depth: 0 }),
      payload.find({ collection: 'categories', where: { active: { equals: true } }, limit: 200, depth: 0 }),
      payload.find({ collection: 'brands', where: { active: { equals: true } }, limit: 200, depth: 0 }),
      payload.find({ collection: 'bike-models', where: { active: { equals: true } }, limit: 200, depth: 0 }),
      payload.find({
        collection: 'modification-projects',
        where: { _status: { equals: 'published' } },
        limit: 200,
        depth: 0,
      }),
      payload.find({
        collection: 'blog-posts',
        where: { _status: { equals: 'published' } },
        limit: 200,
        depth: 0,
      }),
    ])

    const dynamic: MetadataRoute.Sitemap = [
      ...products.docs.map((p) => ({
        url: absoluteUrl(`/products/${p.slug}`),
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      })),
      ...categories.docs.map((c) => ({
        url: absoluteUrl(`/categories/${c.slug}`),
        lastModified: c.updatedAt ? new Date(c.updatedAt) : new Date(),
      })),
      ...brands.docs.map((b) => ({
        url: absoluteUrl(`/brands/${b.slug}`),
        lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
      })),
      ...bikes.docs.map((b) => ({
        url: absoluteUrl(`/bikes/${b.slug}`),
        lastModified: b.updatedAt ? new Date(b.updatedAt) : new Date(),
      })),
      ...mods.docs.map((m) => ({
        url: absoluteUrl(`/modifications/${m.slug}`),
        lastModified: m.updatedAt ? new Date(m.updatedAt) : new Date(),
      })),
      ...posts.docs.map((p) => ({
        url: absoluteUrl(`/blog/${p.slug}`),
        lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      })),
    ]

    return [...staticRoutes, ...dynamic]
  } catch {
    return staticRoutes
  }
}
