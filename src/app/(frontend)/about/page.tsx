import type { Metadata } from 'next'
import { CheckCircle2, Gauge, Headphones, Layers } from 'lucide-react'

import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { Button } from '@/components/ui/Button'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { SITE_NAME } from '@/constants'
import { getSiteSettings } from '@/lib/data/globals'
import { buildMetadata } from '@/utilities/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: `About · ${SITE_NAME}`,
    description: 'Learn about our motorcycle parts platform and fitment promise.',
    path: '/about',
  })
}

const pillars = [
  {
    title: 'Quality parts',
    description: 'Inspected components from trusted motorcycle suppliers.',
    icon: CheckCircle2,
  },
  {
    title: 'Bike compatibility',
    description: 'Filter by brand and model for confident fitment.',
    icon: Layers,
  },
  {
    title: 'Expert support',
    description: 'WhatsApp guidance when you are unsure what fits.',
    icon: Headphones,
  },
  {
    title: 'Wide range',
    description: 'From daily maintenance to full custom builds.',
    icon: Gauge,
  },
]

export default async function AboutPage() {
  const settings = await getSiteSettings()
  const name = settings?.siteName || SITE_NAME

  return (
    <>
      <section className="bg-ink text-surface">
        <Container className="py-16 md:py-20">
          <Breadcrumb
            items={[{ label: 'About' }]}
            className="mb-8 [&_a]:text-steel-light [&_span]:text-surface"
          />
          <div className="divider-accent mb-5" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Our story</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">About {name}</h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-steel-light md:text-lg">
            We supply premium motorcycle spare parts, accessories, decoration kits, and modification
            components with verified compatibility for popular brands and models.
          </p>
        </Container>
      </section>

      <Section tone="surface">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">Mission</h2>
            <p className="mt-4 text-base leading-relaxed text-steel">
              Every listing is checked for fitment data, clear pricing, and stock status so you can
              order with confidence — whether you ride daily or you&apos;re building a show bike.
            </p>
            {settings?.address ? (
              <p className="mt-6 text-sm text-steel">
                <span className="font-semibold text-ink">Location:</span> {settings.address}
              </p>
            ) : null}
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {pillars.map((item) => (
              <li key={item.title} className="border border-border bg-paper p-5">
                <item.icon className="size-6 text-accent" aria-hidden />
                <h3 className="mt-3 font-display text-sm">{item.title}</h3>
                <p className="mt-2 text-sm text-steel">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button href="/products" size="lg">
            Explore parts
          </Button>
          {settings?.whatsappNumber ? (
            <WhatsAppButton
              phone={settings.whatsappNumber}
              message={`Hi ${name}, I'd like to know more about your parts.`}
              size="lg"
              variant="outline"
            />
          ) : (
            <Button href="/contact" variant="outline" size="lg">
              Contact us
            </Button>
          )}
        </div>
      </Section>
    </>
  )
}
