'use client'

import { SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'

import { FilterSidebar, type FilterSidebarProps } from '@/components/product/FilterSidebar'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { cn } from '@/utilities/cn'

export type MobileFiltersProps = FilterSidebarProps

export function MobileFilters(props: MobileFiltersProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <div className="sticky top-[4.5rem] z-20 -mx-4 border-y border-border bg-surface/95 px-4 py-3 backdrop-blur md:static md:mx-0 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <Button
          type="button"
          variant="outline"
          size="sm"
          leftIcon={<SlidersHorizontal className="size-4" />}
          onClick={() => setOpen(true)}
          className="w-full"
        >
          Filters & sort
        </Button>
      </div>

      <div
        className={cn(
          'fixed inset-0 z-50 bg-ink/50 transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-[min(100%,22rem)] overflow-y-auto border-r border-border bg-surface p-5 shadow-[var(--shadow-elevated)] transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out)]',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-hidden={!open}
        role="dialog"
        aria-label="Product filters"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-sm tracking-wider">Filters</h2>
          <IconButton label="Close filters" variant="ghost" size="sm" onClick={() => setOpen(false)}>
            <X />
          </IconButton>
        </div>
        <FilterSidebar {...props} />
      </div>
    </div>
  )
}
