import type { Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'
import type { BlogPost, ModificationProject } from '@/payload-types'

export async function getModificationProjects(filters: {
  featured?: boolean
  limit?: number
  page?: number
} = {}) {
  const payload = await getPayloadClient()
  const and: Where[] = [{ _status: { equals: 'published' } }]
  if (filters.featured) and.push({ featured: { equals: true } })

  return payload.find({
    collection: 'modification-projects',
    where: { and },
    sort: '-publishedDate',
    page: filters.page ?? 1,
    limit: filters.limit ?? 12,
    depth: 2,
  })
}

export async function getModificationBySlug(
  slug: string,
): Promise<ModificationProject | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'modification-projects',
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] ?? null
}

export async function getBlogPosts(filters: { limit?: number; page?: number } = {}) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'blog-posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedDate',
    page: filters.page ?? 1,
    limit: filters.limit ?? 9,
    depth: 2,
  })
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'blog-posts',
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] ?? null
}
