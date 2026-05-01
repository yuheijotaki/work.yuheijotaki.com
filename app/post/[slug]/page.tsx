import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts, getPostBySlug } from '@/lib/microcms'
import Header from '@/components/header'
import Posts from '@/components/posts'
import PostColorStyle from './PostColorStyle'
import styles from '@/styles/page/Post.module.scss'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${post.title} | work.yuheijotaki.com`,
    description: `${post.title} Webサイトの構築事例紹介です。`,
    openGraph: {
      siteName: 'work.yuheijotaki.com',
      url: `https://work.yuheijotaki.com/post/${post.slug}/`,
      title: `${post.title} | work.yuheijotaki.com`,
      description: `${post.title} Webサイトの構築事例紹介です。`,
      type: 'article',
      images: post.thumbnail?.url ?? '',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | work.yuheijotaki.com`,
      description: `${post.title} Webサイトの構築事例紹介です。`,
      images: post.thumbnail?.url ?? '',
    },
  }
}

export const revalidate = 60 // 60秒ごとに再生成

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  const posts = await getPosts()

  if (!post) {
    return <div>Post not found</div>
  }

  const detectUrl = () => {
    if (post.notAvailable) {
      return (
        <span>
          <s>{post.url}</s> &nbsp;(not available)
        </span>
      )
    } else if (post.archive) {
      return (
        <a href={post.url} target="_blank" rel="noreferrer">
          {post.url}
          <span>&nbsp;(archive)</span>
        </a>
      )
    } else {
      return (
        <a href={post.url} target="_blank" rel="noreferrer">
          {post.url}
        </a>
      )
    }
  }

  return (
    <>
      <PostColorStyle colorText={post.colorText} />
      <Header isTopPage={false} />
      <main>
        <section className={styles.post}>
          <h1 className={styles.title}>{post.title}</h1>
          <dl className={styles.meta}>
            <dt>Date:</dt>
            <dd>{post.date}</dd>
            <dt>Category:</dt>
            <dd>
              {post.category
                .map((object: { title: string }) => object.title)
                .join(', ')}
            </dd>
          </dl>
          <p className={styles.url}>{detectUrl()}</p>
          {post.credit && (
            <div className={styles.credit}>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.credit.replace(/\n/g, '<br />'),
                }}
              />
            </div>
          )}
          <ul className={styles.capture}>
            {post.images?.map((object, index) => {
              return (
                <li key={index}>
                  <Image
                    src={object.url}
                    width={object.width}
                    height={object.height}
                    alt=""
                    quality={75}
                  />
                </li>
              )
            })}
          </ul>
        </section>
        <aside className={styles.works} aria-label="関連投稿">
          <Posts current={post.slug} posts={posts} filter="Front-end"></Posts>
        </aside>
        <p className={styles.back}>
          <Link href={'/'}>Back to Index</Link>
        </p>
      </main>
    </>
  )
}
