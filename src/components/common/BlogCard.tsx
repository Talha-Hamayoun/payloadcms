import Image from 'next/image'
import Link from 'next/link'

import type { BlogCardData } from '@/components/types'
import { relationLabel } from '@/components/types'
import { cn } from '@/utilities/cn'
import { formatDate } from '@/utilities/format'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'

export type BlogCardProps = {
  post: BlogCardData
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  const imageUrl = getMediaUrl(post.featuredImage ?? null)
  const alt = getMediaAlt(post.featuredImage ?? null, post.title)
  const categoryName = post.categories?.[0] ? relationLabel(post.categories[0], 'name') : null

  return (
    <article className={cn('group flex h-full flex-col border border-border bg-surface', className)}>
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="image-zoom object-cover"
          />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-steel">
          {categoryName ? <span className="text-accent">{categoryName}</span> : null}
          {post.publishedDate ? (
            <time dateTime={post.publishedDate}>{formatDate(post.publishedDate)}</time>
          ) : null}
        </div>
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={`/blog/${post.slug}`} className="hover:text-accent">
            {post.title}
          </Link>
        </h3>
        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-steel">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="pt-2 text-xs font-semibold uppercase tracking-wider text-accent hover:text-accent-hover"
        >
          Read more →
        </Link>
      </div>
    </article>
  )
}
