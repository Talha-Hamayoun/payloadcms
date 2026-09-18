import type { CollectionConfig } from 'payload'

import { activeOnly, adminOrEditor } from '@/access'
import { slugField } from '@/fields/seo'

export const BikeModels: CollectionConfig = {
  slug: 'bike-models',
  labels: {
    singular: 'Bike Model',
    plural: 'Bike Models',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'brand', 'engineCapacity', 'active'],
  },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: activeOnly,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      required: true,
      index: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Model Name',
    },
    slugField('name'),
    {
      name: 'yearFrom',
      type: 'number',
      label: 'Year From',
      admin: { position: 'sidebar' },
    },
    {
      name: 'yearTo',
      type: 'number',
      label: 'Year To',
      admin: { position: 'sidebar' },
    },
    {
      name: 'engineCapacity',
      type: 'text',
      label: 'Engine Capacity',
      admin: {
        description: 'e.g. 125cc',
      },
    },
    {
      name: 'image',
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
  ],
}
