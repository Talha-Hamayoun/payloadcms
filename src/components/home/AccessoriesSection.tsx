import type { ProductCardData } from '@/components/types'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function AccessoriesSection({ products }: { products: ProductCardData[] }) {
  if (products.length === 0) return null

  return (
    <Section tone="muted">
      <SectionHeading
        eyebrow="Gear up"
        title="Accessories & riding gear"
        subtitle="Lighting, carriers, helmets, and everyday upgrades."
        action={
          <Button href="/products?type=accessory" variant="outline" size="sm">
            Shop accessories
          </Button>
        }
      />
      <ProductGrid products={products} />
    </Section>
  )
}
