import type { Metadata } from 'next'

import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/media'

type SeoLike = {
  title?: string | null
  description?: string | null
  image?: (number | null) | Media
  noIndex?: boolean | null
} | null

type BuildMetadataArgs = {
  title: string
  description?: string | null
  path?: string
  seo?: SeoLike
  image?: Media | null
}

const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export function buildMetadata({
  title,
  description,
  path = '/',
  seo,
  image,
}: BuildMetadataArgs): Metadata {
  const metaTitle = seo?.title || title
  const metaDescription = seo?.description || description || undefined
  const ogImage =
    getMediaUrl(seo?.image as Media | null | undefined) || getMediaUrl(image) || undefined
  const url = `${siteUrl}${path}`

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      type: 'website',
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}

export function absoluteUrl(path = '/'): string {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function whatsappUrl(phone: string, message?: string): string {
  const cleaned = phone.replace(/[^\d]/g, '')
  const base = `https://wa.me/${cleaned}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}
