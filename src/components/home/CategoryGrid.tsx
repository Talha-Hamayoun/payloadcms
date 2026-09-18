import { CategoryCard } from '@/components/common/CategoryCard'
import type { CategoryCardData } from '@/components/types'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export type CategoryGridProps = {
  categories: CategoryCardData[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) return null

  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="Catalog"
        title="Shop by category"
        subtitle="Engine, brakes, electrical, body, accessories, and performance — organized for your build."
        action={
          <Button href="/categories" variant="outline" size="sm">
            All categories
          </Button>
        }
      />
      <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {categories.slice(0, 8).map((cat) => (
          <li key={cat.slug}>
            <CategoryCard category={cat} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
