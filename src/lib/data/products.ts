import type { Sort, Where } from 'payload'

import { getPayloadClient } from '@/lib/payload'
import type { Product } from '@/payload-types'

export type ProductFilters = {
  search?: string
  category?: string
  brand?: string
  bike?: string
  type?: string
  minPrice?: number
  maxPrice?: number
  availability?: string
  featured?: boolean
  newArrival?: boolean
  bestSeller?: boolean
  sort?: string
  page?: number
  limit?: number
}

async function resolveIdBySlug(
  collection: 'categories' | 'brands' | 'bike-models',
  slug?: string,
): Promise<number | string | null> {
  if (!slug) return null
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
  })
  return result.docs[0]?.id ?? null
}

async function buildProductWhere(filters: ProductFilters): Promise<Where> {
  const and: Where[] = [{ active: { equals: true } }]

  if (filters.search) {
    and.push({
      or: [
        { name: { contains: filters.search } },
        { sku: { contains: filters.search } },
        { shortDescription: { contains: filters.search } },
      ],
    })
  }

  const [categoryId, brandId, bikeId] = await Promise.all([
    resolveIdBySlug('categories', filters.category),
    resolveIdBySlug('brands', filters.brand),
    resolveIdBySlug('bike-models', filters.bike),
  ])

  if (categoryId) {
    and.push({
      or: [{ category: { equals: categoryId } }, { subcategory: { equals: categoryId } }],
    })
  }

  if (brandId) {
    and.push({ brand: { equals: brandId } })
  }

  if (bikeId) {
    and.push({ compatibleModels: { contains: bikeId } })
  }

  if (filters.type) {
    and.push({ productType: { equals: filters.type } })
  }

  if (filters.availability) {
    and.push({ availability: { equals: filters.availability } })
  }

  if (filters.featured) and.push({ featured: { equals: true } })
  if (filters.newArrival) and.push({ newArrival: { equals: true } })
  if (filters.bestSeller) and.push({ bestSeller: { equals: true } })

  if (typeof filters.minPrice === 'number') {
    and.push({ regularPrice: { greater_than_equal: filters.minPrice } })
  }

  if (typeof filters.maxPrice === 'number') {
    and.push({ regularPrice: { less_than_equal: filters.maxPrice } })
  }

  return { and }
}

function buildSort(sort?: string): Sort {
  switch (sort) {
    case 'price-asc':
      return 'regularPrice'
    case 'price-desc':
      return '-regularPrice'
    case 'name':
      return 'name'
    case 'newest':
    default:
      return '-createdAt'
  }
}

export async function getProducts(filters: ProductFilters = {}) {
  const payload = await getPayloadClient()
  const page = filters.page && filters.page > 0 ? filters.page : 1
  const limit = filters.limit && filters.limit > 0 ? filters.limit : 12

  return payload.find({
    collection: 'products',
    where: await buildProductWhere(filters),
    sort: buildSort(filters.sort),
    page,
    limit,
    depth: 2,
  })
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: {
      and: [{ slug: { equals: slug } }, { active: { equals: true } }],
    },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] ?? null
}

export async function getFeaturedProducts(limit = 8) {
  return getProducts({ featured: true, limit })
}

export async function getNewArrivals(limit = 8) {
  return getProducts({ newArrival: true, limit, sort: 'newest' })
}

export async function getAccessoryProducts(limit = 8) {
  return getProducts({ type: 'accessory', limit })
}

export async function getRelatedProducts(product: Product, limit = 4) {
  const categoryId =
    typeof product.category === 'object' && product.category
      ? product.category.id
      : product.category

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'products',
    where: {
      and: [
        { active: { equals: true } },
        { category: { equals: categoryId } },
        { id: { not_equals: product.id } },
      ],
    },
    limit,
    depth: 2,
  })

  return result
}

export async function getCompatibleProducts(bikeSlug: string, categorySlug?: string, limit = 12) {
  return getProducts({
    bike: bikeSlug,
    category: categorySlug,
    limit,
  })
}
