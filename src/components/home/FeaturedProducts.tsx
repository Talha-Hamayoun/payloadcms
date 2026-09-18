import type { ProductCardData } from '@/components/types'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function FeaturedProducts({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) return null

  return (
    <Section tone="default">
      <SectionHeading
        eyebrow="Featured"
        title="Featured products"
        subtitle="Hand-picked parts and upgrades with verified bike fitment."
        action={
          <Button href="/products?featured=1" variant="outline" size="sm">
            View all
          </Button>
        }
      />
      <ProductGrid products={products} />
    </Section>
  )
}
