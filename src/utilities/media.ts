import type { Media } from '@/payload-types'

type MediaLike = Media | string | number | null | undefined

/**
 * Returns the display URL for a media document.
 * With R2 enabled this is typically an absolute public URL
 * (e.g. https://media.example.com/media/photo.jpg).
 * Without R2 it is usually a local Payload path (/api/media/file/...).
 */
export function getMediaUrl(media: MediaLike): string | null {
  if (!media || typeof media === 'string' || typeof media === 'number') return null
  return media.url || null
}

export function getMediaAlt(media: MediaLike, fallback = ''): string {
  if (!media || typeof media === 'string' || typeof media === 'number') return fallback
  return media.alt || fallback
}

export function getMediaDimensions(media: MediaLike): { width?: number; height?: number } {
  if (!media || typeof media === 'string' || typeof media === 'number') return {}
  return {
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  }
}
