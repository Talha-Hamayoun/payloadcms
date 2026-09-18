import type { CollectionConfig } from 'payload'

import { activeOnly, adminOrEditor } from '@/access'
import { seoFields, slugField } from '@/fields/seo'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'sku', 'category', 'brand', 'regularPrice', 'active'],
  },
  access: {
    create: adminOrEditor,
    delete: adminOrEditor,
    read: activeOnly,
    update: adminOrEditor,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'General',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Product Name',
            },
            slugField('name'),
            {
              name: 'sku',
              type: 'text',
              required: true,
              unique: true,
              index: true,
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              required: true,
            },
            {
              name: 'description',
              type: 'richText',
              label: 'Full Description',
            },
            {
              name: 'productType',
              type: 'select',
              required: true,
              index: true,
              options: [
                { label: 'Spare Part', value: 'spare-part' },
                { label: 'Accessory', value: 'accessory' },
                { label: 'Decoration', value: 'decoration' },
                { label: 'Modification', value: 'modification' },
                { label: 'Performance Part', value: 'performance' },
                { label: 'Riding Gear', value: 'riding-gear' },
                { label: 'Maintenance Product', value: 'maintenance' },
              ],
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
              index: true,
            },
            {
              name: 'subcategory',
              type: 'relationship',
              relationTo: 'categories',
              index: true,
            },
            {
              name: 'brand',
              type: 'relationship',
              relationTo: 'brands',
              required: true,
              index: true,
            },
            {
              name: 'compatibleModels',
              type: 'relationship',
              relationTo: 'bike-models',
              hasMany: true,
              index: true,
              label: 'Compatible Bike Models',
              admin: {
                description: 'Select all motorcycle models this product fits.',
              },
            },
          ],
        },
        {
          label: 'Pricing & Stock',
          fields: [
            {
              name: 'regularPrice',
              type: 'number',
              required: true,
              min: 0,
              index: true,
            },
            {
              name: 'salePrice',
              type: 'number',
              min: 0,
              index: true,
            },
            {
              name: 'availability',
              type: 'select',
              required: true,
              defaultValue: 'in-stock',
              index: true,
              options: [
                { label: 'In Stock', value: 'in-stock' },
                { label: 'Out of Stock', value: 'out-of-stock' },
                { label: 'Pre-Order', value: 'pre-order' },
              ],
            },
            {
              name: 'stockStatus',
              type: 'text',
              admin: {
                description: 'Optional note, e.g. "Limited stock" or "Ships in 3 days".',
              },
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            {
              name: 'images',
              type: 'array',
              label: 'Gallery',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              name: 'specifications',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'value', type: 'text', required: true },
              ],
            },
            {
              name: 'features',
              type: 'array',
              fields: [{ name: 'feature', type: 'text', required: true }],
            },
            {
              name: 'installationInfo',
              type: 'richText',
              label: 'Installation Information',
            },
          ],
        },
        {
          label: 'SEO',
          fields: [seoFields],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'newArrival',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'bestSeller',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      index: true,
      admin: { position: 'sidebar' },
    },
  ],
}
