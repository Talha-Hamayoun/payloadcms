import { CheckCircle2, Gauge, Headphones, Layers } from 'lucide-react'

import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export type WhyItem = {
  title: string
  description: string
  icon?: 'quality' | 'compatibility' | 'support' | 'range' | string | null
}

const iconMap = {
  quality: CheckCircle2,
  compatibility: Layers,
  support: Headphones,
  range: Gauge,
} as const

export function WhyChooseUs({ items }: { items: WhyItem[] }) {
  if (!items.length) return null

  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="The difference"
        title="Why choose us"
        subtitle="Built for riders who expect fitment you can trust."
      />
      <ul className="grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] ?? CheckCircle2
          return (
            <li key={item.title} className="bg-surface p-6 md:p-7">
              <Icon className="size-7 text-accent" aria-hidden />
              <h3 className="mt-4 font-display text-base">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel">{item.description}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
