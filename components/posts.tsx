'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types/post'
import styles from '@/styles/components/Posts.module.scss'

export default function Posts({
    posts,
    current,
    filter
  }: {
    posts: Post[],
    current: string,
    filter: string,
  }) {
  const detectCurrent = (post: Post) => {
    if (current === post.slug) {
      return (
        <span className={`${styles.anchor} ${styles['is-text']}`}>
          <p className={styles.image}>
            <Image
              src={post.thumbnail?.url || ''}
              width={post.thumbnail?.width || 640}
              height={post.thumbnail?.height || 420}
              alt=''
              quality={60}
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
              src={post.thumbnail?.url || ''}
              width={post.thumbnail?.width || 640}
              height={post.thumbnail?.height || 420}
              alt=''
              quality={60}
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

  const filterPosts = posts.filter(function (post) {
    let isShow = false
    post.category.map((thisCategory) => {
      if (filter === thisCategory.title) isShow = true
    })
    if (filter === 'Front-end') isShow = true
    return isShow
  })

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
