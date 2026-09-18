export const SITE_NAME = 'MotoForge'
export const DEFAULT_REVALIDATE = 60

export const PRODUCT_TYPE_LABELS: Record<string, string> = {
  'spare-part': 'Spare Part',
  accessory: 'Accessory',
  decoration: 'Decoration',
  modification: 'Modification',
  performance: 'Performance Part',
  'riding-gear': 'Riding Gear',
  maintenance: 'Maintenance Product',
}

export const AVAILABILITY_LABELS: Record<string, string> = {
  'in-stock': 'In Stock',
  'out-of-stock': 'Out of Stock',
  'pre-order': 'Pre-Order',
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name' },
] as const

export const DEFAULT_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Spare Parts', href: '/products?type=spare-part' },
  { label: 'Accessories', href: '/products?type=accessory' },
  { label: 'Modifications', href: '/modifications' },
  { label: 'Brands', href: '/brands' },
  { label: 'Bikes', href: '/bikes' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]
