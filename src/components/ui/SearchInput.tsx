'use client'

import { Search, X } from 'lucide-react'
import { useCallback, useId, useState } from 'react'

import { cn } from '@/utilities/cn'

export type SearchInputProps = {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  className?: string
  label?: string
  autoFocus?: boolean
}

export function SearchInput({
  value: controlledValue,
  defaultValue = '',
  onChange,
  onSubmit,
  placeholder = 'Search parts, brands, bikes…',
  className,
  label = 'Search',
  autoFocus,
}: SearchInputProps) {
  const id = useId()
  const [internal, setInternal] = useState(defaultValue)
  const value = controlledValue !== undefined ? controlledValue : internal

  const setValue = useCallback(
    (next: string) => {
      if (controlledValue === undefined) setInternal(next)
      onChange?.(next)
    },
    [controlledValue, onChange],
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className={cn('relative w-full', className)} role="search">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Search
        className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-steel"
        aria-hidden
      />
      <input
        id={id}
        type="search"
        value={value}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          'h-11 w-full rounded-md border border-steel-light bg-white pl-10 pr-10 text-ink placeholder:text-steel',
          'focus:border-ink focus:outline-none focus:ring-2 focus:ring-accent/20',
        )}
      />
      {value ? (
        <button
          type="button"
          onClick={() => setValue('')}
          className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-steel hover:bg-paper-muted hover:text-ink"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </form>
  )
}
