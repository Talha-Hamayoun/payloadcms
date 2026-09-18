import { absoluteUrl } from '@/utilities/seo'
import { getMediaUrl } from '@/utilities/media'
import type { Media } from '@/payload-types'

export type BreadcrumbJsonLdItem = { name: string; path: string }

export function breadcrumbJsonLd(items: BreadcrumbJsonLdItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export type ProductJsonLdInput = {
  name: string
  description?: string | null
  slug: string
  sku?: string | null
  regularPrice: number
  salePrice?: number | null
  availability?: string | null
  image?: Media | string | number | null
}

export function productJsonLd(product: ProductJsonLdInput) {
  const price = product.salePrice && product.salePrice < product.regularPrice
    ? product.salePrice
    : product.regularPrice

  const availabilityMap: Record<string, string> = {
    'in-stock': 'https://schema.org/InStock',
    'out-of-stock': 'https://schema.org/OutOfStock',
    'pre-order': 'https://schema.org/PreOrder',
  }

  const imageUrl = getMediaUrl(product.image ?? null)

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || undefined,
    sku: product.sku || undefined,
    image: imageUrl ? [imageUrl] : undefined,
    offers: {
      '@type': 'Offer',
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: 'PKR',
      price: price,
      priceValidUntil: new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
      availability: product.availability
        ? availabilityMap[product.availability] || 'https://schema.org/InStock'
        : 'https://schema.org/InStock',
    },
  }
}

export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return JSON.stringify(data)
}
