import type { Metadata } from 'next'

import { ModificationCard } from '@/components/common/ModificationCard'
import { asModificationCards } from '@/utilities/cast'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { Pagination } from '@/components/ui/Pagination'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE_NAME } from '@/constants'
import { getModificationProjects } from '@/lib/data/content'
import { buildMetadata } from '@/utilities/seo'

export const revalidate = 60

type PageProps = {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: `Modifications · ${SITE_NAME}`,
    description: 'Real motorcycle modification projects and builds.',
    path: '/modifications',
  })
}

export default async function ModificationsPage({ searchParams }: PageProps) {
  const { page: pageStr } = await searchParams
  const page = Math.max(1, parseInt(pageStr || '1', 10) || 1)
  const result = await getModificationProjects({ page, limit: 12 })

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Modifications' }]} className="mb-6" />
      <SectionHeading title="Modification projects" subtitle={`${result.totalDocs} builds`} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {asModificationCards(result.docs).map((p) => (
          <li key={p.id ?? p.slug}>
            <ModificationCard project={p} />
          </li>
        ))}
      </ul>
      <Pagination
        page={result.page ?? page}
        totalPages={result.totalPages}
        pathname="/modifications"
        className="mt-10"
      />
    </Container>
  )
}
