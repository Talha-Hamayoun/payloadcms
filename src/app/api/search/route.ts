import { NextResponse } from 'next/server'

import { globalSearch } from '@/lib/data/globals'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''

  const results = await globalSearch(q)

  type SlugDoc = { name: string; slug: string }

  return NextResponse.json({
    products: (results.products as SlugDoc[]).map((p) => ({ name: p.name, slug: p.slug })),
    categories: (results.categories as SlugDoc[]).map((c) => ({ name: c.name, slug: c.slug })),
    brands: (results.brands as SlugDoc[]).map((b) => ({ name: b.name, slug: b.slug })),
    bikes: (results.bikes as SlugDoc[]).map((b) => ({ name: b.name, slug: b.slug })),
  })
}
