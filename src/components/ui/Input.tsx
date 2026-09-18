import type { InputHTMLAttributes } from 'react'

import { cn } from '@/utilities/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          'h-11 w-full rounded-md border border-border bg-surface px-3.5 text-ink placeholder:text-steel-light',
          'transition-colors duration-[var(--duration-fast)] focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25',
          error && 'border-error focus:border-error focus-visible:ring-error/25',
          className,
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {hint && !error ? (
        <p id={`${inputId}-hint`} className="text-xs text-steel">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
