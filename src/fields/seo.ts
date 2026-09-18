import type { Field } from 'payload'

export const slugField = (fieldToUse = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === 'string' && value.length > 0) {
          return slugify(value)
        }
        const source = data?.[fieldToUse]
        if (typeof source === 'string') return slugify(source)
        return value
      },
    ],
  },
})

export const seoFields: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Meta Title',
      admin: {
        description: 'Overrides the default page title for search engines.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Meta Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'OG Image',
    },
    {
      name: 'noIndex',
      type: 'checkbox',
      label: 'No Index',
      defaultValue: false,
      admin: {
        description: 'Prevent search engines from indexing this page.',
      },
    },
  ],
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
