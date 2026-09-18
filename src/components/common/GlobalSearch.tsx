'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { SearchInput } from '@/components/ui/SearchInput'
import { cn } from '@/utilities/cn'

type SearchResult = {
  products: { name: string; slug: string }[]
  categories: { name: string; slug: string }[]
  brands: { name: string; slug: string }[]
  bikes: { name: string; slug: string }[]
}

export type GlobalSearchProps = {
  className?: string
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  const fetchResults = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults(null)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`)
      if (res.ok) {
        const data = (await res.json()) as SearchResult
        setResults(data)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      void fetchResults(query)
    }, 280)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query, fetchResults])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const hasResults =
    results &&
    (results.products.length > 0 ||
      results.categories.length > 0 ||
      results.brands.length > 0 ||
      results.bikes.length > 0)

  const onSubmit = () => {
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`)
      setOpen(false)
    }
  }

  return (
    <div ref={wrapRef} className={cn('relative', className)}>
      <SearchInput
        value={query}
        onChange={(v) => {
          setQuery(v)
          setOpen(true)
        }}
        onSubmit={() => onSubmit()}
        placeholder="Search parts, bikes, brands…"
      />
      {open && query.trim() && (hasResults || loading) ? (
        <div
          id="global-search-results"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-md border border-steel-light/70 bg-white py-2 shadow-[var(--shadow-elevated)]"
          role="listbox"
        >
          {loading && !hasResults ? (
            <p className="px-3 py-2 text-sm text-steel">Searching…</p>
          ) : null}
          {results?.products.length ? (
            <Section title="Products">
              {results.products.map((p) => (
                <ResultLink key={p.slug} href={`/products/${p.slug}`} onPick={() => setOpen(false)}>
                  {p.name}
                </ResultLink>
              ))}
            </Section>
          ) : null}
          {results?.categories.length ? (
            <Section title="Categories">
              {results.categories.map((c) => (
                <ResultLink key={c.slug} href={`/categories/${c.slug}`} onPick={() => setOpen(false)}>
                  {c.name}
                </ResultLink>
              ))}
            </Section>
          ) : null}
          {results?.brands.length ? (
            <Section title="Brands">
              {results.brands.map((b) => (
                <ResultLink key={b.slug} href={`/brands/${b.slug}`} onPick={() => setOpen(false)}>
                  {b.name}
                </ResultLink>
              ))}
            </Section>
          ) : null}
          {results?.bikes.length ? (
            <Section title="Bikes">
              {results.bikes.map((b) => (
                <ResultLink key={b.slug} href={`/bikes/${b.slug}`} onPick={() => setOpen(false)}>
                  {b.name}
                </ResultLink>
              ))}
            </Section>
          ) : null}
          <button
            type="button"
            className="w-full border-t border-paper-muted px-3 py-2 text-left text-sm font-medium text-accent hover:bg-paper-muted"
            onClick={onSubmit}
          >
            View all results for &ldquo;{query}&rdquo;
          </button>
        </div>
      ) : null}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="px-2 py-1">
      <p className="px-2 py-1 text-xs font-medium uppercase tracking-wider text-steel">{title}</p>
      {children}
    </div>
  )
}

function ResultLink({
  href,
  children,
  onPick,
}: {
  href: string
  children: React.ReactNode
  onPick: () => void
}) {
  return (
    <Link
      href={href}
      className="block rounded px-2 py-1.5 text-sm normal-case tracking-normal hover:bg-paper-muted"
      onClick={onPick}
      role="option"
    >
      {children}
    </Link>
  )
}
