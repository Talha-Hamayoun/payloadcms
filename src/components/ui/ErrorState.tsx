'use client'

import { AlertTriangle } from 'lucide-react'
import type { ReactNode } from 'react'

import { cn } from '@/utilities/cn'

import { Button } from './Button'

export type ErrorStateProps = {
  title?: string
  message?: string
  onRetry?: () => void
  retryLabel?: string
  action?: ReactNode
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this content. Please try again.',
  onRetry,
  retryLabel = 'Try again',
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-lg border border-accent/20 bg-accent/5 px-6 py-14 text-center',
        className,
      )}
      role="alert"
    >
      <AlertTriangle className="mb-4 size-10 text-accent" aria-hidden />
      <h3 className="text-lg normal-case tracking-normal text-ink">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-steel">{message}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry ? (
          <Button type="button" variant="primary" size="sm" onClick={onRetry}>
            {retryLabel}
          </Button>
        ) : null}
        {action}
      </div>
    </div>
  )
}
