import type { ProductFilters } from '@/lib/data/products'

export type ProductSearchParams = {
  brand?: string
  bike?: string
  category?: string
  type?: string
  q?: string
  sort?: string
  page?: string
  minPrice?: string
  maxPrice?: string
  availability?: string
  featured?: string
  new?: string
}

export function parseProductSearchParams(
  params: ProductSearchParams,
): ProductFilters & { page: number } {
  const page = Math.max(1, parseInt(params.page || '1', 10) || 1)
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined

  return {
    brand: params.brand || undefined,
    bike: params.bike || undefined,
    category: params.category || undefined,
    type: params.type || undefined,
    search: params.q || undefined,
    sort: params.sort || 'newest',
    page,
    minPrice: minPrice != null && !Number.isNaN(minPrice) ? minPrice : undefined,
    maxPrice: maxPrice != null && !Number.isNaN(maxPrice) ? maxPrice : undefined,
    availability: params.availability || undefined,
    featured: params.featured === '1' || params.featured === 'true',
    newArrival: params.new === '1' || params.new === 'true',
  }
}

export function buildProductsQuery(
  filters: ProductSearchParams,
  overrides: Partial<ProductSearchParams> = {},
): string {
  const merged = { ...filters, ...overrides }
  const sp = new URLSearchParams()

  const set = (key: keyof ProductSearchParams, value?: string) => {
    if (value) sp.set(key, value)
  }

  set('brand', merged.brand)
  set('bike', merged.bike)
  set('category', merged.category)
  set('type', merged.type)
  set('q', merged.q)
  if (merged.sort && merged.sort !== 'newest') set('sort', merged.sort)
  set('minPrice', merged.minPrice)
  set('maxPrice', merged.maxPrice)
  set('availability', merged.availability)
  if (merged.featured === '1' || merged.featured === 'true') sp.set('featured', '1')
  if (merged.new === '1' || merged.new === 'true') sp.set('new', '1')
  if (merged.page && merged.page !== '1') sp.set('page', merged.page)

  const qs = sp.toString()
  return qs ? `/products?${qs}` : '/products'
}
