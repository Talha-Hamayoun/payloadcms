import type { Metadata } from 'next'

import { CategoryCard } from '@/components/common/CategoryCard'
import { asCategoryCards } from '@/utilities/cast'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE_NAME } from '@/constants'
import { getCategories } from '@/lib/data/catalog'
import { buildMetadata } from '@/utilities/seo'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: `Categories · ${SITE_NAME}`,
    description: 'Browse motorcycle parts by category.',
    path: '/categories',
  })
}

export default async function CategoriesPage() {
  const { docs } = await getCategories()

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Categories' }]} className="mb-6" />
      <SectionHeading title="Categories" subtitle={`${docs.length} categories`} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {asCategoryCards(docs).map((cat) => (
          <li key={cat.id ?? cat.slug}>
            <CategoryCard category={cat} />
          </li>
        ))}
      </ul>
    </Container>
  )
}
