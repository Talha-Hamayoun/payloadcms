'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, MessageCircle, Search, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'

import { GlobalSearch } from '@/components/common/GlobalSearch'
import type { CategoryCardData, NavLink } from '@/components/types'
import { MobileNav } from '@/components/layout/MobileNav'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import type { Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'
import { whatsappUrl } from '@/utilities/seo'

export type HeaderProps = {
  siteName: string
  navigation: NavLink[]
  categories?: CategoryCardData[]
  announcement?: string | null
  cta?: { label?: string | null; href?: string | null } | null
  whatsappNumber?: string | null
  contactNumber?: string | null
  logo?: Media | string | number | null
}

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  const base = href.split('?')[0]
  return pathname === base || pathname.startsWith(`${base}/`)
}

export function Header({
  siteName,
  navigation,
  categories = [],
  announcement,
  cta,
  whatsappNumber,
  contactNumber,
  logo,
}: HeaderProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const megaRef = useRef<HTMLDivElement>(null)
  const megaId = useId()

  const logoUrl = getMediaUrl(logo ?? null)
  const logoAlt = getMediaAlt(logo ?? null, siteName)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!megaRef.current?.contains(e.target as Node)) setMegaOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false)
        setMobileSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const shopCategories = categories.slice(0, 8)

  const openMobile = () => {
    setMegaOpen(false)
    setMobileSearchOpen(false)
    setMobileOpen(true)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface shadow-[var(--shadow-header)]">
      {announcement ? (
        <div className="bg-ink px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-surface/90">
          {announcement}
        </div>
      ) : null}

      {/* Utility / brand row */}
      <div className="border-b border-border">
        <div className="container-site flex h-16 items-center gap-4 md:h-[4.5rem]">
          <IconButton
            label="Open menu"
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={openMobile}
          >
            <Menu />
          </IconButton>

          <Link href="/" className="flex shrink-0 items-center gap-2">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={140}
                height={44}
                className="h-9 w-auto object-contain md:h-10"
                priority
              />
            ) : (
              <span className="font-display text-xl text-ink md:text-2xl">{siteName}</span>
            )}
          </Link>

          <div className="mx-auto hidden min-w-0 max-w-xl flex-1 px-6 lg:block">
            <GlobalSearch className="w-full" />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <IconButton
              label="Search"
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileSearchOpen((v) => !v)}
            >
              {mobileSearchOpen ? <X /> : <Search />}
            </IconButton>

            {whatsappNumber ? (
              <Button
                href={whatsappUrl(whatsappNumber, `Hi ${siteName}, I need fitment help.`)}
                size="sm"
                variant="primary"
                className="hidden sm:inline-flex"
                leftIcon={<MessageCircle />}
              >
                WhatsApp
              </Button>
            ) : cta?.href && cta.label ? (
              <Button href={cta.href} size="sm" variant="secondary" className="hidden sm:inline-flex">
                {cta.label}
              </Button>
            ) : null}

            {/* {contactNumber ? (
              <a
                href={`tel:${contactNumber.replace(/\s+/g, '')}`}
                className="hidden text-xs font-medium text-steel xl:inline hover:text-ink"
              >
                {contactNumber}
              </a>
            ) : null} */}
          </div>
        </div>

        {mobileSearchOpen ? (
          <div className="container-site pb-3 lg:hidden">
            <GlobalSearch className="w-full" />
          </div>
        ) : null}
      </div>

      {/* Primary nav */}
      <div className="hidden lg:block">
        <div className="container-site flex h-12 items-center justify-center gap-1">
          <div className="relative" ref={megaRef}>
            <button
              type="button"
              className={cn(
                'nav-link inline-flex h-12 items-center gap-1 px-3',
                megaOpen && 'nav-link-active',
              )}
              aria-expanded={megaOpen}
              aria-controls={megaId}
              onClick={() => setMegaOpen((v) => !v)}
            >
              Shop Parts
              <ChevronDown className={cn('size-3.5 transition-transform', megaOpen && 'rotate-180')} />
            </button>

            {megaOpen && shopCategories.length > 0 ? (
              <div
                id={megaId}
                className="absolute left-1/2 top-full z-50 w-[min(100vw-2rem,36rem)] -translate-x-1/2 border border-border bg-surface p-5 shadow-[var(--shadow-elevated)]"
                role="region"
                aria-label="Shop parts categories"
              >
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-steel">
                  Shop by category
                </p>
                <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                  {shopCategories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="block rounded-md px-3 py-2.5 text-sm font-medium text-ink hover:bg-muted hover:text-accent"
                        onClick={() => setMegaOpen(false)}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 border-t border-border pt-3">
                  <Link
                    href="/products"
                    className="text-sm font-semibold text-accent hover:text-accent-hover"
                    onClick={() => setMegaOpen(false)}
                  >
                    View all products →
                  </Link>
                </div>
              </div>
            ) : null}
          </div>

          <nav aria-label="Main" className="flex items-center">
            <ul className="flex items-center gap-0.5">
              {navigation.map((link) => {
                const active = isActivePath(pathname, link.href)
                return (
                  <li key={`${link.href}-${link.label}`}>
                    <Link
                      href={link.href}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                      data-active={active || undefined}
                      className={cn('nav-link inline-flex h-12 items-center px-3', active && 'nav-link-active')}
                      onClick={() => setMegaOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navigation}
        categories={shopCategories}
        announcement={announcement}
        whatsappNumber={whatsappNumber}
        siteName={siteName}
      />
    </header>
  )
}
