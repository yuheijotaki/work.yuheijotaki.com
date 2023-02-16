import { createClient } from 'newt-client-js'
import type { Post } from '@/types/post'

const client = createClient({
  spaceUid: process.env.NEWT_SPACE_UID + '',
  token: process.env.NEWT_CDN_API_TOKEN + '',
  apiType: 'cdn',
})

export const getPosts = async () => {
  const { items } = await client.getContents<Post>({
    appUid: 'works',
    modelUid: 'post',
    query: {
      select: ['_id', 'title', 'titleCustom', 'slug', 'date', 'url', 'category', 'credit', 'colorBackground', 'colorText', 'colorCustom', 'archive', 'notAvailable', 'thumbnail', 'images'],
    },
  })
  return items
}

export const getPostBySlug = async (slug: string) => {
  const post = await client.getFirstContent<Post>({
    appUid: 'works',
    modelUid: 'post',
    query: {
      slug,
      select: ['_id', 'title', 'titleCustom', 'slug', 'date', 'url', 'category', 'credit', 'colorBackground', 'colorText', 'colorCustom', 'archive', 'notAvailable', 'thumbnail', 'images'],
    },
  })
  return post
}
