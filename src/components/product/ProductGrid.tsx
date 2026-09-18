import type { ReactNode } from 'react'

import type { ProductCardData } from '@/components/types'
import { cn } from '@/utilities/cn'

import { ProductCard } from './ProductCard'

export type ProductGridProps = {
  products: ProductCardData[]
  className?: string
  empty?: ReactNode
}

export function ProductGrid({ products, className, empty }: ProductGridProps) {
  if (products.length === 0) {
    return empty ? <>{empty}</> : null
  }

  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className,
      )}
    >
      {products.map((product, index) => (
        <li key={product.id ?? product.slug} className="min-h-0">
          <ProductCard product={product} priority={index < 4} />
        </li>
      ))}
    </ul>
  )
}
