import { cn } from '@/utilities/cn'

export type LoadingSkeletonProps = {
  className?: string
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-paper-muted', className)}
      aria-hidden
    />
  )
}

export type ProductCardSkeletonProps = {
  className?: string
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-steel-light/60 bg-white', className)}>
      <LoadingSkeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-4">
        <LoadingSkeleton className="h-3 w-1/3" />
        <LoadingSkeleton className="h-5 w-full" />
        <LoadingSkeleton className="h-5 w-2/3" />
        <LoadingSkeleton className="h-6 w-1/2" />
      </div>
    </div>
  )
}

export type ProductGridSkeletonProps = {
  count?: number
  className?: string
}

export function ProductGridSkeleton({ count = 8, className }: ProductGridSkeletonProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className,
      )}
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}
