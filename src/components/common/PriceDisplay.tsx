import { cn } from '@/utilities/cn'
import { formatPrice } from '@/utilities/format'

export type PriceDisplayProps = {
  regularPrice: number | null | undefined
  salePrice?: number | null
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showSavings?: boolean
}

const sizeStyles = {
  sm: { current: 'text-sm', compare: 'text-xs' },
  md: { current: 'text-base', compare: 'text-sm' },
  lg: { current: 'text-xl', compare: 'text-sm' },
} as const

export function PriceDisplay({
  regularPrice,
  salePrice,
  className,
  size = 'md',
  showSavings = false,
}: PriceDisplayProps) {
  const regular = regularPrice ?? 0
  const onSale =
    salePrice != null && salePrice > 0 && salePrice < regular

  const styles = sizeStyles[size]

  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-0.5', className)}>
      <span
        className={cn(
          'font-semibold tabular-nums tracking-tight',
          styles.current,
          onSale ? 'text-accent' : 'text-ink',
        )}
      >
        {formatPrice(onSale ? salePrice : regular)}
      </span>
      {onSale ? (
        <span className={cn('text-steel line-through tabular-nums', styles.compare)}>
          {formatPrice(regular)}
        </span>
      ) : null}
      {showSavings && onSale ? (
        <span className="text-xs font-medium uppercase tracking-wide text-success">
          Save {formatPrice(regular - (salePrice ?? 0))}
        </span>
      ) : null}
    </div>
  )
}
