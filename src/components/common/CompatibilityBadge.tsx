import { Check } from 'lucide-react'
import Link from 'next/link'

import type { RelationRef } from '@/components/types'
import { relationLabel } from '@/components/types'
import { cn } from '@/utilities/cn'

export type CompatibilityBadgeProps = {
  models?: RelationRef[] | null
  maxVisible?: number
  className?: string
  /** Compact chip (cards) vs full list (PDP) */
  variant?: 'chip' | 'list'
}

export function CompatibilityBadge({
  models,
  maxVisible = 2,
  className,
  variant = 'chip',
}: CompatibilityBadgeProps) {
  const entries =
    models
      ?.map((m) => {
        if (!m || typeof m !== 'object') return null
        const name = relationLabel(m, 'name')
        if (!name) return null
        const slug = 'slug' in m && typeof m.slug === 'string' ? m.slug : null
        return { name, slug }
      })
      .filter((n): n is { name: string; slug: string | null } => Boolean(n)) ?? []

  if (entries.length === 0) return null

  if (variant === 'list') {
    return (
      <div className={cn('border border-border bg-muted/60 p-4', className)}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
          Compatible bikes
        </p>
        <ul className="mt-3 space-y-2">
          {entries.map((entry) => (
            <li key={entry.slug || entry.name} className="flex items-center gap-2 text-sm text-ink">
              <Check className="size-4 shrink-0 text-success" aria-hidden />
              {entry.slug ? (
                <Link href={`/bikes/${entry.slug}`} className="font-medium hover:text-accent">
                  {entry.name}
                </Link>
              ) : (
                <span className="font-medium">{entry.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const visible = entries.slice(0, maxVisible)
  const extra = entries.length - visible.length

  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 bg-muted px-2 py-1 text-xs text-steel',
        className,
      )}
      title={entries.map((e) => e.name).join(', ')}
    >
      <Check className="size-3.5 shrink-0 text-success" aria-hidden />
      <span className="truncate">
        Fits {visible.map((e) => e.name).join(', ')}
        {extra > 0 ? ` +${extra}` : ''}
      </span>
    </span>
  )
}
