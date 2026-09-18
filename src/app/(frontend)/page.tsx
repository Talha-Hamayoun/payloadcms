import { BikeFinder } from '@/components/home/BikeFinder'
import { BottomCta } from '@/components/home/BottomCta'
import { AccessoriesSection } from '@/components/home/AccessoriesSection'
import { BlogSection } from '@/components/home/BlogSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { Hero } from '@/components/home/Hero'
import { ModificationShowcase } from '@/components/home/ModificationShowcase'
import { NewArrivals } from '@/components/home/NewArrivals'
import { PopularBrands } from '@/components/home/PopularBrands'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import {
  asBlogCards,
  asBrandCards,
  asCategoryCards,
  asModificationCards,
  asProductCards,
} from '@/utilities/cast'
import { Container } from '@/components/ui/Container'
import { getBrands, getBikeModels, getCategories } from '@/lib/data/catalog'
import { getBlogPosts, getModificationProjects } from '@/lib/data/content'
import {
  getAccessoryProducts,
  getFeaturedProducts,
  getNewArrivals,
} from '@/lib/data/products'
import { getHomepage, getSiteSettings } from '@/lib/data/globals'

export const revalidate = 60

export default async function HomePage() {
  const [
    homepage,
    settings,
    categories,
    brands,
    bikeModels,
    featured,
    accessories,
    modifications,
    newArrivals,
    blog,
  ] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
    getCategories(12),
    getBrands(12),
    getBikeModels({ limit: 200 }),
    getFeaturedProducts(8),
    getAccessoryProducts(8),
    getModificationProjects({ featured: true, limit: 3 }),
    getNewArrivals(8),
    getBlogPosts({ limit: 3 }),
  ])

  const hero = homepage?.hero
  const finderModels = bikeModels.docs.map((m) => ({
    name: m.name,
    slug: m.slug,
    brandSlug:
      typeof m.brand === 'object' && m.brand && 'slug' in m.brand ? m.brand.slug : null,
  }))

  return (
    <>
      <Hero
        headline={hero?.headline || 'Upgrade Your Ride. Ride Your Style.'}
        description={
          hero?.description ||
          'Premium motorcycle spare parts, accessories, and modification components with verified bike compatibility.'
        }
        primaryCtaHref={hero?.primaryCtaHref}
        primaryCtaLabel={hero?.primaryCtaLabel}
        secondaryCtaHref={hero?.secondaryCtaHref}
        secondaryCtaLabel={hero?.secondaryCtaLabel}
        image={hero?.image}
      />

      <div className="relative z-10 -mt-8 md:-mt-16 md:mb-8">
        <Container>
          <BikeFinder
            brands={brands.docs.map((b) => ({ name: b.name, slug: b.slug }))}
            models={finderModels}
            categories={asCategoryCards(categories.docs)}
          />
        </Container>
      </div>

      <CategoryGrid categories={asCategoryCards(categories.docs)} />
      <FeaturedProducts products={asProductCards(featured.docs)} />
      <PopularBrands brands={asBrandCards(brands.docs)} />
      <AccessoriesSection products={asProductCards(accessories.docs)} />
      <ModificationShowcase projects={asModificationCards(modifications.docs)} />
      <NewArrivals products={asProductCards(newArrivals.docs)} />
      <WhyChooseUs items={homepage?.whyChooseUs || []} />
      <BlogSection posts={asBlogCards(blog.docs)} />

      <BottomCta
        headline={homepage?.cta?.headline}
        description={homepage?.cta?.description}
        buttonLabel={homepage?.cta?.buttonLabel}
        whatsappNumber={settings?.whatsappNumber}
        siteName={settings?.siteName || undefined}
      />
    </>
  )
}
