'use client'

import Link from 'next/link'
import { ChevronDown, MessageCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { CategoryCardData, NavLink } from '@/components/types'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { cn } from '@/utilities/cn'
import { whatsappUrl } from '@/utilities/seo'

export type MobileNavProps = {
  open: boolean
  onClose: () => void
  links: NavLink[]
  categories?: CategoryCardData[]
  announcement?: string | null
  whatsappNumber?: string | null
  siteName?: string
}

export function MobileNav({
  open,
  onClose,
  links,
  categories = [],
  announcement,
  whatsappNumber,
  siteName = 'MotoForge',
}: MobileNavProps) {
  const [partsOpen, setPartsOpen] = useState(true)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-ink/50 transition-opacity duration-[var(--duration-normal)] lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
        onClick={onClose}
      />
      <nav
        id="mobile-nav"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[min(100%,20.5rem)] flex-col bg-surface text-ink shadow-[var(--shadow-elevated)] transition-transform duration-[var(--duration-normal)] ease-[var(--ease-out)] lg:hidden',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-hidden={!open}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <span className="font-display text-sm tracking-wider">Menu</span>
          <IconButton label="Close menu" variant="ghost" size="sm" onClick={onClose}>
            <X />
          </IconButton>
        </div>

        {announcement ? (
          <p className="border-b border-border bg-ink px-4 py-2.5 text-[11px] font-medium uppercase tracking-wide text-surface">
            {announcement}
          </p>
        ) : null}

        <div className="flex-1 overflow-y-auto px-2 py-3">
          {categories.length > 0 ? (
            <div className="mb-2">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm font-semibold uppercase tracking-wide"
                aria-expanded={partsOpen}
                onClick={() => setPartsOpen((v) => !v)}
              >
                Shop Parts
                <ChevronDown className={cn('size-4 transition-transform', partsOpen && 'rotate-180')} />
              </button>
              {partsOpen ? (
                <ul className="mb-2 space-y-0.5 border-l border-border ml-3 pl-2">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/categories/${cat.slug}`}
                        onClick={onClose}
                        className="block rounded-md px-3 py-2.5 text-sm text-ink/80 hover:bg-muted hover:text-accent"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/products"
                      onClick={onClose}
                      className="block rounded-md px-3 py-2.5 text-sm font-semibold text-accent"
                    >
                      All products →
                    </Link>
                  </li>
                </ul>
              ) : null}
            </div>
          ) : null}

          <ul className="space-y-0.5">
            {links.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <Link
                  href={link.href}
                  target={link.openInNewTab ? '_blank' : undefined}
                  rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                  onClick={onClose}
                  className="block rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wide hover:bg-muted hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {whatsappNumber ? (
          <div className="border-t border-border p-4">
            <Button
              href={whatsappUrl(whatsappNumber, `Hi ${siteName}, I need fitment help.`)}
              className="w-full"
              leftIcon={<MessageCircle />}
              onClick={onClose}
            >
              Chat on WhatsApp
            </Button>
          </div>
        ) : null}
      </nav>
    </>
  )
}
