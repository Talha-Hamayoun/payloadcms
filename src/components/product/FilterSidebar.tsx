'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useTransition } from 'react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import {
  AVAILABILITY_LABELS,
  PRODUCT_TYPE_LABELS,
  SORT_OPTIONS,
} from '@/constants'
import { buildProductsQuery, type ProductSearchParams } from '@/utilities/product-filters'
import { cn } from '@/utilities/cn'

export type FilterOption = { slug: string; name: string }

export type FilterSidebarProps = {
  params: ProductSearchParams
  categories: FilterOption[]
  brands: FilterOption[]
  bikes: FilterOption[]
  className?: string
}

export function FilterSidebar({ params, categories, brands, bikes, className }: FilterSidebarProps) {
  const router = useRouter()
  const [, startTransition] = useTransition()

  const push = useCallback(
    (overrides: Partial<ProductSearchParams>) => {
      const href = buildProductsQuery(params, { ...overrides, page: undefined })
      startTransition(() => router.push(href))
    },
    [params, router],
  )

  const clearAll = () => {
    startTransition(() => router.push('/products'))
  }

  return (
    <aside className={cn('space-y-5', className)} aria-label="Product filters">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-sm tracking-wider">Filters</h2>
        <Button type="button" variant="ghost" size="sm" onClick={clearAll}>
          Clear
        </Button>
      </div>

      <Select
        label="Sort"
        value={params.sort || 'newest'}
        onChange={(e) => push({ sort: e.target.value })}
        options={SORT_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
      />

      <Input
        label="Search"
        defaultValue={params.q || ''}
        placeholder="Name or SKU"
        onBlur={(e) => {
          const v = e.target.value.trim()
          if (v !== (params.q || '')) push({ q: v || undefined })
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.currentTarget.blur()
          }
        }}
      />

      <Select
        label="Category"
        value={params.category || ''}
        onChange={(e) => push({ category: e.target.value || undefined })}
        options={[
          { value: '', label: 'All categories' },
          ...categories.map((c) => ({ value: c.slug, label: c.name })),
        ]}
      />

      <Select
        label="Brand"
        value={params.brand || ''}
        onChange={(e) => push({ brand: e.target.value || undefined, bike: undefined })}
        options={[
          { value: '', label: 'All brands' },
          ...brands.map((b) => ({ value: b.slug, label: b.name })),
        ]}
      />

      <Select
        label="Bike model"
        value={params.bike || ''}
        onChange={(e) => push({ bike: e.target.value || undefined })}
        options={[
          { value: '', label: 'All models' },
          ...bikes.map((b) => ({ value: b.slug, label: b.name })),
        ]}
      />

      <Select
        label="Product type"
        value={params.type || ''}
        onChange={(e) => push({ type: e.target.value || undefined })}
        options={[
          { value: '', label: 'All types' },
          ...Object.entries(PRODUCT_TYPE_LABELS).map(([value, label]) => ({ value, label })),
        ]}
      />

      <Select
        label="Availability"
        value={params.availability || ''}
        onChange={(e) => push({ availability: e.target.value || undefined })}
        options={[
          { value: '', label: 'Any' },
          ...Object.entries(AVAILABILITY_LABELS).map(([value, label]) => ({ value, label })),
        ]}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Min price"
          type="number"
          min={0}
          defaultValue={params.minPrice || ''}
          onBlur={(e) => push({ minPrice: e.target.value || undefined })}
        />
        <Input
          label="Max price"
          type="number"
          min={0}
          defaultValue={params.maxPrice || ''}
          onBlur={(e) => push({ maxPrice: e.target.value || undefined })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2 text-sm normal-case tracking-normal">
          <input
            type="checkbox"
            checked={params.featured === '1' || params.featured === 'true'}
            onChange={(e) => push({ featured: e.target.checked ? '1' : undefined })}
            className="size-4 rounded border-steel-light accent-accent"
          />
          Featured only
        </label>
        <label className="flex items-center gap-2 text-sm normal-case tracking-normal">
          <input
            type="checkbox"
            checked={params.new === '1' || params.new === 'true'}
            onChange={(e) => push({ new: e.target.checked ? '1' : undefined })}
            className="size-4 rounded border-steel-light accent-accent"
          />
          New arrivals
        </label>
      </div>
    </aside>
  )
}
