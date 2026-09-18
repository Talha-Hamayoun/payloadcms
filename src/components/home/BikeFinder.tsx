'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'

import type { CategoryCardData } from '@/components/types'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { cn } from '@/utilities/cn'

export type BikeFinderBrand = { name: string; slug: string }
export type BikeFinderModel = { name: string; slug: string; brandSlug?: string | null }

export type BikeFinderProps = {
  brands: BikeFinderBrand[]
  models: BikeFinderModel[]
  categories: CategoryCardData[]
  className?: string
}

export function BikeFinder({ brands, models, categories, className }: BikeFinderProps) {
  const router = useRouter()
  const [brand, setBrand] = useState('')
  const [bike, setBike] = useState('')
  const [category, setCategory] = useState('')

  const filteredModels = useMemo(() => {
    if (!brand) return models
    return models.filter((m) => m.brandSlug === brand)
  }, [brand, models])

  const onFind = () => {
    const sp = new URLSearchParams()
    if (brand) sp.set('brand', brand)
    if (bike) sp.set('bike', bike)
    if (category) sp.set('category', category)
    const qs = sp.toString()
    router.push(qs ? `/products?${qs}` : '/products')
  }

  return (
    <div
      className={cn(
        'border border-border bg-surface p-6 shadow-[var(--shadow-card)] md:p-8',
        className,
      )}
    >
      <div className="mb-6 md:mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Fitment first</p>
        <h2 className="mt-2 font-display text-2xl md:text-3xl">Find parts for your bike</h2>
        <p className="mt-2 max-w-xl text-sm text-steel md:text-base">
          Select brand, model, and category to see compatible products.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:items-end">
        <Select
          label="Brand"
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value)
            setBike('')
          }}
          options={[
            { value: '', label: 'Select brand' },
            ...brands.map((b) => ({ value: b.slug, label: b.name })),
          ]}
        />
        <Select
          label="Bike model"
          value={bike}
          onChange={(e) => setBike(e.target.value)}
          disabled={!brand}
          options={[
            { value: '', label: brand ? 'Select model' : 'Choose brand first' },
            ...filteredModels.map((m) => ({ value: m.slug, label: m.name })),
          ]}
        />
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: '', label: 'Any category' },
            ...categories.map((c) => ({ value: c.slug, label: c.name })),
          ]}
        />
        <Button
          type="button"
          size="lg"
          className="w-full"
          onClick={onFind}
          rightIcon={<ArrowRight />}
        >
          Find parts
        </Button>
      </div>
    </div>
  )
}
