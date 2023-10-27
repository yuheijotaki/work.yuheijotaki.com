import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts, getPostBySlug } from '@/lib/newt'
import { createGlobalStyle } from 'styled-components'
import nl2br from 'react-nl2br'
import type { Post } from '@/types/post'
import Header from '@/components/header'
import Posts from '@/components/posts'
import styles from '@/styles/page/Post.module.scss'

export default function Post({ post, posts }: { post: Post, posts: Post[] }) {
  const metaTitle = `${post.title} | ${process.env.siteName}`
  const metaDescription = `${post.title} Webサイトの構築事例紹介です。`
  const metaPageUrl = `${process.env.siteUrl}post/${post.slug}/`
  const metaSiteName = process.env.siteName
  const metaImage = post.thumbnail.src
  const metaType = 'article'
  const metaCard = process.env.metaCard

  const GlobalStyles = createGlobalStyle`
    html {
      --color-text: ${post.colorText};
    }
  `

  let detectUrl = () => {
    if (post.notAvailable) {
      return (
        <p className={styles['url']}><span><s>{post.url}</s> &nbsp;(not available)</span></p>
      )
    } else if (post.archive) {
      return (
        <p className={styles['url']}><a href={post.url} target="_blank" rel="noreferrer">{post.url}<span>&nbsp;(archive)</span></a></p>
      )
      } else {
      return (
        <p className={styles['url']}><a href={post.url} target="_blank" rel="noreferrer">{post.url}</a></p>
      )
    }
  }

  return (
    <>
      <GlobalStyles />
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
      <section className={styles['post']}>
        <h2 className={styles['title']}>{post.title}</h2>
        <div className={styles['meta']}>
          <p className={styles['date']}>{post.date}</p>
          <p className={styles['category']}>{post.categories.map((object: { name: string }) => object.name).join(', ')}</p>
          {detectUrl()}
        </div>
        <div className={styles['credit']}>
          <p>{nl2br(post.credit)}</p>
        </div>
        <ul className={styles['capture']}>
          {post.images.map((object, index) => {
            return (
              <li key={index}>
                <Image
                  src={object.src}
                  width={object.width}
                  height={object.height}
                  alt={object.title}
                  priority={true}
                />
              </li>
            )
          })}
        </ul>
      </section>
      <section className={styles['works']}>
        <Posts
          current={post.slug}
          posts={posts}
          filter='All'
        ></Posts>
      </section>
      <p className={styles['back']}><Link href={'/'}>Back to Index</Link></p>
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
