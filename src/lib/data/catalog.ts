import type { Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'
import type { Brand, Category, BikeModel } from '@/payload-types'

export async function getCategories(limit = 50) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'categories',
    where: { active: { equals: true } },
    sort: 'sortOrder',
    limit,
    depth: 1,
  })
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categories',
    where: {
      and: [{ slug: { equals: slug } }, { active: { equals: true } }],
    },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

export async function getBrands(limit = 50) {
  const payload = await getPayloadClient()
  return payload.find({
    collection: 'brands',
    where: { active: { equals: true } },
    sort: 'name',
    limit,
    depth: 1,
  })
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'brands',
    where: {
      and: [{ slug: { equals: slug } }, { active: { equals: true } }],
    },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

export async function getBikeModels(filters: { brand?: string; limit?: number } = {}) {
  const payload = await getPayloadClient()
  const and: Where[] = [{ active: { equals: true } }]

  if (filters.brand) {
    const brand = await getBrandBySlug(filters.brand)
    if (brand) {
      and.push({ brand: { equals: brand.id } })
    }
  }

  return payload.find({
    collection: 'bike-models',
    where: { and },
    sort: 'name',
    limit: filters.limit ?? 100,
    depth: 1,
  })
}

export async function getBikeModelBySlug(slug: string): Promise<BikeModel | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'bike-models',
    where: {
      and: [{ slug: { equals: slug } }, { active: { equals: true } }],
    },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}
