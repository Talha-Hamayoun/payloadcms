import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import type { Media } from '@/payload-types'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'

export type HeroProps = {
  headline: string
  description: string
  primaryCtaLabel?: string | null
  primaryCtaHref?: string | null
  secondaryCtaLabel?: string | null
  secondaryCtaHref?: string | null
  image?: Media | string | number | null
}

export function Hero({
  headline,
  description,
  primaryCtaLabel = 'Explore Parts',
  primaryCtaHref = '/products',
  secondaryCtaLabel = 'Browse Accessories',
  secondaryCtaHref = '/products?type=accessory',
  image,
}: HeroProps) {
  const imageUrl = getMediaUrl(image ?? null)
  const alt = getMediaAlt(image ?? null, headline)

  return (
    <section className="relative overflow-hidden bg-ink text-surface">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
      ) : null}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/35"
        aria-hidden
      />
      <Container className="relative flex min-h-[min(72vh,34rem)] flex-col justify-center py-16 md:min-h-[28rem] md:py-20 lg:py-24">
        <div className="max-w-xl">
          <div className="divider-accent mb-5" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Motorcycle parts & builds
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.05] text-balance md:text-5xl lg:text-[3.35rem]">
            {headline}
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-steel-light md:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {primaryCtaHref && primaryCtaLabel ? (
              <Button href={primaryCtaHref} size="lg">
                {primaryCtaLabel}
              </Button>
            ) : null}
            {secondaryCtaHref && secondaryCtaLabel ? (
              <Button
                href={secondaryCtaHref}
                variant="outline"
                size="lg"
                className="border-white/25 text-surface hover:border-white/50 hover:bg-white/5"
              >
                {secondaryCtaLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  )
}
