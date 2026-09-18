import { getPayloadClient } from '@/lib/payload'

export async function getSiteSettings() {
  const payload = await getPayloadClient()
  try {
    return await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })
  } catch {
    return null
  }
}

export async function getHeader() {
  const payload = await getPayloadClient()
  try {
    return await payload.findGlobal({
      slug: 'header',
      depth: 1,
    })
  } catch {
    return null
  }
}

export async function getFooter() {
  const payload = await getPayloadClient()
  try {
    return await payload.findGlobal({
      slug: 'footer',
      depth: 1,
    })
  } catch {
    return null
  }
}

export async function getHomepage() {
  const payload = await getPayloadClient()
  try {
    return await payload.findGlobal({
      slug: 'homepage',
      depth: 2,
    })
  } catch {
    return null
  }
}

export async function globalSearch(query: string, limit = 8) {
  if (!query.trim()) {
    return { products: [], categories: [], brands: [], bikes: [] }
  }

  const payload = await getPayloadClient()
  const q = query.trim()

  const [products, categories, brands, bikes] = await Promise.all([
    payload.find({
      collection: 'products',
      where: {
        and: [
          { active: { equals: true } },
          {
            or: [{ name: { contains: q } }, { sku: { contains: q } }],
          },
        ],
      },
      limit,
      depth: 1,
    }),
    payload.find({
      collection: 'categories',
      where: {
        and: [{ active: { equals: true } }, { name: { contains: q } }],
      },
      limit: 5,
      depth: 0,
    }),
    payload.find({
      collection: 'brands',
      where: {
        and: [{ active: { equals: true } }, { name: { contains: q } }],
      },
      limit: 5,
      depth: 0,
    }),
    payload.find({
      collection: 'bike-models',
      where: {
        and: [{ active: { equals: true } }, { name: { contains: q } }],
      },
      limit: 5,
      depth: 1,
    }),
  ])

  return {
    products: products.docs,
    categories: categories.docs,
    brands: brands.docs,
    bikes: bikes.docs,
  }
}
