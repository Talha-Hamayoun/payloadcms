import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { CategoryCardData } from '@/components/types'
import { cn } from '@/utilities/cn'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'

export type CategoryCardProps = {
  category: CategoryCardData
  className?: string
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  const imageUrl = getMediaUrl(category.image ?? null)
  const alt = getMediaAlt(category.image ?? null, category.name)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        'group relative block aspect-[4/5] overflow-hidden border border-border bg-ink text-surface sm:aspect-[5/6]',
        className,
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="image-zoom object-cover opacity-70"
        />
      ) : (
        <div className="absolute inset-0 bg-ink-soft" aria-hidden />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent"
        aria-hidden
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
        <h3 className="font-display text-base leading-tight md:text-lg">{category.name}</h3>
        <span className="inline-flex size-8 items-center justify-center rounded-md border border-white/20 bg-ink/40 text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white">
          <ArrowRight className="size-4" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
