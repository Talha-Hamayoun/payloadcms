'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'

import { cn } from '@/utilities/cn'

export type RichTextContentProps = {
  data: unknown
  className?: string
}

export function RichTextContent({ data, className }: RichTextContentProps) {
  if (!data) return null

  return (
    <div
      className={cn(
        'prose prose-neutral max-w-none normal-case tracking-normal text-ink prose-headings:font-[family-name:var(--font-display)] prose-headings:uppercase prose-a:text-accent prose-a:no-underline hover:prose-a:underline',
        className,
      )}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <RichText data={data as any} />
    </div>
  )
}
