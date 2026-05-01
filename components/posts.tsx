'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types/post'
import type { CategoryFilter } from '@/lib/categories'
import styles from '@/styles/components/Posts.module.scss'

export default function Posts({
    posts,
    current,
    filter
  }: {
    posts: Post[],
    current: string,
    filter: CategoryFilter,
  }) {
  const detectCurrent = (post: Post) => {
    if (current === post.slug) {
      return (
        <span className={`${styles.anchor} ${styles['is-text']}`}>
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
              <p className={styles.category}>{post.category.map((object: { title: string }) => object.title).join(', ')}</p>
            </div>
          </div>
        </span>
      )
    } else {
      return (
        <Link href={`/post/${post.slug}`} className={`${styles.anchor} ${styles['is-link']}`}>
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
              <p className={styles.category}>{post.category.map((object: { title: string }) => object.title).join(', ')}</p>
            </div>
          </div>
        </Link>
      )
    }
  }

  const filterPosts =
    filter === 'all'
      ? posts
      : posts.filter((post) =>
          post.category.some((c) => c.title === filter)
        )

  return (
    <>
      <ul className={styles.posts}>
        {filterPosts.map((post) => {
          return (
            <li key={post.id} className={styles.posts__item}>
              {detectCurrent(post)}
            </li>
          )
        })}
      </ul>
    </>
  )
}
