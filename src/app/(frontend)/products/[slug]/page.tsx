import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/common/JsonLd'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { RichTextContent } from '@/components/common/RichTextContent'
import { CompatibilityBadge } from '@/components/common/CompatibilityBadge'
import { PriceDisplay } from '@/components/common/PriceDisplay'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductGrid } from '@/components/product/ProductGrid'
import { asProductCards } from '@/utilities/cast'
import { relationLabel } from '@/components/types'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import {
  AVAILABILITY_LABELS,
  PRODUCT_TYPE_LABELS,
} from '@/constants'
import { getProductBySlug, getRelatedProducts } from '@/lib/data/products'
import { getSiteSettings } from '@/lib/data/globals'
import { breadcrumbJsonLd, productJsonLd } from '@/utilities/jsonld'
import { buildMetadata } from '@/utilities/seo'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Product not found' }

  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/products/${product.slug}`,
    seo: product.seo,
    image: product.images?.[0]?.image as import('@/payload-types').Media | undefined,
  })
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const [related, settings] = await Promise.all([
    getRelatedProducts(product, 4),
    getSiteSettings(),
  ])

  const category = product.category
  const categorySlug = typeof category === 'object' && category && 'slug' in category ? category.slug : null
  const categoryName = relationLabel(category)
  const brandName = relationLabel(product.brand)
  const typeLabel = PRODUCT_TYPE_LABELS[product.productType] || product.productType

  const crumbs = [
    { label: 'Products', href: '/products' },
    ...(categoryName && categorySlug
      ? [{ label: categoryName, href: `/categories/${categorySlug}` }]
      : []),
    { label: product.name },
  ]

  const waMessage = `Hi, I'm interested in ${product.name} (SKU: ${product.sku}).`

  return (
    <Container className="py-8 md:py-12">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            ...(categoryName && categorySlug
              ? [{ name: categoryName, path: `/categories/${categorySlug}` }]
              : []),
            { name: product.name, path: `/products/${product.slug}` },
          ]),
          productJsonLd({
            name: product.name,
            description: product.shortDescription,
            slug: product.slug,
            sku: product.sku,
            regularPrice: product.regularPrice,
            salePrice: product.salePrice,
            availability: product.availability,
            image: product.images?.[0]?.image,
          }),
        ]}
      />

      <Breadcrumb items={crumbs} className="mb-6" />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <ProductGallery images={product.images || []} productName={product.name} />

        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-steel">
            {[brandName, typeLabel].filter(Boolean).join(' · ')}
          </p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">{product.name}</h1>
          <p className="mt-2 text-sm text-steel">SKU: {product.sku}</p>
          <p className="mt-4 text-base normal-case tracking-normal text-steel">{product.shortDescription}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <PriceDisplay regularPrice={product.regularPrice} salePrice={product.salePrice} size="lg" />
            <Badge variant={product.availability === 'in-stock' ? 'stock' : 'default'}>
              {AVAILABILITY_LABELS[product.availability] ?? product.availability}
            </Badge>
          </div>

          <CompatibilityBadge models={product.compatibleModels} variant="list" className="mt-6" />

          {settings?.whatsappNumber ? (
            <WhatsAppButton
              phone={settings.whatsappNumber}
              message={waMessage}
              className="mt-6"
              size="lg"
            >
              Order via WhatsApp
            </WhatsAppButton>
          ) : null}

          {product.features && product.features.length > 0 ? (
            <div className="mt-8">
              <h2 className="text-sm">Features</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm normal-case tracking-normal text-steel">
                {(product.features as { id?: string; feature: string }[]).map((f) => (
                  <li key={f.id ?? f.feature}>{f.feature}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      {product.specifications && product.specifications.length > 0 ? (
        <section className="mt-12">
          <SectionHeading as="h2" title="Specifications" />
          <dl className="mt-6 divide-y divide-paper-muted rounded-lg border border-steel-light/70 bg-white">
            {(product.specifications as { id?: string; label: string; value: string }[]).map((row) => (
              <div key={row.id ?? row.label} className="grid grid-cols-1 gap-1 px-4 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-steel">{row.label}</dt>
                <dd className="sm:col-span-2 text-sm normal-case tracking-normal">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {product.description ? (
        <section className="mt-12">
          <SectionHeading as="h2" title="Description" />
          <div className="mt-6">
            <RichTextContent data={product.description} />
          </div>
        </section>
      ) : null}

      {product.installationInfo ? (
        <section className="mt-12">
          <SectionHeading as="h2" title="Installation" />
          <div className="mt-6">
            <RichTextContent data={product.installationInfo} />
          </div>
        </section>
      ) : null}

      {related.docs.length > 0 ? (
        <section className="mt-16">
          <SectionHeading as="h2" title="Related products" />
          <ProductGrid products={asProductCards(related.docs)} className="mt-8" />
        </section>
      ) : null}
    </Container>
  )
}
