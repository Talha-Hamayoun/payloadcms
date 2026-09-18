import type { Metadata } from 'next'
import Link from 'next/link'
import { X } from 'lucide-react'

import { MobileFilters } from '@/components/product/MobileFilters'
import { FilterSidebar } from '@/components/product/FilterSidebar'
import { ProductGrid } from '@/components/product/ProductGrid'
import { asProductCards, asSlugNameList } from '@/utilities/cast'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Pagination } from '@/components/ui/Pagination'
import { SITE_NAME, PRODUCT_TYPE_LABELS } from '@/constants'
import { getBrands, getBikeModels, getCategories } from '@/lib/data/catalog'
import { getProducts } from '@/lib/data/products'
import { buildMetadata } from '@/utilities/seo'
import {
  buildProductsQuery,
  parseProductSearchParams,
  type ProductSearchParams,
} from '@/utilities/product-filters'

export const revalidate = 60

type PageProps = {
  searchParams: Promise<ProductSearchParams>
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: `Shop parts · ${SITE_NAME}`,
    description: 'Browse motorcycle spare parts, accessories, and upgrades with fitment filters.',
    path: '/products',
  })
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const raw = await searchParams
  const filters = parseProductSearchParams(raw)

  const [result, categories, brands, bikes] = await Promise.all([
    getProducts(filters),
    getCategories(),
    getBrands(),
    getBikeModels({ brand: raw.brand, limit: 100 }),
  ])

  const catOpts = asSlugNameList(categories.docs)
  const brandOpts = asSlugNameList(brands.docs)
  const bikeOpts = asSlugNameList(bikes.docs)

  const paginationQuery: Record<string, string | undefined> = {
    q: raw.q,
    category: raw.category,
    brand: raw.brand,
    bike: raw.bike,
    type: raw.type,
    sort: raw.sort,
    minPrice: raw.minPrice,
    maxPrice: raw.maxPrice,
    availability: raw.availability,
    featured: raw.featured,
    new: raw.new,
  }

  const chips: { label: string; clearHref: string }[] = []
  if (raw.q) {
    chips.push({ label: `Search: ${raw.q}`, clearHref: buildProductsQuery(raw, { q: undefined }) })
  }
  if (raw.category) {
    const name = catOpts.find((c) => c.slug === raw.category)?.name || raw.category
    chips.push({ label: name, clearHref: buildProductsQuery(raw, { category: undefined }) })
  }
  if (raw.brand) {
    const name = brandOpts.find((b) => b.slug === raw.brand)?.name || raw.brand
    chips.push({ label: name, clearHref: buildProductsQuery(raw, { brand: undefined }) })
  }
  if (raw.bike) {
    const name = bikeOpts.find((b) => b.slug === raw.bike)?.name || raw.bike
    chips.push({ label: name, clearHref: buildProductsQuery(raw, { bike: undefined }) })
  }
  if (raw.type) {
    chips.push({
      label: PRODUCT_TYPE_LABELS[raw.type] || raw.type,
      clearHref: buildProductsQuery(raw, { type: undefined }),
    })
  }

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Products' }]} className="mb-6" />

      <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Catalog</p>
          <h1 className="mt-1 font-display text-3xl md:text-4xl">Products</h1>
          <p className="mt-1 text-sm text-steel">{result.totalDocs} products</p>
        </div>
      </div>

      {chips.length > 0 ? (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <Link
              key={chip.label}
              href={chip.clearHref}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-ink hover:border-ink"
            >
              {chip.label}
              <X className="size-3" aria-hidden />
              <span className="sr-only">Remove filter</span>
            </Link>
          ))}
          <Link href="/products" className="text-xs font-semibold uppercase tracking-wider text-accent">
            Clear all
          </Link>
        </div>
      ) : null}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-28 border border-border bg-surface p-5">
            <FilterSidebar
              params={raw}
              categories={catOpts}
              brands={brandOpts}
              bikes={bikeOpts}
            />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <MobileFilters
            params={raw}
            categories={catOpts}
            brands={brandOpts}
            bikes={bikeOpts}
          />

          <ProductGrid
            products={asProductCards(result.docs)}
            className="mt-6 lg:mt-0"
            empty={
              <EmptyState
                title="No products found"
                description="Try adjusting filters or search terms."
                action={
                  <Button href="/products" variant="outline" size="sm">
                    Clear filters
                  </Button>
                }
              />
            }
          />

          <Pagination
            page={result.page ?? filters.page}
            totalPages={result.totalPages}
            pathname="/products"
            query={paginationQuery}
            className="mt-10"
          />
        </div>
      </div>
    </Container>
  )
}
