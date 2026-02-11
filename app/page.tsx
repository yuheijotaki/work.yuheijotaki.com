import type { Metadata } from 'next'
import { getPosts } from '@/lib/microcms'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'work.yuheijotaki.com',
  description: 'yuheijotaki Portfolio Website',
  openGraph: {
    siteName: 'work.yuheijotaki.com',
    url: 'https://work.yuheijotaki.com/',
    title: 'work.yuheijotaki.com',
    description: 'yuheijotaki Portfolio Website',
    type: 'website',
    images: 'img/meta/ogp.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'work.yuheijotaki.com',
    description: 'yuheijotaki Portfolio Website',
    images: 'img/meta/ogp.png',
  },
}

export const revalidate = 60 // 60秒ごとに再生成

export default async function Home() {
  const posts = await getPosts()

  return <HomeClient posts={posts} />
}
