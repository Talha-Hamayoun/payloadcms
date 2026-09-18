import type { CollectionConfig } from 'payload'

import { activeOnly, adminOrEditor } from '@/access'
import { seoFields, slugField } from '@/fields/seo'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'active', 'updatedAt'],
  },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: activeOnly,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    slugField('name'),
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
    seoFields,
  ],
}
