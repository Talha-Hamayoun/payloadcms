import type { Payload } from 'payload'
import fs from 'fs/promises'
import path from 'path'
import { createHash } from 'crypto'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const dirname = path.dirname(fileURLToPath(import.meta.url))
export const seedAssetsDir = path.resolve(dirname, 'assets')
const seedCacheDir = path.resolve(seedAssetsDir, 'cache')

export function richText(...paragraphs: string[]) {
  return {
    root: {
      type: 'root' as const,
      children: paragraphs.map((text) => ({
        type: 'paragraph' as const,
        version: 1,
        children: [{ type: 'text' as const, text, version: 1 }],
      })),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

export function articleRichText(sections: { heading?: string; paragraphs: string[] }[]) {
  type LexicalNode = {
    type: string
    version: number
    tag?: string
    children?: Array<{ type: string; text?: string; version: number }>
    [k: string]: unknown
  }

  const children: LexicalNode[] = []
  for (const section of sections) {
    if (section.heading) {
      children.push({
        type: 'heading',
        tag: 'h2',
        version: 1,
        children: [{ type: 'text', text: section.heading, version: 1 }],
      })
    }
    for (const text of section.paragraphs) {
      children.push({
        type: 'paragraph',
        version: 1,
        children: [{ type: 'text', text, version: 1 }],
      })
    }
  }
  return {
    root: {
      type: 'root' as const,
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

export type ImageTheme =
  | 'piston'
  | 'brake'
  | 'headlight'
  | 'exhaust'
  | 'mirror'
  | 'filter'
  | 'chain'
  | 'helmet'
  | 'cover'
  | 'grip'
  | 'cable'
  | 'decoration'
  | 'suspension'
  | 'generic'
  | 'brand'
  | 'bike'
  | 'category'
  | 'blog'
  | 'mod-before'
  | 'mod-after'

/** Curated Unsplash motorcycle / parts photos only (Unsplash License). */
const THEME_PHOTOS: Record<ImageTheme, string[]> = {
  piston: [
    'https://images.unsplash.com/photo-1683456062141-6c9f10664d1f',
    'https://images.unsplash.com/photo-1699522785139-4745e9411756',
    'https://images.unsplash.com/photo-1693744379502-65cd3d96cab4',
  ],
  brake: [
    'https://images.unsplash.com/photo-1762012507780-060fe0bcc783',
    'https://images.unsplash.com/photo-1770400770372-fc8eed990bd8',
    'https://images.unsplash.com/photo-1767480350763-3f042911a21a',
  ],
  headlight: [
    'https://images.unsplash.com/photo-1713638916407-94d936da4eff',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
  ],
  exhaust: [
    'https://images.unsplash.com/photo-1769537754889-8d731b83547f',
    'https://images.unsplash.com/photo-1699522785139-4745e9411756',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
  ],
  mirror: [
    'https://images.unsplash.com/photo-1713638916407-94d936da4eff',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
    'https://images.unsplash.com/photo-1558980664-ce6960be307d',
  ],
  filter: [
    'https://images.unsplash.com/photo-1558980664-ce6960be307d',
    'https://images.unsplash.com/photo-1699522785139-4745e9411756',
    'https://images.unsplash.com/photo-1683456062141-6c9f10664d1f',
  ],
  chain: [
    'https://images.unsplash.com/photo-1645454616643-89ce27edb210',
    'https://images.unsplash.com/photo-1769537754889-8d731b83547f',
    'https://images.unsplash.com/photo-1683456062141-6c9f10664d1f',
  ],
  helmet: [
    'https://images.unsplash.com/photo-1561811554-f5d22f7e4662',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    'https://images.unsplash.com/photo-1558980664-ce6960be307d',
  ],
  cover: [
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    'https://images.unsplash.com/photo-1693744379502-65cd3d96cab4',
  ],
  grip: [
    'https://images.unsplash.com/photo-1558980664-ce6960be307d',
    'https://images.unsplash.com/photo-1713638916407-94d936da4eff',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
  ],
  cable: [
    'https://images.unsplash.com/photo-1762012507780-060fe0bcc783',
    'https://images.unsplash.com/photo-1683456062141-6c9f10664d1f',
    'https://images.unsplash.com/photo-1699522785139-4745e9411756',
  ],
  decoration: [
    'https://images.unsplash.com/photo-1558980664-ce6960be307d',
    'https://images.unsplash.com/photo-1713638916407-94d936da4eff',
    'https://images.unsplash.com/photo-1693744379502-65cd3d96cab4',
  ],
  suspension: [
    'https://images.unsplash.com/photo-1735966332617-7fc46ffbd2e9',
    'https://images.unsplash.com/photo-1767480350763-3f042911a21a',
    'https://images.unsplash.com/photo-1762012507780-060fe0bcc783',
  ],
  generic: [
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    'https://images.unsplash.com/photo-1693744379502-65cd3d96cab4',
  ],
  brand: [
    'https://images.unsplash.com/photo-1693744379502-65cd3d96cab4',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
    'https://images.unsplash.com/photo-1558980664-ce6960be307d',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    'https://images.unsplash.com/photo-1713638916407-94d936da4eff',
  ],
  bike: [
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    'https://images.unsplash.com/photo-1693744379502-65cd3d96cab4',
    'https://images.unsplash.com/photo-1558980664-ce6960be307d',
    'https://images.unsplash.com/photo-1713638916407-94d936da4eff',
  ],
  category: [
    'https://images.unsplash.com/photo-1762012507780-060fe0bcc783',
    'https://images.unsplash.com/photo-1645454616643-89ce27edb210',
    'https://images.unsplash.com/photo-1713638916407-94d936da4eff',
    'https://images.unsplash.com/photo-1561811554-f5d22f7e4662',
    'https://images.unsplash.com/photo-1683456062141-6c9f10664d1f',
    'https://images.unsplash.com/photo-1735966332617-7fc46ffbd2e9',
    'https://images.unsplash.com/photo-1699522785139-4745e9411756',
    'https://images.unsplash.com/photo-1769537754889-8d731b83547f',
  ],
  blog: [
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    'https://images.unsplash.com/photo-1561811554-f5d22f7e4662',
    'https://images.unsplash.com/photo-1693744379502-65cd3d96cab4',
    'https://images.unsplash.com/photo-1762012507780-060fe0bcc783',
  ],
  'mod-before': [
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
    'https://images.unsplash.com/photo-1693744379502-65cd3d96cab4',
  ],
  'mod-after': [
    'https://images.unsplash.com/photo-1558980664-ce6960be307d',
    'https://images.unsplash.com/photo-1713638916407-94d936da4eff',
    'https://images.unsplash.com/photo-1693744379502-65cd3d96cab4',
  ],
}

/** Stable overrides so key entities always get the best-matching photo. */
const KEY_PHOTOS: Record<string, string> = {
  'brand-honda': 'https://images.unsplash.com/photo-1693744379502-65cd3d96cab4',
  'brand-yamaha': 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc',
  'brand-suzuki': 'https://images.unsplash.com/photo-1558980664-ce6960be307d',
  'brand-united': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
  'brand-road-prince': 'https://images.unsplash.com/photo-1713638916407-94d936da4eff',
  'hero-motoforge': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39',
}

function pickPhoto(theme: ImageTheme, key: string): string {
  if (KEY_PHOTOS[key]) return KEY_PHOTOS[key]
  const pool = THEME_PHOTOS[theme] || THEME_PHOTOS.generic
  const hash = createHash('sha1').update(key).digest()
  const index = hash[0] % pool.length
  return pool[index]
}

function photoCacheName(url: string): string {
  const id = url.split('/').pop() || 'photo'
  return `${id}.jpg`
}

async function downloadPhoto(url: string, width: number, height: number): Promise<Buffer> {
  await fs.mkdir(seedCacheDir, { recursive: true })
  const cachePath = path.join(seedCacheDir, photoCacheName(url))

  try {
    const cached = await fs.readFile(cachePath)
    if (cached.length > 10_000) {
      return sharp(cached)
        .resize(width, height, { fit: 'cover', position: 'centre' })
        .jpeg({ quality: 82 })
        .toBuffer()
    }
  } catch {
    // miss
  }

  const fullUrl = `${url}?auto=format&fit=crop&w=${Math.max(width, 1400)}&h=${Math.max(height, 1050)}&q=80`
  const res = await fetch(fullUrl, {
    headers: { 'User-Agent': 'MotoForgeSeed/1.0 (local development)' },
  })
  if (!res.ok) {
    throw new Error(`Failed to download image ${url}: ${res.status}`)
  }
  const remote = Buffer.from(await res.arrayBuffer())
  await fs.writeFile(cachePath, remote)

  return sharp(remote)
    .resize(width, height, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82 })
    .toBuffer()
}

export async function ensureSeedMedia(
  payload: Payload,
  opts: {
    key: string
    alt: string
    label: string
    subtitle?: string
    theme?: ImageTheme
    width?: number
    height?: number
    caption?: string
    refresh?: boolean
  },
): Promise<number> {
  const refresh = opts.refresh ?? process.env.SEED_REFRESH_MEDIA !== '0'
  const theme = opts.theme || 'generic'
  const width = opts.width ?? 1200
  const height = opts.height ?? 900
  const photoUrl = pickPhoto(theme, opts.key)

  await fs.mkdir(seedAssetsDir, { recursive: true })
  const filePath = path.join(seedAssetsDir, `${opts.key}.jpg`)

  let needsWrite = refresh
  if (!needsWrite) {
    try {
      const stat = await fs.stat(filePath)
      needsWrite = stat.size < 20_000
    } catch {
      needsWrite = true
    }
  }

  if (needsWrite) {
    const jpeg = await downloadPhoto(photoUrl, width, height)
    await fs.writeFile(filePath, jpeg)
  }

  const data = {
    alt: opts.alt,
    caption: opts.caption || opts.subtitle || opts.label,
  }

  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: opts.alt } },
    limit: 1,
  })

  if (existing.docs[0]) {
    if (refresh || needsWrite) {
      await payload.update({
        collection: 'media',
        id: existing.docs[0].id,
        data,
        filePath,
      })
    }
    return existing.docs[0].id
  }

  const media = await payload.create({
    collection: 'media',
    data,
    filePath,
  })
  return media.id
}
