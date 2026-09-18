import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { BikeCardData } from '@/components/types'
import { relationLabel } from '@/components/types'
import { cn } from '@/utilities/cn'
import { yearRange } from '@/utilities/format'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'

export type BikeCardProps = {
  bike: BikeCardData
  className?: string
}

export function BikeCard({ bike, className }: BikeCardProps) {
  const imageUrl = getMediaUrl(bike.image ?? null)
  const alt = getMediaAlt(bike.image ?? null, bike.name)
  const brandName = relationLabel(bike.brand)
  const years = yearRange(bike.yearFrom, bike.yearTo)

  return (
    <Link
      href={`/bikes/${bike.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden border border-border bg-surface transition-shadow hover:shadow-[var(--shadow-card)]',
        className,
      )}
    >
      <div className="relative aspect-[16/10] bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="image-zoom object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-steel">No image</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {brandName ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">{brandName}</p>
        ) : null}
        <h3 className="text-base font-semibold text-ink group-hover:text-accent">{bike.name}</h3>
        <p className="text-sm text-steel">
          {[bike.engineCapacity, years].filter(Boolean).join(' · ')}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-3 text-xs font-semibold uppercase tracking-wider text-accent">
          View compatible
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
