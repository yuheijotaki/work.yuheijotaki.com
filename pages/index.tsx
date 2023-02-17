import Head from 'next/head'
import { getPosts } from '@/lib/newt'
import type { Post } from '@/types/post'
import Header from '@/components/header'
import Posts from '@/components/posts'
import styles from '@/styles/page/Home.module.scss'

export default function Home({ posts }: { posts: Post[] }) {
  const metaTitle = process.env.siteName
  const metaDescription = 'yuheijotaki Portfolio Website'
  const metaPageUrl = process.env.siteUrl
  const metaSiteName = process.env.siteName
  const metaImage = `${process.env.siteUrl}${process.env.ogImage}`
  const metaType = 'website'
  const metaCard = process.env.metaCard
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:site_name" content={metaSiteName} />
        <meta property="og:url" content={metaPageUrl} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content={metaType} />
        <meta property="og:image" content={metaImage} />
        <meta name="twitter:url" content={metaPageUrl} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:card" content={metaCard} />
        <meta name="twitter:image:src" content={metaImage} />
      </Head>
      <Header>
      </Header>
      <main className={styles.test}>
        <Posts current='' posts={ posts }></Posts>
      </main>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()
  return {
    props: {
      posts,
    },
  }
}
