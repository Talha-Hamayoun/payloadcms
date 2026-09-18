import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductGrid } from '@/components/product/ProductGrid'
import { asBikeCards, asProductCards } from '@/utilities/cast'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getBrandBySlug, getBikeModels } from '@/lib/data/catalog'
import { getProducts } from '@/lib/data/products'
import { buildMetadata } from '@/utilities/seo'
import { BikeCard } from '@/components/common/BikeCard'

export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const brand = await getBrandBySlug(slug)
  if (!brand) return { title: 'Brand not found' }

  return buildMetadata({
    title: brand.name,
    description: brand.description,
    path: `/brands/${brand.slug}`,
    seo: brand.seo,
    image: brand.logo as import('@/payload-types').Media | undefined,
  })
}

export default async function BrandDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { page: pageStr } = await searchParams
  const brand = await getBrandBySlug(slug)
  if (!brand) notFound()

  const page = Math.max(1, parseInt(pageStr || '1', 10) || 1)
  const [products, bikes] = await Promise.all([
    getProducts({ brand: slug, page, limit: 12 }),
    getBikeModels({ brand: slug, limit: 12 }),
  ])

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Brands', href: '/brands' }, { label: brand.name }]} className="mb-6" />
      <SectionHeading title={brand.name} subtitle={brand.description || `${products.totalDocs} products`} />

      {bikes.docs.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-lg">Models</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {asBikeCards(bikes.docs).map((bike) => (
              <li key={bike.id ?? bike.slug}>
                <BikeCard bike={bike} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="text-lg">Products</h2>
        <ProductGrid products={asProductCards(products.docs)} className="mt-6" />
      </section>
    </Container>
  )
}
