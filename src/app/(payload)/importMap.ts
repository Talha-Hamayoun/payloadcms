import { S3ClientUploadHandler } from '@payloadcms/storage-s3/client'
import type { ImportMap } from 'payload'

import { importMap as generatedImportMap } from './admin/importMap.js'

/**
 * Payload's cloud-storage plugin always registers S3ClientUploadHandler
 * (even when R2 is disabled). Guarantee it is present so /admin does not
 * white-screen if the generated importMap.js is stale on deploy.
 */
export const importMap: ImportMap = {
  ...generatedImportMap,
  '@payloadcms/storage-s3/client#S3ClientUploadHandler': S3ClientUploadHandler,
}
