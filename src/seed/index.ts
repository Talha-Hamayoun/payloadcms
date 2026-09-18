import 'dotenv/config'
import type { Payload } from 'payload'
import { getPayload } from 'payload'
import config from '../payload.config'
import { BRANDS, BIKES, CATEGORY_TREE } from './data/catalog'
import { PRODUCTS } from './data/products'
import { MOD_PROJECTS, BLOG_POSTS } from './data/content'
import { articleRichText, ensureSeedMedia, richText, type ImageTheme } from './helpers'

async function ensureAdmin(payload: Payload): Promise<number> {
  const existing = await payload.find({ collection: 'users', limit: 1 })
  if (existing.docs[0]) return existing.docs[0].id
  const admin = await payload.create({
    collection: 'users',
    data: {
      name: 'Admin',
      email: 'admin@motoforge.local',
      password: 'Admin123!',
      role: 'admin',
      active: true,
    },
  })
  console.log('Created admin: admin@motoforge.local / Admin123!')
  return admin.id
}

async function upsertBrand(payload: Payload, brand: (typeof BRANDS)[number]): Promise<number> {
  const logo = await ensureSeedMedia(payload, {
    key: `brand-${brand.slug}`,
    alt: `${brand.name} brand logo`,
    label: brand.name.toUpperCase(),
    subtitle: 'Official catalog brand',
    theme: 'brand',
    width: 800,
    height: 800,
  })

  const found = await payload.find({
    collection: 'brands',
    where: { slug: { equals: brand.slug } },
    limit: 1,
  })

  const data = {
    name: brand.name,
    slug: brand.slug,
    description: brand.description,
    logo,
    active: true,
    seo: {
      title: `${brand.name} Motorcycle Parts | MotoForge`,
      description: brand.description,
    },
  }

  if (found.docs[0]) {
    await payload.update({ collection: 'brands', id: found.docs[0].id, data })
    return found.docs[0].id
  }
  const created = await payload.create({ collection: 'brands', data })
  return created.id
}

async function upsertBike(
  payload: Payload,
  bike: (typeof BIKES)[number],
  brandId: number,
): Promise<number> {
  const image = await ensureSeedMedia(payload, {
    key: `bike-${bike.slug}`,
    alt: `${bike.name} motorcycle`,
    label: bike.name.toUpperCase(),
    subtitle: `${bike.engineCapacity} · ${bike.yearFrom}–${bike.yearTo}`,
    theme: 'bike',
  })

  const found = await payload.find({
    collection: 'bike-models',
    where: { slug: { equals: bike.slug } },
    limit: 1,
  })

  const data = {
    name: bike.name,
    slug: bike.slug,
    brand: brandId,
    engineCapacity: bike.engineCapacity,
    yearFrom: bike.yearFrom,
    yearTo: bike.yearTo,
    description: `${bike.name} compatible spare parts, accessories and modification components.`,
    image,
    active: true,
  }

  if (found.docs[0]) {
    await payload.update({ collection: 'bike-models', id: found.docs[0].id, data })
    return found.docs[0].id
  }
  const created = await payload.create({ collection: 'bike-models', data })
  return created.id
}

async function upsertCategory(
  payload: Payload,
  cat: {
    name: string
    slug: string
    description: string
    sortOrder: number
    parent?: number
  },
): Promise<number> {
  const image = await ensureSeedMedia(payload, {
    key: `category-${cat.slug}`,
    alt: `${cat.name} category`,
    label: cat.name.toUpperCase(),
    subtitle: 'Shop motorcycle parts',
    theme: 'category',
  })

  const found = await payload.find({
    collection: 'categories',
    where: { slug: { equals: cat.slug } },
    limit: 1,
  })

  const data = {
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    image,
    parent: cat.parent,
    sortOrder: cat.sortOrder,
    active: true,
    seo: {
      title: `${cat.name} | Motorcycle Parts`,
      description: cat.description,
    },
  }

  if (found.docs[0]) {
    await payload.update({ collection: 'categories', id: found.docs[0].id, data })
    return found.docs[0].id
  }
  const created = await payload.create({ collection: 'categories', data })
  return created.id
}

async function upsertProduct(
  payload: Payload,
  product: (typeof PRODUCTS)[number],
  ids: {
    brands: Record<string, number>
    bikes: Record<string, number>
    categories: Record<string, number>
  },
): Promise<number> {
  const primary = await ensureSeedMedia(payload, {
    key: `product-${product.slug}-1`,
    alt: `${product.name} product photo`,
    label: product.name.length > 28 ? product.name.slice(0, 26) + '…' : product.name,
    subtitle: product.sku,
    theme: product.theme as ImageTheme,
  })
  const detail = await ensureSeedMedia(payload, {
    key: `product-${product.slug}-2`,
    alt: `${product.name} detail view`,
    label: 'DETAIL VIEW',
    subtitle: product.name,
    theme: product.theme as ImageTheme,
    width: 1000,
    height: 1000,
  })

  const data = {
    name: product.name,
    slug: product.slug,
    sku: product.sku,
    shortDescription: product.shortDescription,
    description: richText(...product.description),
    productType: product.productType,
    category: ids.categories[product.category],
    subcategory: product.subcategory ? ids.categories[product.subcategory] : undefined,
    brand: ids.brands[product.brand],
    compatibleModels: product.models.map((m) => ids.bikes[m]).filter(Boolean),
    regularPrice: product.regularPrice,
    salePrice: product.salePrice,
    availability: 'in-stock' as const,
    featured: product.featured ?? false,
    newArrival: product.newArrival ?? false,
    bestSeller: product.bestSeller ?? false,
    active: true,
    features: product.features.map((feature) => ({ feature })),
    specifications: product.specs,
    images: [{ image: primary }, { image: detail }],
    installationInfo: richText(
      'Compare the part to your existing component before installation.',
      'If unsure about fitment, share your bike model on WhatsApp for confirmation.',
    ),
    seo: {
      title: `${product.name} | Motorcycle Parts`,
      description: product.shortDescription,
    },
  }

  const found = await payload.find({
    collection: 'products',
    where: { or: [{ slug: { equals: product.slug } }, { sku: { equals: product.sku } }] },
    limit: 1,
  })

  if (found.docs[0]) {
    await payload.update({ collection: 'products', id: found.docs[0].id, data })
    return found.docs[0].id
  }
  const created = await payload.create({ collection: 'products', data })
  return created.id
}

async function seed() {
  const payload = await getPayload({ config })
  console.log('=== MotoForge full catalog seed ===')

  const adminId = await ensureAdmin(payload)

  console.log('Brands...')
  const brandIds: Record<string, number> = {}
  for (const brand of BRANDS) {
    brandIds[brand.slug] = await upsertBrand(payload, brand)
  }

  console.log('Bike models...')
  const bikeIds: Record<string, number> = {}
  for (const bike of BIKES) {
    bikeIds[bike.slug] = await upsertBike(payload, bike, brandIds[bike.brand])
  }

  console.log('Categories...')
  const categoryIds: Record<string, number> = {}
  for (const parent of CATEGORY_TREE) {
    const parentId = await upsertCategory(payload, parent)
    categoryIds[parent.slug] = parentId
    for (const child of parent.children || []) {
      categoryIds[child.slug] = await upsertCategory(payload, {
        ...child,
        parent: parentId,
      })
    }
  }

  // Hide legacy demo categories that overlap the new hierarchy.
  for (const slug of ['brake-parts', 'decorations']) {
    const legacy = await payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (legacy.docs[0]?.active) {
      await payload.update({
        collection: 'categories',
        id: legacy.docs[0].id,
        data: { active: false },
      })
    }
  }

  console.log(`Products (${PRODUCTS.length})...`)
  const productIds: Record<string, number> = {}
  const seedSkus = new Set(PRODUCTS.map((p) => p.sku))
  let i = 0
  for (const product of PRODUCTS) {
    i += 1
    if (i % 10 === 0) console.log(`  … ${i}/${PRODUCTS.length}`)
    productIds[product.slug] = await upsertProduct(payload, product, {
      brands: brandIds,
      bikes: bikeIds,
      categories: categoryIds,
    })
  }

  // Keep featured/new/best-seller curation tight when older demo products remain.
  const existingProducts = await payload.find({ collection: 'products', limit: 500, depth: 0 })
  for (const doc of existingProducts.docs) {
    if (seedSkus.has(doc.sku)) continue
    if (!doc.featured && !doc.newArrival && !doc.bestSeller) continue
    await payload.update({
      collection: 'products',
      id: doc.id,
      data: { featured: false, newArrival: false, bestSeller: false },
    })
  }

  console.log('Modification projects...')
  for (const project of MOD_PROJECTS) {
    const beforeImage = await ensureSeedMedia(payload, {
      key: `mod-${project.slug}-before`,
      alt: `${project.title} before`,
      label: 'BEFORE',
      subtitle: project.title,
      theme: 'mod-before',
      width: 1400,
      height: 900,
    })
    const afterImage = await ensureSeedMedia(payload, {
      key: `mod-${project.slug}-after`,
      alt: `${project.title} after`,
      label: 'AFTER',
      subtitle: project.title,
      theme: 'mod-after',
      width: 1400,
      height: 900,
    })
    const g1 = await ensureSeedMedia(payload, {
      key: `mod-${project.slug}-g1`,
      alt: `${project.title} gallery 1`,
      label: 'BUILD DETAIL',
      subtitle: 'Side profile',
      theme: 'bike',
    })
    const g2 = await ensureSeedMedia(payload, {
      key: `mod-${project.slug}-g2`,
      alt: `${project.title} gallery 2`,
      label: 'BUILD DETAIL',
      subtitle: 'Close-up',
      theme: 'mod-after',
    })

    const data = {
      title: project.title,
      slug: project.slug,
      bikeBrand: brandIds[project.brand],
      bikeModel: bikeIds[project.model],
      beforeImage,
      afterImage,
      gallery: [{ image: g1 }, { image: g2 }],
      description: richText(project.summary, ...project.details),
      partsUsed: project.parts.map((slug) => productIds[slug]).filter(Boolean),
      estimatedCost: project.cost,
      modificationType: project.type,
      featured: project.featured,
      publishedDate: new Date().toISOString(),
      _status: 'published' as const,
      seo: {
        title: `${project.title} | Modification Showcase`,
        description: project.summary,
      },
    }

    const found = await payload.find({
      collection: 'modification-projects',
      where: { slug: { equals: project.slug } },
      limit: 1,
    })
    if (found.docs[0]) {
      await payload.update({
        collection: 'modification-projects',
        id: found.docs[0].id,
        data,
      })
    } else {
      await payload.create({ collection: 'modification-projects', data })
    }
  }

  console.log('Blog posts...')
  let guideCatId: number
  const guideFound = await payload.find({
    collection: 'blog-categories',
    where: { slug: { equals: 'guides' } },
    limit: 1,
  })
  if (guideFound.docs[0]) {
    guideCatId = guideFound.docs[0].id
  } else {
    const created = await payload.create({
      collection: 'blog-categories',
      data: { name: 'Guides', slug: 'guides' },
    })
    guideCatId = created.id
  }

  let idx = 0
  for (const post of BLOG_POSTS) {
    idx += 1
    const featuredImage = await ensureSeedMedia(payload, {
      key: `blog-${post.slug}`,
      alt: post.title,
      label: 'GUIDE',
      subtitle: post.title,
      theme: 'blog',
      width: 1400,
      height: 900,
    })

    const publishedDate = new Date()
    publishedDate.setDate(publishedDate.getDate() - idx * 3)

    const data = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      featuredImage,
      author: adminId,
      categories: [guideCatId],
      publishedDate: publishedDate.toISOString(),
      _status: 'published' as const,
      content: articleRichText(post.sections),
      seo: {
        title: `${post.title} | MotoForge Blog`,
        description: post.excerpt,
      },
    }

    const found = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })
    if (found.docs[0]) {
      await payload.update({ collection: 'blog-posts', id: found.docs[0].id, data })
    } else {
      await payload.create({ collection: 'blog-posts', data })
    }
  }

  console.log('Globals...')
  const heroImage = await ensureSeedMedia(payload, {
    key: 'hero-motoforge',
    alt: 'MotoForge motorcycle hero',
    label: 'FORGE THE RIDE',
    subtitle: 'Parts · Accessories · Builds',
    theme: 'bike',
    width: 1920,
    height: 1080,
  })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'MotoForge',
      siteLogo: brandIds.honda ? undefined : undefined,
      contactNumber: '+92 300 1234567',
      whatsappNumber: '923001234567',
      email: 'hello@motoforge.local',
      address: 'Shop 12, Motorcycle Market, Lahore',
      defaultSeo: {
        title: 'MotoForge — Motorcycle Parts, Accessories & Modifications',
        description:
          'Shop Honda, Yamaha and Suzuki spare parts, accessories, decorations and modification components with verified bike fitment.',
        image: heroImage,
      },
    },
  })

  // Attach Honda logo to site if available via media alt
  const hondaLogo = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'Honda brand logo' } },
    limit: 1,
  })
  if (hondaLogo.docs[0]) {
    await payload.updateGlobal({
      slug: 'site-settings',
      data: { siteLogo: hondaLogo.docs[0].id },
    })
    await payload.updateGlobal({
      slug: 'header',
      data: { logo: hondaLogo.docs[0].id },
    })
    await payload.updateGlobal({
      slug: 'footer',
      data: { logo: hondaLogo.docs[0].id },
    })
  }

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      hero: {
        headline: 'Upgrade Your Ride. Ride Your Style.',
        description:
          'Premium motorcycle spare parts, accessories and modification products for Honda, Yamaha, Suzuki and more — matched to your bike.',
        primaryCtaLabel: 'Explore Parts',
        primaryCtaHref: '/products',
        secondaryCtaLabel: 'Shop Accessories',
        secondaryCtaHref: '/products?type=accessory',
        image: heroImage,
      },
      whyChooseUs: [
        {
          title: 'Quality Parts',
          description: 'Inspected components from trusted motorcycle suppliers.',
          icon: 'quality',
        },
        {
          title: 'Bike Compatibility',
          description: 'Filter by brand and model for confident fitment.',
          icon: 'compatibility',
        },
        {
          title: 'Expert Support',
          description: 'WhatsApp guidance when you are unsure what fits.',
          icon: 'support',
        },
        {
          title: 'Wide Product Range',
          description: 'From daily maintenance to full custom builds.',
          icon: 'range',
        },
      ],
      cta: {
        headline: 'Not sure which part fits your bike?',
        description: 'Share your model and we will recommend the right component.',
        buttonLabel: 'Chat on WhatsApp',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      announcement: 'Free fitment advice on WhatsApp · Same-day dispatch on in-stock parts',
      navigation: [
        { label: 'Home', href: '/' },
        { label: 'Spare Parts', href: '/products?type=spare-part' },
        { label: 'Accessories', href: '/products?type=accessory' },
        { label: 'Modifications', href: '/modifications' },
        { label: 'Brands', href: '/brands' },
        { label: 'Bikes', href: '/bikes' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' },
      ],
      cta: { label: 'WhatsApp', href: 'https://wa.me/923001234567' },
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      description:
        'MotoForge supplies motorcycle parts and modification gear with model-accurate compatibility across Honda, Yamaha and Suzuki.',
      columns: [
        {
          title: 'Shop',
          links: [
            { label: 'Spare Parts', href: '/products?type=spare-part' },
            { label: 'Accessories', href: '/products?type=accessory' },
            { label: 'Modifications', href: '/modifications' },
            { label: 'All Products', href: '/products' },
          ],
        },
        {
          title: 'Explore',
          links: [
            { label: 'Bikes', href: '/bikes' },
            { label: 'Brands', href: '/brands' },
            { label: 'Categories', href: '/categories' },
            { label: 'Blog', href: '/blog' },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Contact', href: '/contact' },
            { label: 'About', href: '/about' },
          ],
        },
      ],
      contact: {
        phone: '+92 300 1234567',
        email: 'hello@motoforge.local',
        address: 'Shop 12, Motorcycle Market, Lahore',
      },
      copyright: `© ${new Date().getFullYear()} MotoForge. All rights reserved.`,
    },
  })

  const summary = {
    brands: Object.keys(brandIds).length,
    bikes: Object.keys(bikeIds).length,
    categories: Object.keys(categoryIds).length,
    products: Object.keys(productIds).length,
    mods: MOD_PROJECTS.length,
    blogs: BLOG_POSTS.length,
  }
  console.log('=== Seed complete ===')
  console.log(summary)
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
