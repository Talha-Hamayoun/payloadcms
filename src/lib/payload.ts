import dns from 'dns'
import { getPayload, type Payload } from 'payload'

import config from '@payload-config'

dns.setDefaultResultOrder('ipv4first')

let payloadPromise: Promise<Payload> | null = null

async function connectWithRetry(attempts = 3): Promise<Payload> {
  let lastError: unknown
  for (let i = 1; i <= attempts; i++) {
    try {
      return await getPayload({ config })
    } catch (error) {
      lastError = error
      if (i < attempts) {
        await new Promise((resolve) => setTimeout(resolve, i * 1500))
      }
    }
  }
  throw lastError
}

export async function getPayloadClient(): Promise<Payload> {
  if (!payloadPromise) {
    payloadPromise = connectWithRetry().catch((error) => {
      payloadPromise = null
      throw error
    })
  }
  return payloadPromise
}

/** Soft connect for layouts/pages that can render without CMS data. */
export async function getPayloadClientSafe(): Promise<Payload | null> {
  try {
    return await getPayloadClient()
  } catch {
    return null
  }
}
