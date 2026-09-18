import { s3Storage } from '@payloadcms/storage-s3'
import type { Plugin } from 'payload'

export function createR2StoragePlugin(): Plugin {
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucket = process.env.R2_BUCKET_NAME
  const publicUrl = (process.env.R2_PUBLIC_URL || '').replace(/\/$/, '')

  const enabled = Boolean(accountId && accessKeyId && secretAccessKey && bucket && publicUrl)

  // Optional override; default derived from account id
  const endpoint =
    process.env.R2_ENDPOINT ||
    (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined)

  return s3Storage({
    enabled,
    // Keep Media schema consistent whether R2 is on or off
    alwaysInsertFields: true,
    bucket: bucket || 'unused',
    // Prefer server uploads locally; enable client uploads on Vercel for larger files
    clientUploads: process.env.R2_CLIENT_UPLOADS === '1',
    collections: {
      media: {
        // Serve files from the public R2 / custom domain URL (not Payload /api/media)
        disablePayloadAccessControl: true,
        // Organize objects under media/ in the bucket; Payload still uniquifies filenames
        prefix: 'media',
        generateFileURL: ({ filename, prefix }) => {
          const key = prefix ? `${prefix}/${filename}` : filename
          return `${publicUrl}/${key}`
        },
      },
    },
    config: {
      credentials:
        accessKeyId && secretAccessKey
          ? {
              accessKeyId,
              secretAccessKey,
            }
          : undefined,
      region: 'auto',
      endpoint,
      forcePathStyle: true,
    },
  })
}

export function isR2StorageEnabled(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_BUCKET_NAME &&
      process.env.R2_PUBLIC_URL,
  )
}

