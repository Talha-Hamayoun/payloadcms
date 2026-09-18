import type { Metadata } from 'next'

import { BlogCard } from '@/components/common/BlogCard'
import { asBlogCards } from '@/utilities/cast'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { Pagination } from '@/components/ui/Pagination'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { SITE_NAME } from '@/constants'
import { getBlogPosts } from '@/lib/data/content'
import { buildMetadata } from '@/utilities/seo'

export const revalidate = 60

type PageProps = {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: `Blog · ${SITE_NAME}`,
    description: 'Motorcycle maintenance, builds, and riding tips.',
    path: '/blog',
  })
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { page: pageStr } = await searchParams
  const page = Math.max(1, parseInt(pageStr || '1', 10) || 1)
  const result = await getBlogPosts({ page, limit: 9 })

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Blog' }]} className="mb-6" />
      <SectionHeading title="Blog" subtitle={`${result.totalDocs} articles`} />
      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {asBlogCards(result.docs).map((post) => (
          <li key={post.id ?? post.slug}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
      <Pagination
        page={result.page ?? page}
        totalPages={result.totalPages}
        pathname="/blog"
        className="mt-10"
      />
    </Container>
  )
}
