import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { RichTextContent } from '@/components/common/RichTextContent'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { getBlogPostBySlug } from '@/lib/data/content'
import { formatDate } from '@/utilities/format'
import { buildMetadata } from '@/utilities/seo'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'

export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Article not found' }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    seo: post.seo,
    image: post.featuredImage as import('@/payload-types').Media | undefined,
  })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const imageUrl = getMediaUrl(post.featuredImage ?? null)

  return (
    <Container narrow className="py-8 md:py-12">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} className="mb-6" />

      {post.publishedDate ? (
        <time dateTime={post.publishedDate} className="text-sm uppercase tracking-wider text-steel">
          {formatDate(post.publishedDate)}
        </time>
      ) : null}
      <h1 className="mt-2 text-3xl md:text-4xl normal-case tracking-normal">{post.title}</h1>
      <p className="mt-4 text-lg normal-case tracking-normal text-steel">{post.excerpt}</p>

      {imageUrl ? (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={getMediaAlt(post.featuredImage ?? null, post.title)}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 48rem) 100vw, 48rem"
          />
        </div>
      ) : null}

      <div className="mt-10">
        <RichTextContent data={post.content} />
      </div>
    </Container>
  )
}
