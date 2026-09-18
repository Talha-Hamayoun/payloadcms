import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { RichTextContent } from '@/components/common/RichTextContent'
import { ProductGrid } from '@/components/product/ProductGrid'
import { asProductCards } from '@/utilities/cast'
import { relationLabel } from '@/components/types'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { getModificationBySlug } from '@/lib/data/content'
import { buildMetadata } from '@/utilities/seo'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'

export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getModificationBySlug(slug)
  if (!project) return { title: 'Project not found' }

  return buildMetadata({
    title: project.title,
    path: `/modifications/${project.slug}`,
    seo: project.seo,
    image: project.afterImage as import('@/payload-types').Media | undefined,
  })
}

export default async function ModificationDetailPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getModificationBySlug(slug)
  if (!project) notFound()

  const brand = relationLabel(project.bikeBrand)
  const model = relationLabel(project.bikeModel)
  const beforeUrl = getMediaUrl(project.beforeImage ?? null)
  const afterUrl = getMediaUrl(project.afterImage ?? null)

  const parts = project.partsUsed
    ? asProductCards(
        (project.partsUsed as unknown[]).filter((p) => typeof p === 'object' && p && 'slug' in p),
      )
    : undefined

  return (
    <Container className="py-8 md:py-12">
      <Breadcrumb
        items={[
          { label: 'Modifications', href: '/modifications' },
          { label: project.title },
        ]}
        className="mb-6"
      />

      <h1 className="text-3xl md:text-4xl normal-case tracking-normal">{project.title}</h1>
      {(brand || model) && (
        <p className="mt-2 text-sm uppercase tracking-wider text-steel">
          {[brand, model].filter(Boolean).join(' · ')}
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {beforeUrl ? (
          <figure>
            <p className="mb-2 text-xs uppercase tracking-wider text-steel">Before</p>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={beforeUrl} alt={getMediaAlt(project.beforeImage ?? null, 'Before')} fill className="object-cover" />
            </div>
          </figure>
        ) : null}
        {afterUrl ? (
          <figure>
            <p className="mb-2 text-xs uppercase tracking-wider text-steel">After</p>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image src={afterUrl} alt={getMediaAlt(project.afterImage ?? null, 'After')} fill className="object-cover" />
            </div>
          </figure>
        ) : null}
      </div>

      <div className="mt-10">
        <RichTextContent data={project.description} />
      </div>

      {parts && parts.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg">Parts used</h2>
          <ProductGrid products={parts} className="mt-6" />
        </section>
      ) : null}
    </Container>
  )
}
