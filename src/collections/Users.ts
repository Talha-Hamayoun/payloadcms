import type { CollectionConfig } from 'payload'

import { adminFieldAccess, adminOnly, adminOrSelf } from '@/access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'active'],
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: adminOnly,
    delete: adminOnly,
    read: adminOrSelf,
    update: adminOrSelf,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        create: adminFieldAccess,
        update: adminFieldAccess,
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      access: {
        create: adminFieldAccess,
        update: adminFieldAccess,
      },
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
