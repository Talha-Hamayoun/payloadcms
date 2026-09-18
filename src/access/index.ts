import type { Access, FieldAccess } from 'payload'

import type { User } from '@/payload-types'

export const isAdmin = (user?: User | null): boolean => user?.role === 'admin'

export const isEditorOrAdmin = (user?: User | null): boolean =>
  Boolean(user && (user.role === 'admin' || user.role === 'editor'))

export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const adminOnly: Access = ({ req: { user } }) => isAdmin(user as User | null)

export const adminOrEditor: Access = ({ req: { user } }) =>
  isEditorOrAdmin(user as User | null)

export const anyone: Access = () => true

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (isAdmin(user as User)) return true
  return { id: { equals: user.id } }
}

export const adminFieldAccess: FieldAccess = ({ req: { user } }) =>
  isAdmin(user as User | null)

export const publishedOnly: Access = ({ req: { user } }) => {
  if (isEditorOrAdmin(user as User | null)) return true
  return { _status: { equals: 'published' } }
}

export const activeOnly: Access = ({ req: { user } }) => {
  if (isEditorOrAdmin(user as User | null)) return true
  return { active: { equals: true } }
}
