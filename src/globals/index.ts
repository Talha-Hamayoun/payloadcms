import type { GlobalConfig } from 'payload'

import { adminOrEditor, anyone } from '@/access'

const linkFields = [
  {
    name: 'label',
    type: 'text' as const,
    required: true,
  },
  {
    name: 'href',
    type: 'text' as const,
    required: true,
  },
  {
    name: 'openInNewTab',
    type: 'checkbox' as const,
    defaultValue: false,
  },
]

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: anyone,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navigation',
      type: 'array',
      fields: linkFields,
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'href', type: 'text' },
      ],
    },
    {
      name: 'announcement',
      type: 'text',
      label: 'Announcement Text',
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
    update: adminOrEditor,
  },
  fields: [
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
      name: 'columns',
      type: 'array',
      label: 'Navigation Columns',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: linkFields,
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'address', type: 'textarea' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'X / Twitter', value: 'x' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
    },
  ],
}

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: anyone,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'MotoForge',
    },
    {
      name: 'siteLogo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contactNumber',
      type: 'text',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      admin: {
        description: 'Include country code without +, e.g. 923001234567',
      },
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'address',
      type: 'textarea',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'X / Twitter', value: 'x' },
          ],
        },
        { name: 'url', type: 'text', required: true },
      ],
    },
    {
      name: 'defaultSeo',
      type: 'group',
      label: 'Default SEO',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: anyone,
    update: adminOrEditor,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'headline', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Explore Parts' },
        { name: 'primaryCtaHref', type: 'text', defaultValue: '/products' },
        { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'Browse Accessories' },
        { name: 'secondaryCtaHref', type: 'text', defaultValue: '/products?type=accessory' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'whyChooseUs',
      type: 'array',
      maxRows: 6,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Quality', value: 'quality' },
            { label: 'Compatibility', value: 'compatibility' },
            { label: 'Support', value: 'support' },
            { label: 'Range', value: 'range' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Bottom CTA',
      fields: [
        {
          name: 'headline',
          type: 'text',
          defaultValue: 'Not sure which part fits your bike?',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Talk to our fitment experts on WhatsApp and get the right part first time.',
        },
        { name: 'buttonLabel', type: 'text', defaultValue: 'Chat on WhatsApp' },
      ],
    },
  ],
}
