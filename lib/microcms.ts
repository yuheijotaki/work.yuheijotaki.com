import { createClient } from 'microcms-js-sdk'
import type { Post } from '@/types/post'

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_ID + '',
  apiKey: process.env.MICROCMS_API_KEY + '',
})

export const getPosts = async () => {
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
}

export const getPostBySlug = async (slug: string) => {
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
  return contents[0] || null
}
