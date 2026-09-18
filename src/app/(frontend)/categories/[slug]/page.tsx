import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductGrid } from '@/components/product/ProductGrid'
import { asProductCards } from '@/utilities/cast'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { getCategoryBySlug } from '@/lib/data/catalog'
import { getProducts } from '@/lib/data/products'
import { buildMetadata } from '@/utilities/seo'

export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) return { title: 'Category not found' }

  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/categories/${category.slug}`,
    seo: category.seo,
    image: category.image as import('@/payload-types').Media | undefined,
  })
}

export default async function CategoryDetailPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { page: pageStr } = await searchParams
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()

  const page = Math.max(1, parseInt(pageStr || '1', 10) || 1)
  const products = await getProducts({ category: slug, page, limit: 12 })

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb
        items={[
          { label: 'Categories', href: '/categories' },
          { label: category.name },
        ]}
        className="mb-6"
      />
      <SectionHeading title={category.name} subtitle={category.description || `${products.totalDocs} products`} />
      <ProductGrid products={asProductCards(products.docs)} className="mt-8" />
    </Container>
  )
}
