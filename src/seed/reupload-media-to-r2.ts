/**
 * Re-upload every Media document's local file to Cloudflare R2 and refresh Payload URLs.
 *
 * Requires R2_* env vars + local originals in ./media (or ./src/seed/assets).
 *
 * Usage: pnpm media:reupload-r2
 * Optional: SKIP_EXISTING=1 to skip docs whose public URL already returns 200
 */
import 'dotenv/config'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '../payload.config'
import { isR2StorageEnabled } from '../storage/r2'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(dirname, '../..')
const localMediaDir = path.join(rootDir, 'media')
const seedAssetsDir = path.join(rootDir, 'src/seed/assets')

const skipExisting = process.env.SKIP_EXISTING === '1'
const concurrency = Math.max(1, Number(process.env.REUPLOAD_CONCURRENCY || 3))

async function resolveLocalFile(filename: string): Promise<string | null> {
  const candidates = [
    path.join(localMediaDir, filename),
    path.join(seedAssetsDir, filename),
    // Seed keys often match the stem without size suffixes
    path.join(seedAssetsDir, filename.replace(/-\d+x\d+(?=\.)/, '')),
  ]

  for (const candidate of candidates) {
    try {
      const stat = await fs.stat(candidate)
      if (stat.isFile() && stat.size > 0) return candidate
    } catch {
      // try next
    }
  }
  return null
}

async function remoteExists(url: string | null | undefined): Promise<boolean> {
  if (!url) return false
  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

async function mapPool<T>(
  items: T[],
  limit: number,
  worker: (item: T, index: number) => Promise<void>,
): Promise<void> {
  let next = 0
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++
      await worker(items[index], index)
    }
  })
  await Promise.all(runners)
}

async function main() {
  if (!isR2StorageEnabled()) {
    throw new Error('R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL.')
  }

  const payload = await getPayload({ config })
  const pageSize = 50
  let page = 1
  let processed = 0
  let uploaded = 0
  let skipped = 0
  let missing = 0
  let failed = 0

  const first = await payload.find({ collection: 'media', limit: pageSize, page: 1, depth: true })
  const total = first.totalDocs
  console.log(`Re-uploading ${total} media docs to R2 (concurrency=${concurrency}, skipExisting=${skipExisting})`)

  while (true) {
    const result =
      page === 1
        ? first
        : await payload.find({ collection: 'media', limit: pageSize, page, depth: 0 })

    if (!result.docs.length) break

    await mapPool(result.docs, concurrency, async (doc) => {
      const filename = doc.filename
      if (!filename) {
        console.warn(`[skip] id=${doc.id} has no filename`)
        skipped++
        return
      }

      if (skipExisting && (await remoteExists(doc.url))) {
        console.log(`[ok-skip] id=${doc.id} ${filename}`)
        skipped++
        processed++
        return
      }

      const filePath = await resolveLocalFile(filename)
      if (!filePath) {
        console.warn(`[missing] id=${doc.id} ${filename}`)
        missing++
        processed++
        return
      }

      try {
        const updated = await payload.update({
          collection: 'media',
          id: doc.id,
          data: {
            alt: doc.alt,
            caption: doc.caption ?? undefined,
          },
          filePath,
          overwriteExistingFiles: true,
        })
        uploaded++
        processed++
        console.log(`[uploaded] id=${doc.id} → ${updated.url}`)
      } catch (err) {
        failed++
        processed++
        console.error(`[fail] id=${doc.id} ${filename}`, err instanceof Error ? err.message : err)
      }
    })

    if (page >= result.totalPages) break
    page++
  }

  console.log('\nDone.')
  console.log({ total, processed, uploaded, skipped, missing, failed })
  process.exit(failed > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
