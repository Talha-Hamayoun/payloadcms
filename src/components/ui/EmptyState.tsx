import type { LucideIcon } from 'lucide-react'
import { PackageOpen } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/utilities/cn'

export type EmptyStateProps = {
  title: string
  description?: string
  icon?: LucideIcon
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  icon: Icon = PackageOpen,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-dashed border-steel-light bg-white px-6 py-14 text-center',
        className,
      )}
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-md bg-paper-muted text-steel">
        <Icon className="size-7" aria-hidden />
      </div>
      <h3 className="text-lg normal-case tracking-normal">{title}</h3>
      {description ? <p className="mt-2 max-w-md text-sm text-steel">{description}</p> : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
