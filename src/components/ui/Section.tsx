import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utilities/cn'

import { Container } from './Container'

export type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode
  tone?: 'default' | 'dark' | 'muted' | 'surface'
  container?: boolean
  narrow?: boolean
}

const toneStyles = {
  default: 'bg-paper text-ink',
  surface: 'bg-surface text-ink',
  dark: 'bg-ink text-surface',
  muted: 'bg-muted text-ink',
} as const

export function Section({
  children,
  className,
  tone = 'default',
  container = true,
  narrow,
  ...props
}: SectionProps) {
  const inner = container ? <Container narrow={narrow}>{children}</Container> : children

  return (
    <section className={cn('py-14 md:py-20', toneStyles[tone], className)} {...props}>
      {inner}
    </section>
  )
}
