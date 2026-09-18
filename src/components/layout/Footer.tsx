import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Youtube } from 'lucide-react'

import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import type { FooterColumn, NavLink } from '@/components/types'
import type { Media } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'

type SocialLink = { platform?: string | null; url: string; id?: string | null }

export type FooterProps = {
  siteName: string
  description?: string | null
  columns?: FooterColumn[] | null
  contact?: {
    phone?: string | null
    email?: string | null
    address?: string | null
  } | null
  socialLinks?: SocialLink[] | null
  copyright?: string | null
  logo?: Media | string | number | null
  whatsappNumber?: string | null
}

const FALLBACK_COLUMNS: FooterColumn[] = [
  {
    title: 'Shop',
    links: [
      { label: 'Spare Parts', href: '/products?type=spare-part' },
      { label: 'Accessories', href: '/products?type=accessory' },
      { label: 'Modifications', href: '/modifications' },
      { label: 'All Products', href: '/products' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Bikes', href: '/bikes' },
      { label: 'Brands', href: '/brands' },
      { label: 'Categories', href: '/categories' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'About', href: '/about' },
    ],
  },
]

function SocialIcon({ platform }: { platform?: string | null }) {
  const p = (platform || '').toLowerCase()
  if (p.includes('facebook')) return <Facebook className="size-4" aria-hidden />
  if (p.includes('instagram')) return <Instagram className="size-4" aria-hidden />
  if (p.includes('youtube')) return <Youtube className="size-4" aria-hidden />
  return <span className="text-[10px] uppercase">{platform || 'Link'}</span>
}

export function Footer({
  siteName,
  description,
  columns,
  contact,
  socialLinks,
  copyright,
  logo,
  whatsappNumber,
}: FooterProps) {
  const logoUrl = getMediaUrl(logo ?? null)
  const logoAlt = getMediaAlt(logo ?? null, siteName)
  const year = new Date().getFullYear()
  const cols = columns && columns.length > 0 ? columns : FALLBACK_COLUMNS

  return (
    <footer className="mt-auto bg-ink text-surface">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="lg:col-span-4">
          <Link href="/" className="inline-block">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={logoAlt}
                width={140}
                height={48}
                className="h-10 w-auto brightness-0 invert"
              />
            ) : (
              <span className="font-display text-xl">{siteName}</span>
            )}
          </Link>
          {description ? (
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-steel-light">{description}</p>
          ) : null}
          {whatsappNumber ? (
            <WhatsAppButton
              phone={whatsappNumber}
              message={`Hi ${siteName}, I need help finding parts.`}
              variant="primary"
              size="sm"
              className="mt-5"
            />
          ) : null}
        </div>

        {cols.map((col) => (
          <div key={col.title} className="lg:col-span-2">
            <h2 className="font-display text-xs tracking-[0.16em] text-steel-light">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links?.map((link: NavLink) => (
                <li key={`${col.title}-${link.href}`}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface/85 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-2">
          <h2 className="font-display text-xs tracking-[0.16em] text-steel-light">Contact</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-surface/85">
            {contact?.phone ? (
              <li>
                <a href={`tel:${contact.phone.replace(/\s+/g, '')}`} className="hover:text-accent">
                  {contact.phone}
                </a>
              </li>
            ) : null}
            {contact?.email ? (
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-accent">
                  {contact.email}
                </a>
              </li>
            ) : null}
            {contact?.address ? <li className="whitespace-pre-line text-steel-light">{contact.address}</li> : null}
          </ul>
          {socialLinks && socialLinks.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-steel-light hover:border-accent hover:text-accent',
                    )}
                    aria-label={s.platform || 'Social link'}
                  >
                    <SocialIcon platform={s.platform} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-4 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>{copyright || `© ${year} ${siteName}. All rights reserved.`}</p>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-surface">
              About
            </Link>
            <Link href="/contact" className="hover:text-surface">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
