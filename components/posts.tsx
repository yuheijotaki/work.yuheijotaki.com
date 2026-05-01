'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { PostListItem } from '@/types/post'
import type { CategoryFilter } from '@/lib/categories'
import styles from '@/styles/components/Posts.module.scss'

function PostCard({ post }: { post: PostListItem }) {
  return (
    <>
      <p className={styles.image}>
        <Image
          src={post.thumbnail?.url ?? ''}
          width={post.thumbnail?.width ?? 640}
          height={post.thumbnail?.height ?? 420}
          alt=''
          quality={75}
        />
      </p>
      <div className="content">
        <p className={styles.title}>{post.title}</p>
        <div className={styles.meta}>
          <p className={styles.date}>{post.date}</p>
          <p className={styles.category}>
            {post.category.map((c) => c.title).join(', ')}
          </p>
        </div>
      </div>
    </>
  )
}

export default function Posts({
    posts,
    current,
    filter
  }: {
    posts: PostListItem[],
    current: string,
    filter: CategoryFilter,
  }) {
  const filterPosts =
    filter === 'all'
      ? posts
      : posts.filter((post) =>
          post.category.some((c) => c.title === filter)
        )

  return (
    <ul className={styles.posts}>
      {filterPosts.map((post) => {
        const isCurrent = current === post.slug
        return (
          <li key={post.id} className={styles.posts__item}>
            {isCurrent ? (
              <span className={`${styles.anchor} ${styles['is-text']}`}>
                <PostCard post={post} />
              </span>
            ) : (
              <Link
                href={`/post/${post.slug}`}
                className={`${styles.anchor} ${styles['is-link']}`}
              >
                <PostCard post={post} />
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
