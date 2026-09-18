import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

import { cn } from '@/utilities/cn'

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type BreadcrumbProps = {
  items: BreadcrumbItem[]
  className?: string
  showHome?: boolean
}

export function Breadcrumb({ items, className, showHome = true }: BreadcrumbProps) {
  const crumbs: BreadcrumbItem[] = showHome
    ? [{ label: 'Home', href: '/' }, ...items]
    : items

  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1 text-steel">
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight className="size-3.5 shrink-0 text-steel-light" aria-hidden />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 hover:text-ink transition-colors"
                >
                  {index === 0 && showHome ? <Home className="size-3.5" aria-hidden /> : null}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(isLast && 'font-medium text-ink')}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
