import type { CollectionConfig } from 'payload'

import { adminOrEditor, publishedOnly } from '@/access'
import { seoFields, slugField } from '@/fields/seo'

export const ModificationProjects: CollectionConfig = {
  slug: 'modification-projects',
  labels: {
    singular: 'Modification Project',
    plural: 'Modification Projects',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'bikeBrand', 'modificationType', 'featured', '_status'],
  },
  versions: {
    drafts: true,
  },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: publishedOnly,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'bikeBrand',
      type: 'relationship',
      relationTo: 'brands',
      required: true,
      index: true,
    },
    {
      name: 'bikeModel',
      type: 'relationship',
      relationTo: 'bike-models',
      required: true,
      index: true,
    },
    {
      name: 'beforeImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'afterImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'partsUsed',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      label: 'Parts Used',
    },
    {
      name: 'estimatedCost',
      type: 'number',
      min: 0,
      admin: { position: 'sidebar' },
    },
    {
      name: 'modificationType',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Cafe Racer', value: 'cafe-racer' },
        { label: 'Custom', value: 'custom' },
        { label: 'Touring', value: 'touring' },
        { label: 'Performance', value: 'performance' },
        { label: 'Cosmetic', value: 'cosmetic' },
        { label: 'Restoration', value: 'restoration' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    seoFields,
  ],
}
