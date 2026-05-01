import { cache } from 'react'
import { createClient } from 'microcms-js-sdk'
import type { Post } from '@/types/post'

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_ID ?? '',
  apiKey: process.env.MICROCMS_API_KEY ?? '',
})

export const getPosts = cache(async () => {
  const { contents } = await client.getList<Post>({
    endpoint: 'work',
    queries: {
      fields: [
        'id',
        'title',
        'slug',
        'date',
        'category',
        'thumbnail',
      ].join(','),
      limit: 100,
    },
  })
  return contents
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const { contents } = await client.getList<Post>({
    endpoint: 'work',
    queries: {
      filters: `slug[equals]${slug}`,
      fields: [
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
      ].join(','),
      limit: 1,
    },
  })
  return contents[0] ?? null
})
