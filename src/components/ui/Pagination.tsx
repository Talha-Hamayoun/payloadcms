import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/utilities/cn'

export type PaginationProps = {
  page: number
  totalPages: number
  /** Current pathname, e.g. `/products` or `/blog` */
  pathname: string
  /** Existing query params (page key will be overwritten) */
  query?: Record<string, string | undefined>
  pageParam?: string
  className?: string
  siblingCount?: number
}

function range(start: number, end: number): number[] {
  const out: number[] = []
  for (let i = start; i <= end; i++) out.push(i)
  return out
}

function getPageNumbers(current: number, total: number, siblings: number): (number | 'ellipsis')[] {
  if (total <= 1) return [1]
  const left = Math.max(1, current - siblings)
  const right = Math.min(total, current + siblings)
  const pages: (number | 'ellipsis')[] = []

  if (left > 1) {
    pages.push(1)
    if (left > 2) pages.push('ellipsis')
  }

  pages.push(...range(left, right))

  if (right < total) {
    if (right < total - 1) pages.push('ellipsis')
    pages.push(total)
  }

  return pages
}

function buildHref(
  pathname: string,
  query: Record<string, string | undefined> | undefined,
  pageParam: string,
  page: number,
): string {
  const params = new URLSearchParams()
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (key === pageParam) continue
      if (value != null && value !== '') params.set(key, value)
    }
  }
  if (page > 1) params.set(pageParam, String(page))
  const qs = params.toString()
  return qs ? `${pathname}?${qs}` : pathname
}

export function Pagination({
  page,
  totalPages,
  pathname,
  query,
  pageParam = 'page',
  className,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(page, totalPages, siblingCount)
  const prevDisabled = page <= 1
  const nextDisabled = page >= totalPages

  const controlClass = (isActive?: boolean) =>
    cn(
      'inline-flex min-w-9 items-center justify-center rounded-md px-2 py-2 text-sm font-medium transition-colors',
      isActive ? 'bg-ink text-paper' : 'text-ink hover:bg-paper-muted',
    )

  const iconClass =
    'inline-flex h-9 w-9 items-center justify-center rounded-md border border-paper-muted text-ink hover:bg-paper-muted disabled:opacity-40'

  return (
    <nav aria-label="Pagination" className={cn('flex items-center justify-center gap-1', className)}>
      {prevDisabled ? (
        <span className={cn(iconClass, 'opacity-40')} aria-disabled>
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </span>
      ) : (
        <Link
          href={buildHref(pathname, query, pageParam, page - 1)}
          className={iconClass}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
        </Link>
      )}

      <div className="flex items-center gap-0.5 px-1">
        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`e-${i}`} className="px-2 text-steel" aria-hidden>
              …
            </span>
          ) : (
            <Link
              key={p}
              href={buildHref(pathname, query, pageParam, p)}
              className={controlClass(p === page)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </Link>
          ),
        )}
      </div>

      {nextDisabled ? (
        <span className={cn(iconClass, 'opacity-40')} aria-disabled>
          <ChevronRight className="h-4 w-4" aria-hidden />
        </span>
      ) : (
        <Link
          href={buildHref(pathname, query, pageParam, page + 1)}
          className={iconClass}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </nav>
  )
}
