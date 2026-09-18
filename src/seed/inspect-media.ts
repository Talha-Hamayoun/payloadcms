import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../payload.config'

const payload = await getPayload({ config })
const result = await payload.find({ collection: 'media', limit: 8, page: 1, depth: true })

console.log('totalDocs', result.totalDocs)
for (const d of result.docs) {
  console.log({
    id: d.id,
    filename: d.filename,
    url: d.url,
    prefix: d.prefix,
    mimeType: d.mimeType,
    sizeKeys: d.sizes ? Object.keys(d.sizes) : [],
    thumbUrl: d.sizes?.thumbnail?.url,
  })
}

process.exit(0)
