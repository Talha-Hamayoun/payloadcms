import type { TextareaHTMLAttributes } from 'react'

import { cn } from '@/utilities/cn'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
  hint?: string
}

export function Textarea({ label, error, hint, className, id, ...props }: TextareaProps) {
  const inputId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
      ) : null}
      <textarea
        id={inputId}
        className={cn(
          'min-h-[7rem] w-full resize-y rounded-md border border-border bg-surface px-3.5 py-2.5 text-ink placeholder:text-steel-light',
          'transition-colors focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25',
          error && 'border-error focus:border-error focus-visible:ring-error/25',
          className,
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {hint && !error ? <p className="text-xs text-steel">{hint}</p> : null}
      {error ? (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
