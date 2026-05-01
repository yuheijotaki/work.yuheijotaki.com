export const CATEGORIES = [
  { label: 'Front-end', slug: 'frontend' },
  { label: 'WordPress', slug: 'wordpress' },
  { label: 'Web Design', slug: 'webdesign' },
  { label: 'Tumblr', slug: 'tumblr' },
] as const

export type Category = (typeof CATEGORIES)[number]['label']

export type CategoryFilter = Category | 'all'

export const DEFAULT_CATEGORY: Category = 'Front-end'
