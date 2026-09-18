import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/lib/payload'
import { contactFormSchema } from '@/validations/contact'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = contactFormSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message || 'Validation failed' },
      { status: 400 },
    )
  }

  const payload = await getPayloadClient()
  await payload.create({
    collection: 'contact-submissions',
    data: parsed.data,
    overrideAccess: true,
  })

  return NextResponse.json({ ok: true })
}
