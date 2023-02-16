import Head from 'next/head'
import { getPosts } from '@/lib/newt'
import type { Post } from '@/types/post'
import Header from '@/components/header'
import Posts from '@/components/posts'
import styles from '@/styles/Home.module.scss'

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <>
      <Head>
        <title>Newt・Next.jsブログ</title>
        <meta name="description" content="NewtとNext.jsを利用したブログです" />
      </Head>
      <Header>
      </Header>
      <main className={styles.main}>
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
