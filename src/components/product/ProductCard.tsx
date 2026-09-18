import Image from 'next/image'
import Link from 'next/link'
import { Check } from 'lucide-react'

import { PriceDisplay } from '@/components/common/PriceDisplay'
import type { ProductCardData } from '@/components/types'
import { relationLabel } from '@/components/types'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utilities/cn'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'

export type ProductCardProps = {
  product: ProductCardData
  className?: string
  priority?: boolean
}

function firstProductImage(product: ProductCardData) {
  return product.images?.[0]?.image
}

export function ProductCard({ product, className, priority }: ProductCardProps) {
  const imageMedia = firstProductImage(product)
  const imageUrl = getMediaUrl(imageMedia ?? null)
  const alt = getMediaAlt(imageMedia ?? null, product.name)
  const categoryName = relationLabel(product.category)
  const regular = product.regularPrice
  const onSale =
    product.salePrice != null && product.salePrice > 0 && product.salePrice < regular

  const firstModel = product.compatibleModels?.find((m) => typeof m === 'object' && m)
  const fitLabel = relationLabel(firstModel)
  const extraFits =
    (product.compatibleModels?.filter((m) => m != null).length || 0) > 1
      ? ` +${(product.compatibleModels?.filter((m) => m != null).length || 0) - 1}`
      : ''

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden border border-border bg-surface transition-shadow duration-[var(--duration-fast)] hover:shadow-[var(--shadow-card)]',
        className,
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="image-zoom object-cover"
            priority={priority}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-steel">No image</div>
        )}
        <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1">
          {onSale ? <Badge variant="sale">Sale</Badge> : null}
          {!onSale && product.newArrival ? <Badge variant="new">New</Badge> : null}
          {!onSale && !product.newArrival && product.bestSeller ? (
            <Badge variant="featured">Best Seller</Badge>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {categoryName ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
            {categoryName}
          </p>
        ) : null}
        <h3 className="text-[0.95rem] font-semibold leading-snug text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="line-clamp-2 transition-colors hover:text-accent"
          >
            {product.name}
          </Link>
        </h3>

        {fitLabel ? (
          <p className="flex items-start gap-1.5 text-xs text-steel">
            <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
            <span>
              Fits {fitLabel}
              {extraFits}
            </span>
          </p>
        ) : null}

        <div className="mt-auto pt-3">
          <PriceDisplay regularPrice={regular} salePrice={product.salePrice} size="md" />
        </div>
      </div>
    </article>
  )
}
