export function formatPrice(amount: number | null | undefined, currency = 'PKR'): string {
  if (amount == null || Number.isNaN(amount)) return '—'
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(value: string | Date | null | undefined): string {
  if (!value) return ''
  const date = typeof value === 'string' ? new Date(value) : value
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function yearRange(from?: number | null, to?: number | null): string {
  if (from && to && from !== to) return `${from}–${to}`
  if (from) return `${from}`
  if (to) return `${to}`
  return ''
}
