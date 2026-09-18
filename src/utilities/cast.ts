import type {
  BlogCardData,
  BrandCardData,
  BikeCardData,
  CategoryCardData,
  ModificationCardData,
  ProductCardData,
} from '@/components/types'

export function asProductCards(docs: unknown): ProductCardData[] {
  return docs as ProductCardData[]
}

export function asCategoryCards(docs: unknown): CategoryCardData[] {
  return docs as CategoryCardData[]
}

export function asBrandCards(docs: unknown): BrandCardData[] {
  return docs as BrandCardData[]
}

export function asBikeCards(docs: unknown): BikeCardData[] {
  return docs as BikeCardData[]
}

export function asBlogCards(docs: unknown): BlogCardData[] {
  return docs as BlogCardData[]
}

export function asModificationCards(docs: unknown): ModificationCardData[] {
  return docs as ModificationCardData[]
}

export type SlugName = { slug: string; name: string }

export function asSlugNameList(docs: unknown): SlugName[] {
  return (docs as SlugName[]) ?? []
}
