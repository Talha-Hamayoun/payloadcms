import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/utilities/cn'

const variantStyles = {
  primary: 'bg-accent text-white hover:bg-accent-hover',
  secondary: 'bg-ink text-paper hover:bg-ink-soft',
  ghost: 'bg-transparent text-ink hover:bg-paper-muted',
  outline: 'border border-steel-light text-ink hover:border-ink hover:bg-paper-muted',
} as const

const sizeStyles = {
  sm: 'size-9 [&>svg]:size-4',
  md: 'size-11 [&>svg]:size-5',
  lg: 'size-12 [&>svg]:size-5',
} as const

export type IconButtonVariant = keyof typeof variantStyles
export type IconButtonSize = keyof typeof sizeStyles

type IconButtonBase = {
  variant?: IconButtonVariant
  size?: IconButtonSize
  className?: string
  children: ReactNode
  label: string
}

type IconButtonAsButton = IconButtonBase &
  Omit<ComponentPropsWithoutRef<'button'>, keyof IconButtonBase> & {
    href?: undefined
  }

type IconButtonAsLink = IconButtonBase &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof IconButtonBase | 'href'> & {
    href: string
  }

export type IconButtonProps = IconButtonAsButton | IconButtonAsLink

export function IconButton(props: IconButtonProps) {
  const {
    variant = 'ghost',
    size = 'md',
    className,
    children,
    label,
    ...rest
  } = props

  const classes = cn(
    'inline-flex items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  if ('href' in props && props.href) {
    const { href, ...linkRest } = rest as Omit<IconButtonAsLink, keyof IconButtonBase>
    return (
      <Link href={href} aria-label={label} className={classes} {...linkRest}>
        {children}
      </Link>
    )
  }

  const buttonRest = rest as Omit<IconButtonAsButton, keyof IconButtonBase>
  return (
    <button type="button" aria-label={label} className={classes} {...buttonRest}>
      {children}
    </button>
  )
}
