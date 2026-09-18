'use client'

import Image from 'next/image'
import { useState } from 'react'

import type { ProductImageRow } from '@/components/types'
import { cn } from '@/utilities/cn'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'

export type ProductGalleryProps = {
  images: ProductImageRow[]
  productName: string
  className?: string
}

export function ProductGallery({ images, productName, className }: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const slides = images.filter((row) => getMediaUrl(row.image ?? null))

  if (slides.length === 0) {
    return (
      <div className={cn('flex aspect-square items-center justify-center rounded-lg bg-paper-muted text-steel', className)}>
        No image
      </div>
    )
  }

  const main = slides[active] ?? slides[0]
  const mainUrl = getMediaUrl(main.image ?? null)!
  const mainAlt = getMediaAlt(main.image ?? null, productName)

  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative aspect-square overflow-hidden rounded-lg border border-steel-light/70 bg-white">
        <Image
          src={mainUrl}
          alt={mainAlt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4"
        />
      </div>
      {slides.length > 1 ? (
        <ul className="flex gap-2 overflow-x-auto pb-1">
          {slides.map((row, index) => {
            const url = getMediaUrl(row.image ?? null)
            if (!url) return null
            return (
              <li key={row.id ?? index}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    'relative size-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors',
                    index === active ? 'border-accent' : 'border-transparent hover:border-steel-light',
                  )}
                >
                  <Image src={url} alt="" fill sizes="64px" className="object-cover" />
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}
