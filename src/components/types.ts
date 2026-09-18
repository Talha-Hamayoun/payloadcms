import type { Media } from '@/payload-types'

export type RelationRef =
  | string
  | number
  | null
  | undefined
  | { id?: string | number; name?: string; slug?: string; title?: string }

export type ProductImageRow = { image?: Media | string | number | null; id?: string | null }

export type ProductCardData = {
  id?: string | number
  name: string
  slug: string
  regularPrice: number
  salePrice?: number | null
  featured?: boolean | null
  newArrival?: boolean | null
  bestSeller?: boolean | null
  availability?: 'in-stock' | 'out-of-stock' | 'pre-order' | string | null
  images?: ProductImageRow[] | null
  category?: RelationRef
  brand?: RelationRef
  compatibleModels?: RelationRef[] | null
}

export type CategoryCardData = {
  id?: string | number
  name: string
  slug: string
  description?: string | null
  image?: Media | string | number | null
}

export type BrandCardData = {
  id?: string | number
  name: string
  slug: string
  description?: string | null
  logo?: Media | string | number | null
}

export type BikeCardData = {
  id?: string | number
  name: string
  slug: string
  engineCapacity?: string | null
  yearFrom?: number | null
  yearTo?: number | null
  image?: Media | string | number | null
  brand?: RelationRef
}

export type BlogCardData = {
  id?: string | number
  title: string
  slug: string
  excerpt: string
  publishedDate?: string | null
  featuredImage?: Media | string | number | null
  categories?: RelationRef[] | null
}

export type ModificationCardData = {
  id?: string | number
  title: string
  slug: string
  afterImage?: Media | string | number | null
  beforeImage?: Media | string | number | null
  bikeBrand?: RelationRef
  bikeModel?: RelationRef
  featured?: boolean | null
}

export type NavLink = {
  label: string
  href: string
  openInNewTab?: boolean | null
}

export type FooterColumn = {
  title: string
  links?: NavLink[] | null
}

export function relationLabel(ref: RelationRef, field: 'name' | 'title' = 'name'): string | null {
  if (!ref || typeof ref === 'string' || typeof ref === 'number') return null
  const value = ref[field]
  return value ? String(value) : null
}
