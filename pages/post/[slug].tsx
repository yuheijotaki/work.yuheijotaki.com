import Head from 'next/head'
import Link from 'next/link'
import { getPosts, getPostBySlug } from '@/lib/newt'
import type { Post } from '@/types/post'
import Header from '@/components/header'
import Posts from '@/components/posts'
import nl2br from 'react-nl2br'
import styles from '@/styles/Post.module.scss'

// export default function Home({ posts }: { posts: Post[] }) {
export default function Post({ post, posts }: { post: Post, posts: Post[] }) {
  const metaTitle = `${post.title} | ${process.env.siteName}`
  const metaDescription = `${post.title} Webサイトの構築事例紹介です。`
  const metaPageUrl = `${process.env.siteUrl}post/${post.slug}/`
  const metaSiteName = process.env.siteName
  const metaImage = post.thumbnail.src
  const metaType = 'article'
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
      <main>
        <h1 className={styles.test}>{post.title}</h1>
        <p>{nl2br(post.titleCustom)}</p>
        <p>{post.slug}</p>
        <p>{post.date}</p>
        <p>{post.url}</p>
        <p>{post.categories.map((object: { name: string }) => object.name).join(', ')}</p>
        <p>{nl2br(post.credit)}</p>
        <p>{post.colorBackground}</p>
        <p>{post.colorText}</p>
        <p>{post.colorCustom}</p>
        <p>{post.archive
          ? 'archive true'
          : 'archive false'
        }</p>
        <p>{post.notAvailable
          ? 'notAvailable true'
          : 'notAvailable false'
        }</p>
        {/* <p>{post.thumbnail.src}</p> */}
        <ul>
          {post.images.map((object, index) => {
            return (<li key={index}><img src={object.src} alt={object.title} width='100' /></li>)
          })}
        </ul>


      </main>

      <Posts current={post.slug} posts={ posts }></Posts>
      <p><Link href={'/'}>Back to Index</Link></p>
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
  const posts = await getPosts()
  return {
    props: {
      post,
      posts,
    },
  }
}
