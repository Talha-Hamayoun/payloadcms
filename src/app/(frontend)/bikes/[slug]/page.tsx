import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductGrid } from '@/components/product/ProductGrid'
import { asProductCards } from '@/utilities/cast'
import { relationLabel } from '@/components/types'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getBikeModelBySlug } from '@/lib/data/catalog'
import { getCompatibleProducts } from '@/lib/data/products'
import { yearRange } from '@/utilities/format'
import { buildMetadata } from '@/utilities/seo'
import { getMediaUrl } from '@/utilities/media'
import Image from 'next/image'
import { getMediaAlt } from '@/utilities/media'

export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string; category?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const bike = await getBikeModelBySlug(slug)
  if (!bike) return { title: 'Bike not found' }

  return buildMetadata({
    title: bike.name,
    description: `Compatible parts for ${bike.name}.`,
    path: `/bikes/${bike.slug}`,
    image: bike.image as import('@/payload-types').Media | undefined,
  })
}

export default async function BikeDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { category } = await searchParams
  const bike = await getBikeModelBySlug(slug)
  if (!bike) notFound()

  const products = await getCompatibleProducts(slug, category, 24)
  const brandName = relationLabel(bike.brand)
  const years = yearRange(bike.yearFrom, bike.yearTo)
  const imageUrl = getMediaUrl(bike.image ?? null)

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Bikes', href: '/bikes' }, { label: bike.name }]} className="mb-6" />

      <div className="grid gap-8 lg:grid-cols-[min(100%,18rem)_1fr] lg:items-start">
        {imageUrl ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-steel-light/70 bg-white">
            <Image
              src={imageUrl}
              alt={getMediaAlt(bike.image ?? null, bike.name)}
              fill
              className="object-cover"
              sizes="18rem"
            />
          </div>
        ) : null}
        <div>
          <SectionHeading
            as="h1"
            title={bike.name}
            subtitle={[brandName, bike.engineCapacity, years].filter(Boolean).join(' · ')}
          />
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-lg">Compatible products</h2>
        <ProductGrid products={asProductCards(products.docs)} className="mt-6" />
      </section>
    </Container>
  )
}
