import { ModificationCard } from '@/components/common/ModificationCard'
import type { ModificationCardData } from '@/components/types'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function ModificationShowcase({ projects }: { projects: ModificationCardData[] }) {
  if (projects.length === 0) return null

  return (
    <Section tone="dark">
      <SectionHeading
        eyebrow="Builds"
        title="Modification showcase"
        subtitle="Real projects using parts from the catalog."
        className="[&_p]:text-steel-light"
        action={
          <Button
            href="/modifications"
            variant="outline"
            size="sm"
            className="border-white/25 text-surface hover:bg-white/5"
          >
            All projects
          </Button>
        }
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((p) => (
          <li key={p.slug}>
            <ModificationCard project={p} />
          </li>
        ))}
      </ul>
    </Section>
  )
}
