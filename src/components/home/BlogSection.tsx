import { BlogCard } from '@/components/common/BlogCard'
import type { BlogCardData } from '@/components/types'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function BlogSection({ posts }: { posts: BlogCardData[] }) {
  if (posts.length === 0) return null

  return (
    <Section tone="default">
      <SectionHeading
        eyebrow="Guides"
        title="From the blog"
        subtitle="Maintenance tips, buying guides, and build ideas."
        action={
          <Button href="/blog" variant="outline" size="sm">
            All articles
          </Button>
        }
      />
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <li key={post.slug}>
            <BlogCard post={post} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
