import type { ProductCardData } from '@/components/types'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function NewArrivals({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) return null

  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="Just in"
        title="New arrivals"
        subtitle="Fresh stock for daily riders and weekend builders."
        action={
          <Button href="/products?new=1" variant="outline" size="sm">
            See new
          </Button>
        }
      />
      <ProductGrid products={products} />
    </Section>
  )
}
