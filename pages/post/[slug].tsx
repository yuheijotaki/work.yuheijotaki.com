import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts, getPostBySlug } from '@/lib/newt'
import { createGlobalStyle } from 'styled-components'
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
        <span><s>{post.url}</s> &nbsp;(not available)</span>
      )
    } else if (post.archive) {
      return (
        <a href={post.url} target="_blank" rel="noreferrer">{post.url}<span>&nbsp;(archive)</span></a>
      )
      } else {
      return (
        <a href={post.url} target="_blank" rel="noreferrer">{post.url}</a>
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
      <Header isTopPage={false} />
      <main>
        <section className={styles['post']}>
          <h1 className={styles['title']}>{post.title}</h1>
          <dl className={styles['meta']}>
            <dt>Date:</dt>
            <dd>{post.date}</dd>
            <dt>Category:</dt>
            <dd>{post.categories.map((object: { name: string }) => object.name).join(', ')}</dd>
          </dl>
          <p className={styles['url']}>{detectUrl()}</p>
          <div className={styles['credit']}>
            <p dangerouslySetInnerHTML={{ __html: post.credit.replace(/\n/g, '<br />') }} />
          </div>
          <ul className={styles['capture']}>
            {post.images.map((object, index) => {
              return (
                <li key={index}>
                  <Image
                    src={object.src}
                    width={object.width}
                    height={object.height}
                    alt=''
                    quality={60}
                  />
                </li>
              )
            })}
          </ul>
        </section>
        <aside className={styles['works']} aria-label="関連投稿">
          <Posts
            current={post.slug}
            posts={posts}
            filter='Front-end'
          ></Posts>
        </aside>
        <p className={styles['back']}><Link href={'/'}>Back to Index</Link></p>
      </main>
    </>
  )
}

export const getServerSideProps = async ({
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
