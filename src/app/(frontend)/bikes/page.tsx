import type { Metadata } from 'next'

import { BikeCard } from '@/components/common/BikeCard'
import { asBikeCards } from '@/utilities/cast'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE_NAME } from '@/constants'
import { getBikeModels } from '@/lib/data/catalog'
import { buildMetadata } from '@/utilities/seo'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: `Bikes · ${SITE_NAME}`,
    description: 'Find parts compatible with your motorcycle model.',
    path: '/bikes',
  })
}

export default async function BikesPage() {
  const { docs } = await getBikeModels({ limit: 100 })

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Bikes' }]} className="mb-6" />
      <SectionHeading title="Bike models" subtitle={`${docs.length} models`} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {asBikeCards(docs).map((bike) => (
          <li key={bike.id ?? bike.slug}>
            <BikeCard bike={bike} />
          </li>
        ))}
      </ul>
    </Container>
  )
}
