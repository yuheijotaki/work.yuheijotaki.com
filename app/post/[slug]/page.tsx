import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts, getPostBySlug } from '@/lib/microcms'
import { SITE_URL, SITE_NAME, TWITTER_CARD } from '@/lib/site'
import type { PostDetail } from '@/types/post'
import Header from '@/components/header'
import Posts from '@/components/posts'
import styles from '@/styles/page/Post.module.scss'

function PostUrl({ post }: { post: PostDetail }) {
  if (post.notAvailable) {
    return (
      <span>
        <s>{post.url}</s> &nbsp;(not available)
      </span>
    )
  }
  if (post.archive) {
    return (
      <a href={post.url} target="_blank" rel="noreferrer">
        {post.url}
        <span>&nbsp;(archive)</span>
      </a>
    )
  }
  return (
    <a href={post.url} target="_blank" rel="noreferrer">
      {post.url}
    </a>
  )
}

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

  const title = `${post.title} | ${SITE_NAME}`
  const description = `${post.title} Webサイトの構築事例紹介です。`
  const image = post.thumbnail?.url ?? ''

  return {
    title,
    description,
    openGraph: {
      siteName: SITE_NAME,
      url: `${SITE_URL}post/${post.slug}/`,
      title,
      description,
      type: 'article',
      images: image,
    },
    twitter: {
      card: TWITTER_CARD,
      title,
      description,
      images: image,
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

  return (
    <>
      <Header isTopPage={false} />
      <main>
        <section
          className={styles.post}
          style={{ '--color-text': post.colorText } as React.CSSProperties}
        >
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
          <p className={styles.url}><PostUrl post={post} /></p>
          {post.credit && (
            <div className={styles.credit}>
              <p>{post.credit}</p>
            </div>
          )}
          <ul className={styles.capture}>
            {post.images?.map((object) => {
              return (
                <li key={object.url}>
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
          <Posts current={post.slug} posts={posts} filter="all"></Posts>
        </aside>
        <p className={styles.back}>
          <Link href={'/'}>Back to Index</Link>
        </p>
      </main>
    </>
  )
}
