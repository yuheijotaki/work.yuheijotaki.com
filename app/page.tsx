import type { Metadata } from 'next'
import { getPosts } from '@/lib/microcms'
import { SITE_URL, SITE_NAME, OG_IMAGE, TWITTER_CARD } from '@/lib/site'
import HomeClient from './HomeClient'

const description = 'yuheijotaki Portfolio Website'

export const metadata: Metadata = {
  title: SITE_NAME,
  description,
  openGraph: {
    siteName: SITE_NAME,
    url: SITE_URL,
    title: SITE_NAME,
    description,
    type: 'website',
    images: OG_IMAGE,
  },
  twitter: {
    card: TWITTER_CARD,
    title: SITE_NAME,
    description,
    images: OG_IMAGE,
  },
}

export const revalidate = 60 // 60秒ごとに再生成

export default async function Home() {
  const posts = await getPosts()

  return <HomeClient posts={posts} />
}
