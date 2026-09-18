import type { SelectHTMLAttributes } from 'react'

import { cn } from '@/utilities/cn'

export type SelectOption = { value: string; label: string }

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  error?: string
  hint?: string
  options: SelectOption[]
}

export function Select({
  label,
  error,
  hint,
  options,
  className,
  id,
  ...props
}: SelectProps) {
  const selectId = id || (label ? label.replace(/\s+/g, '-').toLowerCase() : undefined)

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={selectId} className="text-sm font-medium text-ink">
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={cn(
          'h-11 w-full appearance-none rounded-md border border-border bg-surface bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat px-3.5 pr-10 text-ink',
          'bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")]',
          'transition-colors focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/25',
          error && 'border-error',
          className,
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value || 'empty'} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && !error ? <p className="text-xs text-steel">{hint}</p> : null}
      {error ? (
        <p className="text-xs text-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
