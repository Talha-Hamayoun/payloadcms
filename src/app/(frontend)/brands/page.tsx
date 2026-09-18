import type { Metadata } from 'next'

import { BrandCard } from '@/components/common/BrandCard'
import { asBrandCards } from '@/utilities/cast'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE_NAME } from '@/constants'
import { getBrands } from '@/lib/data/catalog'
import { buildMetadata } from '@/utilities/seo'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: `Brands · ${SITE_NAME}`,
    description: 'Shop motorcycle parts by brand.',
    path: '/brands',
  })
}

export default async function BrandsPage() {
  const { docs } = await getBrands()

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Brands' }]} className="mb-6" />
      <SectionHeading title="Brands" subtitle={`${docs.length} brands`} />
      <ul className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {asBrandCards(docs).map((brand) => (
          <li key={brand.id ?? brand.slug}>
            <BrandCard brand={brand} />
          </li>
        ))}
      </ul>
    </Container>
  )
}
