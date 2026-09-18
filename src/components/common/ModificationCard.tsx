import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import type { ModificationCardData } from '@/components/types'
import { relationLabel } from '@/components/types'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utilities/cn'
import { getMediaAlt, getMediaUrl } from '@/utilities/media'

export type ModificationCardProps = {
  project: ModificationCardData
  className?: string
}

export function ModificationCard({ project, className }: ModificationCardProps) {
  const afterUrl = getMediaUrl(project.afterImage ?? null)
  const beforeUrl = getMediaUrl(project.beforeImage ?? null)
  const alt = getMediaAlt(project.afterImage ?? project.beforeImage ?? null, project.title)
  const brand = relationLabel(project.bikeBrand)
  const model = relationLabel(project.bikeModel)

  return (
    <Link
      href={`/modifications/${project.slug}`}
      className={cn(
        'group flex flex-col overflow-hidden border border-border bg-ink text-surface',
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-soft">
        {afterUrl ? (
          <Image
            src={afterUrl}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="image-zoom object-cover opacity-90"
          />
        ) : beforeUrl ? (
          <Image src={beforeUrl} alt={alt} fill className="object-cover opacity-80" sizes="33vw" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        {project.featured ? (
          <Badge variant="sale" className="absolute left-3 top-3 z-10">
            Featured
          </Badge>
        ) : null}
        {beforeUrl && afterUrl ? (
          <span className="absolute bottom-3 right-3 z-10 rounded-md bg-ink/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
            Before → After
          </span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        {(brand || model) && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel-light">
            {[brand, model].filter(Boolean).join(' · ')}
          </p>
        )}
        <h3 className="font-display text-lg leading-snug group-hover:text-accent">{project.title}</h3>
        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-semibold uppercase tracking-wider text-accent">
          View build
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
