import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/utilities/cn'

const variantStyles = {
  primary:
    'bg-accent text-white hover:bg-accent-hover border border-transparent',
  secondary:
    'bg-ink text-surface hover:bg-ink-soft border border-ink',
  ghost: 'bg-transparent text-ink hover:bg-muted border border-transparent',
  outline:
    'bg-transparent text-ink border border-border hover:border-ink hover:bg-surface',
  destructive:
    'bg-error text-white hover:bg-error/90 border border-transparent',
} as const

const sizeStyles = {
  sm: 'h-9 px-3.5 text-xs gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-12 px-7 text-sm gap-2',
  icon: 'h-10 w-10 p-0',
} as const

export type ButtonVariant = keyof typeof variantStyles
export type ButtonSize = keyof typeof sizeStyles

type ButtonBaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps> & {
    href?: undefined
  }

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps | 'href'> & {
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    leftIcon,
    rightIcon,
    ...rest
  } = props

  const classes = cn(
    'inline-flex items-center justify-center font-display rounded-md transition-colors duration-[var(--duration-fast)] disabled:pointer-events-none disabled:opacity-50',
    variantStyles[variant],
    sizeStyles[size],
    className,
  )

  const content = (
    <>
      {leftIcon ? <span className="shrink-0 [&>svg]:size-4">{leftIcon}</span> : null}
      {size === 'icon' ? children : <span>{children}</span>}
      {rightIcon ? <span className="shrink-0 [&>svg]:size-4">{rightIcon}</span> : null}
    </>
  )

  if ('href' in props && props.href) {
    const { href, ...linkRest } = rest as Omit<ButtonAsLink, keyof ButtonBaseProps>
    return (
      <Link href={href} className={classes} {...linkRest}>
        {content}
      </Link>
    )
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof ButtonBaseProps>
  return (
    <button type="button" className={classes} {...buttonRest}>
      {content}
    </button>
  )
}
