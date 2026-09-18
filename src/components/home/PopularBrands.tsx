import { BrandCard } from '@/components/common/BrandCard'
import type { BrandCardData } from '@/components/types'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function PopularBrands({ brands }: { brands: BrandCardData[] }) {
  if (brands.length === 0) return null

  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="OEM & trusted"
        title="Popular brands"
        subtitle="Parts catalogued by manufacturer for confident fitment."
        action={
          <Button href="/brands" variant="outline" size="sm">
            All brands
          </Button>
        }
      />
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {brands.slice(0, 6).map((brand) => (
          <li key={brand.slug}>
            <BrandCard brand={brand} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
