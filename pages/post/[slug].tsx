import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { getPosts, getPostBySlug } from '@/lib/newt'
import type { Post } from '@/types/post'

export default function Post({ post }: { post: Post }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content="投稿詳細ページです" />
      </Head>
      <main className={styles.main}>
        <h1>{post.title}</h1>
        <p>{post._id}</p>
        <p>{post.slug}</p>
        {/* <div dangerouslySetInnerHTML={{ __html: post.body }} /> */}
      </main>
    </>
  )
}

export const getStaticPaths = async () => {
  const posts = await getPosts()
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const { slug } = params
  const post = await getPostBySlug(slug)
  return {
    props: {
      post,
    },
  }
}
