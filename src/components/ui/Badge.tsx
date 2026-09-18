import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utilities/cn'

const variantStyles = {
  default: 'bg-ink-soft text-paper border border-ink-soft/80',
  sale: 'bg-accent text-white border border-accent',
  new: 'bg-ink text-paper border border-ink',
  featured: 'bg-paper text-ink border border-steel-light',
  stock: 'bg-success/10 text-success border border-success/30',
} as const

export type BadgeVariant = keyof typeof variantStyles

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
  children: ReactNode
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
