import { cache } from 'react'
import { createClient } from 'microcms-js-sdk'
import type { PostListItem, PostDetail } from '@/types/post'

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_ID ?? '',
  apiKey: process.env.MICROCMS_API_KEY ?? '',
})

const LIST_FIELDS = [
  'id',
  'title',
  'slug',
  'date',
  'category',
  'thumbnail',
] as const satisfies readonly (keyof PostListItem)[]

const DETAIL_FIELDS = [
  'id',
  'title',
  'slug',
  'date',
  'url',
  'category',
  'credit',
  'colorText',
  'archive',
  'notAvailable',
  'thumbnail',
  'images',
] as const satisfies readonly (keyof PostDetail)[]

export const getPosts = cache(async () => {
  const { contents } = await client.getList<PostListItem>({
    endpoint: 'work',
    queries: {
      fields: LIST_FIELDS.join(','),
      limit: 100,
    },
  })
  return contents
})

export const getPostBySlug = cache(async (slug: string): Promise<PostDetail | null> => {
  const { contents } = await client.getList<PostDetail>({
    endpoint: 'work',
    queries: {
      filters: `slug[equals]${slug}`,
      fields: DETAIL_FIELDS.join(','),
      limit: 1,
    },
  })
  return contents[0] ?? null
})
