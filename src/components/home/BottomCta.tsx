import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { Section } from '@/components/ui/Section'

export type BottomCtaProps = {
  headline?: string | null
  description?: string | null
  buttonLabel?: string | null
  whatsappNumber?: string | null
  siteName?: string
}

export function BottomCta({
  headline = 'Not sure which part fits your bike?',
  description = 'Talk to our fitment experts on WhatsApp and get the right part first time.',
  buttonLabel = 'Chat on WhatsApp',
  whatsappNumber,
  siteName = 'MotoForge',
}: BottomCtaProps) {
  return (
    <Section tone="dark" className="text-center">
      <div className="divider-accent mx-auto mb-5" />
      <h2 className="font-display text-3xl text-balance md:text-4xl">{headline}</h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-steel-light md:text-lg">
        {description}
      </p>
      {whatsappNumber ? (
        <WhatsAppButton
          phone={whatsappNumber}
          message={`Hi ${siteName}, I need help choosing the right part for my bike.`}
          className="mt-8"
          size="lg"
        >
          {buttonLabel}
        </WhatsAppButton>
      ) : null}
    </Section>
  )
}
