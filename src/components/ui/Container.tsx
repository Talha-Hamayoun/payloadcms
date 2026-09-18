import type { HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/utilities/cn'

export type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  as?: 'div' | 'section' | 'main' | 'article'
  narrow?: boolean
}

export function Container({
  children,
  className,
  as: Tag = 'div',
  narrow,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        'container-site',
        narrow && 'max-w-3xl',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
