import Image from 'next/image'
import Link from 'next/link'

import type { BrandCardData } from '@/components/types'
import { cn } from '@/utilities/cn'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'

export type BrandCardProps = {
  brand: BrandCardData
  className?: string
}

export function BrandCard({ brand, className }: BrandCardProps) {
  const logoUrl = getMediaUrl(brand.logo ?? null)
  const alt = getMediaAlt(brand.logo ?? null, `${brand.name} logo`)

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className={cn(
        'group flex aspect-square flex-col items-center justify-center gap-3 border border-border bg-surface p-4 text-center transition-colors hover:border-ink',
        className,
      )}
    >
      <div className="flex h-14 w-full items-center justify-center">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={alt}
            width={140}
            height={56}
            className="max-h-14 w-auto object-contain"
          />
        ) : (
          <span className="font-display text-lg tracking-widest text-ink">{brand.name}</span>
        )}
      </div>
      <span className="text-xs font-semibold uppercase tracking-wider text-steel group-hover:text-ink">
        {brand.name}
      </span>
    </Link>
  )
}
